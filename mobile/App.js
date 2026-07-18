import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View } from 'react-native';

// Import Screens
import SplashScreen from './src/screens/SplashScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import VerifyEmailScreen from './src/screens/VerifyEmailScreen';
import LoginScreen from './src/screens/LoginScreen';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import ResetPasswordScreen from './src/screens/ResetPasswordScreen';
import SuccessScreen from './src/screens/SuccessScreen';

import HomeScreen from './src/screens/HomeScreen';
import CategoryLabsScreen from './src/screens/CategoryLabsScreen';
import LabAboutScreen from './src/screens/LabAboutScreen';
import BookingsScreen from './src/screens/BookingsScreen';
import AppointmentDetailsScreen from './src/screens/AppointmentDetailsScreen';

import BookAppointmentStep1 from './src/screens/BookAppointmentStep1';
import BookAppointmentStep2 from './src/screens/BookAppointmentStep2';
import BookAppointmentStep3 from './src/screens/BookAppointmentStep3';
import BookAppointmentStep4 from './src/screens/BookAppointmentStep4';
import BookAppointmentSuccess from './src/screens/BookAppointmentSuccess';

import { BookingProvider } from './src/context/BookingContext';

import SearchScreen from './src/screens/SearchScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LabsNearYouScreen from './src/screens/LabsNearYouScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Chat screen placeholder
const ChatScreen = () => <View style={{flex:1, justifyContent:'center', alignItems:'center'}}><Text>Chat</Text></View>;

function MainTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#4A85FE' }}>
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarIcon: () => <Text>🏠</Text> }} />
      <Tab.Screen name="Appointments" component={BookingsScreen} options={{ tabBarIcon: () => <Text>📅</Text> }} />
      <Tab.Screen name="Search" component={SearchScreen} options={{ tabBarIcon: () => <Text>🔍</Text> }} />
      <Tab.Screen name="Chat" component={ChatScreen} options={{ tabBarIcon: () => <Text>💬</Text> }} />
      <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarIcon: () => <Text>👤</Text> }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <BookingProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Splash">
          {/* Auth Flow */}
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="VerifyEmail" component={VerifyEmailScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
          <Stack.Screen name="ResetPassword" component={ResetPasswordScreen} />
          <Stack.Screen name="Success" component={SuccessScreen} />
          
          {/* Main App Flow */}
          <Stack.Screen name="MainTabs" component={MainTabs} />
          <Stack.Screen name="CategoryLabs" component={CategoryLabsScreen} />
          <Stack.Screen name="LabsNearYou" component={LabsNearYouScreen} />
          <Stack.Screen name="LabAbout" component={LabAboutScreen} />
          <Stack.Screen name="AppointmentDetails" component={AppointmentDetailsScreen} />
          
          {/* Booking Flow */}
          <Stack.Screen name="BookAppointmentStep1" component={BookAppointmentStep1} />
          <Stack.Screen name="BookAppointmentStep2" component={BookAppointmentStep2} />
          <Stack.Screen name="BookAppointmentStep3" component={BookAppointmentStep3} />
          <Stack.Screen name="BookAppointmentStep4" component={BookAppointmentStep4} />
          <Stack.Screen name="BookAppointmentSuccess" component={BookAppointmentSuccess} />
        </Stack.Navigator>
      </NavigationContainer>
    </BookingProvider>
  );
}
