// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import { motion } from 'framer-motion';
// import { Activity, Database, Lock, MessageSquare, Smartphone, Users } from 'react-native-feather';

// const features = [
//   { icon: Database, title: 'NPCI Integration', description: 'Secure access to transaction data.' },
//   { icon: Activity, title: 'Real-time Analysis', description: 'Instant credit assessment.' },
//   { icon: MessageSquare, title: 'Social Insights', description: 'Analyze social media behavior.' },
//   { icon: Smartphone, title: 'Utility Payments', description: 'Track financial responsibility.' },
//   { icon: Lock, title: 'Secure & Private', description: 'Bank-grade security.' },
//   { icon: Users, title: 'Fair Assessment', description: 'Inclusive credit scoring.' },
// ];

// export default function Features() {
//   return (
//     <View style={styles.featuresContainer}>
//       <Text style={styles.title}>Comprehensive Credit Assessment</Text>
//       <FlatList
//         data={features}
//         keyExtractor={(item, index) => index.toString()}
//         renderItem={({ item }) => (
//           <motion.View
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             transition={{ duration: 0.5 }}
//             style={styles.featureCard}
//           >
//             <item.icon style={styles.icon} />
//             <Text style={styles.featureTitle}>{item.title}</Text>
//             <Text style={styles.featureDescription}>{item.description}</Text>
//           </motion.View>
//         )}
//         contentContainerStyle={styles.listContainer}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   featuresContainer: {
//     padding: 20,
//     backgroundColor: '#121212',
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 20,
//     textAlign: 'center',
//   },
//   listContainer: {
//     alignItems: 'center',
//   },
//   featureCard: {
//     backgroundColor: '#1E1E1E',
//     padding: 20,
//     borderRadius: 8,
//     marginBottom: 16,
//     alignItems: 'center',
//   },
//   icon: {
//     width: 32,
//     height: 32,
//     color: '#7C3AED',
//     marginBottom: 12,
//   },
//   featureTitle: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: 'white',
//     marginBottom: 8,
//   },
//   featureDescription: {
//     color: '#AAA',
//     textAlign: 'center',
//   },
// });
// features.js
import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, FlatList, Animated } from 'react-native';
import { Activity, Database, Lock, MessageSquare, Smartphone, Users } from 'react-native-feather';

const features = [
  { icon: Database, title: 'NPCI Integration', description: 'Secure access to transaction data.' },
  { icon: Activity, title: 'Real-time Analysis', description: 'Instant credit assessment.' },
  { icon: MessageSquare, title: 'Social Insights', description: 'Analyze social media behavior.' },
  { icon: Smartphone, title: 'Utility Payments', description: 'Track financial responsibility.' },
  { icon: Lock, title: 'Secure & Private', description: 'Bank-grade security.' },
  { icon: Users, title: 'Fair Assessment', description: 'Inclusive credit scoring.' },
];

export default function Features() {
  const animatedValues = useRef(features.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    Animated.stagger(100, 
      animatedValues.map((animValue) =>
        Animated.timing(animValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        })
      )
    ).start();
  }, [animatedValues]);

  return (
    <View style={styles.featuresContainer}>
      <Text style={styles.title}>Comprehensive Credit Assessment</Text>
      <FlatList
        data={features}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => {
          const translateY = animatedValues[index].interpolate({
            inputRange: [0, 1],
            outputRange: [20, 0],
          });

          const opacity = animatedValues[index];

          return (
            <Animated.View
              style={[
                styles.featureCard,
                { opacity, transform: [{ translateY }] },
              ]}
            >
              <item.icon style={styles.icon} />
              <Text style={styles.featureTitle}>{item.title}</Text>
              <Text style={styles.featureDescription}>{item.description}</Text>
            </Animated.View>
          );
        }}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  featuresContainer: {
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  listContainer: {
    alignItems: 'center',
  },
  featureCard: {
    backgroundColor: '#1E1E1E',
    padding: 20,
    borderRadius: 8,
    marginBottom: 16,
    alignItems: 'center',
  },
  icon: {
    width: 32,
    height: 32,
    color: '#7C3AED',
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  featureDescription: {
    color: '#AAA',
    textAlign: 'center',
  },
});
