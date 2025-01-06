import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, ActivityIndicator } from 'react-native';
import { LineChart, XAxis, YAxis, Grid } from 'react-native-svg-charts';
import axios from 'axios';
import  Navbar  from '../components/NavBar';
import { BACKEND_URL } from "../config";
import { useNavigation } from '@react-navigation/native';

// Mock data for the credit score graph
const creditScoreData = [650, 680, 700, 720, 750, 780];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

// Mock data for recommended banks
const recommendedBanks = [
  { name: 'Excellent Credit Bank', minScore: 750, color: '#22C55E' },
  { name: 'Good Credit Bank', minScore: 700, color: '#3B82F6' },
  { name: 'Fair Credit Bank', minScore: 650, color: '#FACC15' },
  { name: 'Building Credit Bank', minScore: 600, color: '#EF4444' },
];

export default function Home() {
  const navigation = useNavigation();
  const [CIBILScore, setCIBILScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchCombinedCreditScore = async () => {
    setLoading(true);
    setError(null);
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
      <Navbar />

      <Text style={styles.title}>Your Credit Score Overview</Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Credit Score Trend</Text>

        <View style={styles.chartContainer}>
          <YAxis
            data={creditScoreData}
            contentInset={{ top: 20, bottom: 20 }}
            svg={{ fill: '#888', fontSize: 12 }}
            numberOfTicks={5}
          />
          <LineChart
            style={{ flex: 1, marginLeft: 16 }}
            data={creditScoreData}
            svg={{ stroke: '#7C3AED' }}
            contentInset={{ top: 20, bottom: 20 }}
          >
            <Grid svg={{ stroke: '#444' }} />
          </LineChart>
          <XAxis
            style={{ marginHorizontal: -10, marginTop: 10 }}
            data={creditScoreData}
            formatLabel={(value) => months[value]}
            contentInset={{ left: 20, right: 20 }}
            svg={{ fontSize: 12, fill: '#888' }}
          />
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate("Transactions")}>
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.buttonText}>Check Credit Risk Score</Text>
        )}
      </TouchableOpacity>

      {CIBILScore && (
        <Text style={styles.creditScore}>Your current credit score: {CIBILScore}</Text>
      )}

      {error && <Text style={styles.error}>{error}</Text>}

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
    backgroundColor: 'black',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    color: '#CCC',
    marginBottom: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    height: 200,
  },
  button: {
    backgroundColor: '#7C3AED',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  creditScore: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#CCC',
    marginBottom: 8,
  },
  bankCard: {
    flex: 1,
    backgroundColor: '#1E1E1E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  highlightCard: {
    borderWidth: 2,
    borderColor: '#22C55E',
  },
  bankName: {
    color: 'white',
    fontSize: 16,
    marginBottom: 8,
  },
  bankImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  bankDetails: {
    color: '#CCC',
    fontSize: 14,
  },
  qualifyText: {
    color: '#22C55E',
    marginTop: 8,
  },
});