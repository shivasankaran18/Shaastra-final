import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { motion } from 'framer-motion';
import { Shield } from 'react-native-feather';

export default function Navbar() {
  const navigation = useNavigation();

  return (
    <motion.View
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      style={styles.navbar}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Shield style={styles.icon} />
          <Text style={styles.title}>LendSure</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.button}>
            <Text style={styles.buttonText}>Log in</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')} style={styles.buttonSecondary}>
            <Text style={styles.buttonTextSecondary}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </motion.View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 50,
    backgroundColor: '#121212', // Example color for 'bg-background'
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    color: '#7C3AED',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginLeft: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginRight: 16,
  },
  buttonText: {
    color: 'white',
  },
  buttonSecondary: {
    backgroundColor: '#4C51BF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  buttonTextSecondary: {
    color: 'white',
  },
});
navbae.js