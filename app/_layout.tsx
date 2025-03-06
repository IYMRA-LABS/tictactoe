// layout.tsx
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Linking } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme'; // Custom hook for color scheme

import HomeScreen from './screens/HomeScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import TwoPlayerScreen from './screens/TwoPlayerScreen';

import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from hiding until the assets are loaded
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function Layout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  // Function to handle Privacy Policy URL redirection
  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://tictactoe2025.vercel.app/privacy-policy.html');
  };

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            headerShown: true, // Show the header on all screens
            tabBarActiveTintColor: '#000',
            tabBarInactiveTintColor: '#666',
            tabBarStyle: { backgroundColor: '#fff' },
            tabBarIcon: ({ color, size }) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = 'home-outline';
              } else if (route.name === 'Single Player') {
                iconName = 'person-outline';
              } else if (route.name === 'Two Player') {
                iconName = 'people-outline';
              }

              return <Ionicons name:String={iconName} size={size} color={color} />;
            },
            // Header styling for background color, text color, and centering
            headerStyle: {
              backgroundColor: '#fff', // White background for header
              height: 50, // Set a smaller header height
            },
            headerTitleStyle: {
              color: '#000', // Black text for the header title
            },
            headerTitleAlign: 'left', // Align the title to the left
            headerRight: () => (
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#000"
                style={{ marginRight: 10 }} // Add space to the right
                onPress={handlePrivacyPolicyPress} // Open the Privacy Policy link when clicked
              />
            ),
          })}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{ headerTitle: 'Home' }}
          />
          <Tab.Screen
            name="Single Player"
            component={SinglePlayerScreen}
            options={{ headerTitle: 'Single Player' }}
          />
          <Tab.Screen
            name="Two Player"
            component={TwoPlayerScreen}
            options={{ headerTitle: 'Two Player' }}
          />
        </Tab.Navigator>
        <StatusBar style={'auto' as 'auto' | 'light' | 'dark' | 'inverted'} />;
      </SafeAreaView>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
});