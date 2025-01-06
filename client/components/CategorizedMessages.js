import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import CryptoJS from 'crypto-js';

const CategorizedMessages = () => {
  const [messages, setMessages] = useState({});

  const decryptData = (encrypted) => {
    const bytes = CryptoJS.AES.decrypt(encrypted, 'secret-key');
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  };

  const loadMessages = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const categorizedMessages = {};

      for (const key of keys) {
        const encryptedData = await AsyncStorage.getItem(key);
        const { field, data, utility } = decryptData(encryptedData);

        if (!categorizedMessages[field]) {
          categorizedMessages[field] = [];
        }
        
        categorizedMessages[field].push({ key, data, utility });
      }

      setMessages(categorizedMessages);
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };

  const deleteMessage = async (key) => {
    try {
      await AsyncStorage.removeItem(key);
      Alert.alert('Deleted', 'Message has been deleted.');
      loadMessages();
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const renderMessages = () => {
    return Object.keys(messages).map((field) => (
      <View key={field} style={styles.fieldSection}>
        <Text style={styles.fieldTitle}>{field.toUpperCase()}</Text>
        {messages[field].map(({ key, data, utility }) => (
          <View key={key} style={styles.messageCard}>
            <Text style={styles.messageBody}>Utility: {utility}</Text>
            <Text style={styles.messageBody}>Data: {data}</Text>
            <Button title="Delete" onPress={() => deleteMessage(key)} color="red" />
          </View>
        ))}
      </View>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Categorized Messages</Text>
      {Object.keys(messages).length > 0 ? (
        renderMessages()
      ) : (
        <Text style={styles.noMessagesText}>No categorized messages available.</Text>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  fieldSection: {
    marginBottom: 20,
  },
  fieldTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#6c63ff',
  },
  messageCard: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: '#6c63ff',
  },
  messageBody: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  noMessagesText: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    marginTop: 20,
  },
});

export default CategorizedMessages;
