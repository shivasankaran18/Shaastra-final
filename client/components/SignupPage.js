import React, { useState } from 'react';
import { View, Text, TextInput, Button, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import axios from 'axios';
import {BACKEND_URL} from "../config.js";

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [aadharNumber, setAadharNumber] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [bankAccounts, setBankAccounts] = useState([{ accountNumber: '', bankName: '' }]);

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { accountNumber: '', bankName: '' }]);
  };

  const removeBankAccount = (index) => {
    setBankAccounts(bankAccounts.filter((_, i) => i !== index));
  };

  const updateBankAccount = (index, field, value) => {
    const updatedAccounts = bankAccounts.map((account, i) =>
      i === index ? { ...account, [field]: value } : account
    );
    setBankAccounts(updatedAccounts);
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user/register`, {
        email,
        password,
        name,
        aadharno: aadharNumber,
        mobileno: phoneNumber,
        accnos: bankAccounts,
      });
      Alert.alert('Success', `Verify OTP for ${res.data.user.email}`);
    } catch (error) {
      Alert.alert('Error', 'Failed to save account details');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Account Details</Text>

      <TextInput
        style={styles.input}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Aadhar Number"
        value={aadharNumber}
        onChangeText={setAadharNumber}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
      />

      <Text style={styles.subtitle}>Bank Accounts</Text>
      {bankAccounts.map((account, index) => (
        <View key={index} style={styles.bankAccount}>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={account.accountNumber}
            onChangeText={(value) => updateBankAccount(index, 'accountNumber', value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Bank Name"
            value={account.bankName}
            onChangeText={(value) => updateBankAccount(index, 'bankName', value)}
          />
          {index > 0 && (
            <TouchableOpacity onPress={() => removeBankAccount(index)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <Button title="Add Another Bank Account" onPress={addBankAccount} />
      <Button title="Save Account Details" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  bankAccount: {
    marginBottom: 16,
  },
  removeText: {
    color: 'red',
    marginTop: 4,
  },
});
