from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import pandas as pd
from django.conf import settings
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
from sklearn.preprocessing import LabelEncoder
import os
import nltk
nltk.download('stopwords')
from nltk.corpus import stopwords
from nltk.stem import SnowballStemmer
from django.http import JsonResponse
import re
import numpy as np
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

class TrainCIBILModelView(APIView):
    def post(self, request):
        base_dir = settings.BASE_DIR
        csv_file = os.path.join(base_dir, 'custom.csv')
        if not os.path.exists(csv_file):
            return Response({"error": f"File '{csv_file}' not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            data = pd.read_csv(csv_file)

            # Data Preprocessing
            data['transaction_status'] = data['transaction_status'].map({'Success': 1, 'Failed': 0})
            data['payment_mode'] = LabelEncoder().fit_transform(data['payment_mode'])
            data['description'] = LabelEncoder().fit_transform(data['description'])
            data['geo_location_city'] = LabelEncoder().fit_transform(data['geo_location_city'])
            data['geo_location_region'] = LabelEncoder().fit_transform(data['geo_location_region'])
            data = data.drop(columns=['transaction_id', 'receiver_account_number', 'currency', 'transaction_date', 'fee'])

            # Aggregate data
            customer_data = data.groupby('sender_account_number').agg(
                total_transactions=('transaction_status', 'count'),
                avg_transaction_amount=('amount', 'mean'),
                total_successful_transactions=('transaction_status', 'sum'),
                total_failed_transactions=('transaction_status', lambda x: (x == 0).sum()),
                success_rate=('transaction_status', 'mean'),
                discretionary_spend=('description', lambda x: sum("Shopping" in str(i) or "Dining" in str(i) for i in x)),
                avg_payment_mode=('payment_mode', 'mean')
            ).reset_index()

            # Generate CIBIL Score
            customer_data['CIBIL_Score'] = customer_data.apply(
                lambda row: 300 + (row['success_rate'] * 300) +
                            (row['avg_transaction_amount'] / 100) +
                            (row['discretionary_spend'] * 100) -
                            (row['total_failed_transactions'] * 50), axis=1
            ).clip(300, 900)

            # Train-test split
            X = customer_data.drop(columns=['sender_account_number', 'CIBIL_Score'])
            y = customer_data['CIBIL_Score']
            X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

            # Train model
            model = RandomForestRegressor(n_estimators=100, random_state=42)
            model.fit(X_train, y_train)

            # Evaluate model
            y_pred = model.predict(X_test)
            mae = mean_absolute_error(y_test, y_pred)

            # Predict CIBIL scores
            customer_data['Predicted_CIBIL_Score'] = model.predict(X)

            # Save to CSV
            output_file = os.path.join(base_dir, 'customer_cibil_scores.csv')
            customer_data.to_csv(output_file, index=False)

            return Response({
                "message": "Model trained successfully. CSV generated.",
                "mean_absolute_error": mae,
                "output_file": output_file
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetCIBILScoreView(APIView):
    def get(self, request, sender_account_number):
        # Path to the customer_cibil_scores.csv file
        csv_file = os.path.join(settings.BASE_DIR, 'customer_cibil_scores.csv')
        
        # Check if the file exists
        if not os.path.exists(csv_file):
            return Response({"error": "CIBIL scores file not found."}, status=status.HTTP_404_NOT_FOUND)

        try:
            # Load the data
            customer_data = pd.read_csv(csv_file)

            # Search for the sender_account_number in the dataset
            customer = customer_data[customer_data['sender_account_number'] == sender_account_number]

            if not customer.empty:
                # Retrieve and return the CIBIL score
                cibil_score = customer['Predicted_CIBIL_Score'].iloc[0]
                return Response({
                    "sender_account_number": sender_account_number,
                    "cibil_score": cibil_score
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "Sender account number not found."}, status=status.HTTP_404_NOT_FOUND)

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        

data = [
    "I love this product! It's amazing.",
    "Absolutely terrible experience. I hate it.",
    "It's okay, nothing fucking special but not bad.",
    "This is the best thing I've ever used!",
    "I'm very fucking disappointed. It broke immediately.",
    "Pretty decent for the price.",
    "Fantastic quality, highly recommend!",
    "Worst purchase I've ever made.",
    "It's alright, could be shit better.",
    "I'm thrilled with this! Great buy."
]

swear_words = {'shit', 'fuck', 'damn', 'asshole', 'bitch', 'bastard', 'hell', 'crap', 'suck', 'fucker', 'bitchy'}

# NLTK setup
stop_words = set(stopwords.words('english'))
stemmer = SnowballStemmer('english')
punctuations_and_dummies = r"@\S+|https?:\S+|http?:\S|[^A-Za-z0-9]+"

# Tokenizer setup
tokenizer = Tokenizer(oov_token='<OOV>')  # Added OOV token for unseen words
tokenizer.fit_on_texts(data)
word_index = tokenizer.word_index
vocab_size = len(word_index) + 1  # Adding 1 to handle 0 index for padding
max_sequence_length = 30

# Preprocessing function
def preprocess(tweet, will_be_stemmed=False):
    tweet = re.sub(punctuations_and_dummies, ' ', str(tweet).lower()).strip()
    tokens = [
        stemmer.stem(word) if will_be_stemmed else word
        for word in tweet.split() if word not in stop_words
    ]
    return " ".join(tokens)

def detect_swearing(tweet):
    words = tweet.split()
    for word in words:
        if word in swear_words:
            return True
    return False

def predict_sentiment(text):
    # Preprocess the tweet
    text = preprocess(text)

    # Tokenize and pad the sequence
    sequence = tokenizer.texts_to_sequences([text])
    padded_sequence = pad_sequences(sequence, maxlen=max_sequence_length, padding='post')

    # Mock prediction
    prediction = np.random.rand(1, 3)  # Random prediction for now (3 classes)
    sentiment_score = np.argmax(prediction)  # The sentiment: 0 (Negative), 1 (Neutral), 2 (Positive)

    # Convert sentiment into score
    score = 0
    if sentiment_score == 0:
        score = 0  # Negative
    elif sentiment_score == 1:
        score = 0.5  # Neutral
    else:
        score = 1  # Positive

    # Reduce score if swear words are detected
    if detect_swearing(text):
        score = max(0, score - 0.2)  # Reduce score but keep it non-negative

    return score

class SentimentAPIView(APIView):
    def post(self, request):
        user_handle = request.data.get('user_handle')

        if not user_handle:
            return JsonResponse({"error": "User handle is required."}, status=status.HTTP_400_BAD_REQUEST)

        # For simplicity, mock some data based on user_handle (e.g., by using hardcoded tweets).
        user_tweets = data  # In real-world use case, you'd fetch the user's tweets based on the handle.

        # Calculate the sentiment score
        total_score = 0
        for tweet in user_tweets:
            score = predict_sentiment(tweet)
            total_score += score

        # Calculate the average sentiment score
        average_score = total_score / len(user_tweets)

        # Classify the overall sentiment
        if average_score < 0.5:
            sentiment = "Negative"
        elif average_score == 0.5:
            sentiment = "Neutral"
        else:
            sentiment = "Positive"

        return JsonResponse({"user_handle": user_handle, "sentiment_score": average_score, "sentiment": sentiment})
