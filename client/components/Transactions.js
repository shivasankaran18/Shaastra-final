import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet,Image,ActivityIndicator } from 'react-native';
import axios from 'axios';
import { BACKEND_URL } from "../config";

// Sample expense data
const expenses = [
  { id: 1, type: 'entertainment', amount: 50 },
  { id: 2, type: 'food', amount: 30 },
  { id: 3, type: 'utility', amount: 100, dueDate: new Date(2025, 0, 15), paidDate: new Date(2025, 0, 10) },
  { id: 4, type: 'credit card', amount: 200, dueDate: new Date(2025, 0, 20) },
  { id: 5, type: 'entertainment', amount: 40 },
  { id: 6, type: 'food', amount: 25 },
  { id: 7, type: 'utility', amount: 80, dueDate: new Date(2025, 0, 25) },
  { id: 8, type: 'credit card', amount: 150, dueDate: new Date(2025, 0, 5), paidDate: new Date(2025, 0, 3) },
];

// Emoji and color mapping
const emojiMap = {
  entertainment: '📺',
  food: '🍴',
  utility: '💡',
  'credit card': '💳',
};

const colorMap = {
  entertainment: '#7D4CDB',
  food: '#22C55E',
  utility: '#FBBF24',
  'credit card': '#EF4444',
};

// Exchange rate (1 USD = 75 INR)
const exchangeRate = 75;
const recommendedBanks = [
    { name: 'Excellent Credit Bank', minScore: 750, color: '#22C55E' },
    { name: 'Good Credit Bank', minScore: 700, color: '#3B82F6' },
    { name: 'Fair Credit Bank', minScore: 650, color: '#FACC15' },
    { name: 'Building Credit Bank', minScore: 600, color: '#EF4444' },
  ];

export default function Transactions() {
  const [filter, setFilter] = useState('all');
  const [CIBILScore, setCIBILScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const filteredExpenses = filter === 'all'
    ? expenses
    : expenses.filter((expense) => expense.type === filter);

  const getPaymentStatus = (expense) => {
    if (expense.type !== 'utility' && expense.type !== 'credit card') return null;

    const today = new Date(2025, 0, 6); // Current date
    if (expense.paidDate) {
      return <Text style={styles.paidText}>Paid on time</Text>;
    } else if (expense.dueDate && expense.dueDate < today) {
      const daysLate = Math.floor((today - expense.dueDate) / (1000 * 3600 * 24));
      return <Text style={styles.lateText}>{daysLate} days late</Text>;
    } else if (expense.dueDate) {
      const daysUntilDue = Math.floor((expense.dueDate - today) / (1000 * 3600 * 24));
      return <Text style={styles.dueText}>Due in {daysUntilDue} days</Text>;
    }
    return null;
  };

  const fetchCombinedCreditScore = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${BACKEND_URL}/api/credit-score`, {
        account_number: 'ACC106872241548',
      });
      const combinedScore = response.data.predicted_score;
      setCIBILScore(combinedScore);
    } catch (err) {
      console.error('Error fetching combined credit score:', err);
      setError('Failed to fetch the credit score. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transactional History</Text>

      <View style={styles.filterContainer}>
        {['all', 'entertainment', 'food', 'utility', 'credit card'].map((type) => (
          <TouchableOpacity key={type} onPress={() => setFilter(type)}>
            <Text style={[styles.filterItem, filter === type && styles.filterItemActive]}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredExpenses}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => {
          const emoji = emojiMap[item.type];
          return (
            <View style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={[styles.badge, { backgroundColor: colorMap[item.type] }]}>
                  {emoji} {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
                </Text>
              </View>
              <View style={styles.cardContent}>
                <Text style={styles.amount}>
                  ₹{(item.amount * exchangeRate).toLocaleString('en-IN')}
                </Text>
                {getPaymentStatus(item)}
              </View>
            </View>
          );
        }}
      />

      {/* <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText} onPress={fetchCombinedCreditScore}>Credit Risk Score</Text>
      </TouchableOpacity> */}
      <TouchableOpacity style={styles.button} onPress={fetchCombinedCreditScore}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Check Credit Risk Score</Text>
        )}
      </TouchableOpacity>
      {CIBILScore && (
        <Text style={styles.creditScore}>Your current credit score: {CIBILScore}</Text>
      )}
      <Text style={styles.sectionTitle}>Recommended Banks</Text>

        <FlatList
        data={recommendedBanks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View
            style={[
                styles.bankCard,
                CIBILScore && CIBILScore >= item.minScore ? styles.highlightCard : null,
            ]}
            >
            <Text style={styles.bankName}>{item.name}</Text>
            <Image source={item.image} style={styles.bankImage} />
            <Text style={styles.bankDetails}>Minimum Score: {item.minScore}</Text>
            {CIBILScore && CIBILScore >= item.minScore && (
                <Text style={styles.qualifyText}>You qualify for this bank!</Text>
            )}
            </View>
        )}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  filterItem: {
    color: '#aaa',
    fontSize: 16,
  },
  filterItemActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  badge: {
    color: '#fff',
    padding: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  cardContent: {
    marginTop: 5,
  },
  amount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  paidText: {
    color: '#22C55E',
    marginTop: 5,
  },
  lateText: {
    color: '#EF4444',
    marginTop: 5,
  },
  dueText: {
    color: '#FBBF24',
    marginTop: 5,
  },
  button: {
    backgroundColor: '#6a5acd',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  creditScore:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },bankCard: {
    flex: 1,
    backgroundColor: '#1E1E1E', // Dark background for each bank card
    borderRadius: 8, // Rounded corners
    padding: 16, // Padding inside each card
    marginBottom: 16, // Space between cards
    alignItems: 'center', // Center content horizontally
  },
  highlightCard: {
    borderWidth: 2, // Border for qualifying bank cards
    borderColor: '#22C55E', // Green border for highlighting qualifying cards
  },
  bankName: {
    color: 'white', // White text color for the bank name
    fontSize: 16, // Font size for the bank name
    marginBottom: 8, // Space between bank name and other details
  },
  bankImage: {
    width: 100, // Width of the bank logo/image
    height: 100, // Height of the bank logo/image
    borderRadius: 8, // Rounded corners for the image
    marginBottom: 8, // Space between the image and the bank details
  },
  bankDetails: {
    color: '#CCC', // Light gray text for bank details
    fontSize: 14, // Font size for the bank details text
  },
  qualifyText: {
    color: '#22C55E', // Green color for the qualification text
    marginTop: 8, // Space between the bank details and qualification text
  },
});
