import { useNavigation } from '@react-navigation/native';
import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { ArrowRight, Shield } from 'react-native-feather';

export default function Hero() {
    const navigation = useNavigation();
  const opacityAnim = useRef(new Animated.Value(0)).current; // Animation for opacity
  const translateYAnim = useRef(new Animated.Value(20)).current; // Animation for vertical movement

  useEffect(() => {
    Animated.timing(opacityAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.timing(translateYAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, [opacityAnim, translateYAnim]);

  return (
    <View style={styles.heroContainer}>
      <View style={styles.overlay} />
      <View style={styles.contentContainer}>
        <Animated.View
          style={[
            styles.taglineContainer,
            { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          <Shield style={styles.icon} />
          <Text style={styles.taglineText}>Innovative Credit Risk Assessment</Text>
        </Animated.View>

        <Animated.Text
          style={[
            styles.title,
            { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          Smart Lending Decisions with Alternative Data
        </Animated.Text>

        <Animated.Text
          style={[
            styles.subtitle,
            { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          Unlock financial opportunities with our AI-powered credit assessment platform.
        </Animated.Text>

        <Animated.View
          style={[
            styles.buttonContainer,
            { opacity: opacityAnim, transform: [{ translateY: translateYAnim }] },
          ]}
        >
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText} onPress={()=> navigation.navigate("Home")}>Get Started</Text>
            <ArrowRight style={styles.arrowIcon} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Learn More</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroContainer: {
    minHeight: '35%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
    // backgroundColor:"red"
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
