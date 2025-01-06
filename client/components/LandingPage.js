import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import addSampleData from './PutData';

const LandingPage = ({ navigation }) => {
  useEffect(() => {
    async function func() {
      addSampleData();
    }
    func();
  }, []);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Credit Risk Analyzer</Text>
      <Text style={styles.subtitle}>Real-Time Credit Assessment Made Easy</Text>

      <View style={styles.buttonContainer}>
        <Button title="Sign Up" onPress={() => navigation.navigate('Signup')} />
        <Button title="Sign In" onPress={() => navigation.navigate('Signin')} color="#6c63ff" />
      </View>

      <View style={styles.recordsContainer}>
        <Button
          title="View Categorized Messages"
          onPress={() => navigation.navigate('CategorizedMessages')}
        />
        <Button title='View Accountpage' onPress={()=> navigation.navigate("account")}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
    marginBottom: 20,
  },
  recordsContainer: {
    marginTop: 20,
    width: '60%',
  },
});

export default LandingPage;
