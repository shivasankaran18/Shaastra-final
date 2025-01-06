import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Navbar from "../components/NavBar";
import Hero from "../components/Hero";
import Features from '../components/Features';

export default function LandingPage() {
  return (
    <ScrollView style={styles.container}>
      <Navbar />
      <Hero />
      <Features />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
})