import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LandingPage from './components/LandingPage';
import SignupPage from './components/SignupPage';
import SigninPage from './components/SigninPage';
import CategorizedMessages from './components/CategorizedMessages';
import AccountPage from './components/Example';
import Home from './components/Home';
import Transactions from "./components/Transactions"
// import { OTPVerification } from './components/OTPverification';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Landing">
        <Stack.Screen name="Landing" component={LandingPage} />
        <Stack.Screen name="Signup" component={SignupPage} />
        <Stack.Screen name="Signin" component={SigninPage} />
        <Stack.Screen name='account' component={AccountPage}/>
        <Stack.Screen name="CategorizedMessages" component={CategorizedMessages} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Transactions" component={Transactions} />
        {/* <Stack.Screen name="OTPVerification" component={OTPVerification} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}