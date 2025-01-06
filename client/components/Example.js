import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from 'react-native'
import axios from 'axios'
import { BACKEND_URL } from '../config'

export default function AccountPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aadharNumber, setAadharNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [bankAccounts, setBankAccounts] = useState([{ accountNumber: '', bankName: '' }])

  const addBankAccount = () => {
    setBankAccounts([...bankAccounts, { accountNumber: '', bankName: '' }])
  }

  const removeBankAccount = (index) => {
    const updatedAccounts = bankAccounts.filter((_, i) => i !== index)
    setBankAccounts(updatedAccounts)
  }

  const updateBankAccount = (index, field, value) => {
    const updatedAccounts = bankAccounts.map((account, i) => {
      if (i === index) {
        return { ...account, [field]: value }
      }
      return account
    })
    setBankAccounts(updatedAccounts)
  }

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${BACKEND_URL}/api/user`, {
        email, password, name, aadharno: aadharNumber, mobileno: phoneNumber, accnos: bankAccounts
      })
      console.log(res)
    } catch (error) {
      Alert.alert('Error', 'There was an error submitting your details.')
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Account Details</Text>
        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Aadhar Card Number</Text>
            <TextInput
              style={styles.input}
              value={aadharNumber}
              onChangeText={setAadharNumber}
              placeholder="Enter your 12-digit Aadhar number"
              keyboardType="numeric"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <Text style={styles.subTitle}>Bank Accounts</Text>
          {bankAccounts.map((account, index) => (
            <View key={index} style={styles.bankAccount}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Account Number</Text>
                <TextInput
                  style={styles.input}
                  value={account.accountNumber}
                  onChangeText={(value) => updateBankAccount(index, 'accountNumber', value)}
                  placeholder="Enter bank account number"
                  keyboardType="numeric"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>Bank Name</Text>
                <TextInput
                  style={styles.input}
                  value={account.bankName}
                  onChangeText={(value) => updateBankAccount(index, 'bankName', value)}
                  placeholder="Enter bank name"
                />
              </View>

              {index > 0 && (
                <TouchableOpacity onPress={() => removeBankAccount(index)} style={styles.removeButton}>
                  <Text style={styles.removeButtonText}>Remove</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}

          <TouchableOpacity onPress={addBankAccount} style={styles.addButton}>
            <Text style={styles.addButtonText}>Add Another Bank Account</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Save Account Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
  },
  card: {
    backgroundColor: '#1a1a1a',
    borderRadius: 8,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  form: {
    marginBottom: 16,
  },
  inputGroup: {
    marginBottom: 12,
  },
  label: {
    color: '#bbb',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#333',
    color: '#fff',
    padding: 10,
    borderRadius: 4,
    borderColor: '#444',
    borderWidth: 1,
  },
  subTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 16,
  },
  bankAccount: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#292929',
    borderRadius: 8,
  },
  removeButton: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  removeButtonText: {
    color: 'red',
  },
  addButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
  },
  submitButton: {
    backgroundColor: '#0066ff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
})