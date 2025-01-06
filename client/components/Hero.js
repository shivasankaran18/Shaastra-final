import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { motion } from 'framer-motion';
import { ArrowRight, Shield } from 'react-native-feather';

export default function Hero() {
  return (
    <View style={styles.heroContainer}>
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <motion.View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={styles.taglineContainer}
        >
          <Shield style={styles.icon} />
          <Text style={styles.taglineText}>Innovative Credit Risk Assessment</Text>
        </motion.View>

        <motion.Text
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={styles.title}
        >
          Smart Lending Decisions with Alternative Data
        </motion.Text>

        <motion.Text
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          style={styles.subtitle}
        >
          Unlock financial opportunities with our AI-powered credit assessment platform.
        </motion.Text>

        <motion.View
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          style={styles.buttonContainer}
        >
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Get Started</Text>
            <ArrowRight style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </motion.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    minHeight: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#000',
    opacity: 0.5,
  },
  contentContainer: {
    padding: 20,
    alignItems: 'center',
  },
  taglineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  icon: {
    width: 32,
    height: 32,
    color: '#7C3AED',
  },
  taglineText: {
    color: '#7C3AED',
    marginLeft: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitle: {
    color: '#AAA',
    textAlign: 'center',
    marginBottom: 32,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  primaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4C51BF',
    padding: 12,
    borderRadius: 8,
    marginRight: 8,
  },
  primaryButtonText: {
    color: 'white',
  },
  arrowIcon: {
    marginLeft: 8,
    color: 'white',
  },
  secondaryButton: {
    borderColor: '#4C51BF',
    borderWidth: 1,
    padding: 12,
    borderRadius: 8,
  },
  secondaryButtonText: {
    color: '#4C51BF',
    },
});