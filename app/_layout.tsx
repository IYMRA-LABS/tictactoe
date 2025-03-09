import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, Linking } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme'; // Custom hook for color scheme
import HomeScreen from './screens/HomeScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import TwoPlayerScreen from './screens/TwoPlayerScreen';
import * as SplashScreen from 'expo-splash-screen';

// Prevent splash screen from hiding until assets are loaded
SplashScreen.preventAutoHideAsync();

const Tab = createBottomTabNavigator();

export default function Layout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Simulate a delay for demonstration purposes (remove in production)
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Set appIsReady to true after all assets are loaded
        setAppIsReady(true);
      } catch (error) {
        console.warn('Error preparing app:', error);
      } finally {
        // Hide the splash screen only if appIsReady is true
        if (appIsReady) {
          await SplashScreen.hideAsync();
        }
      }
    }

    prepare();
  }, [appIsReady]);

  // Function to handle Privacy Policy URL redirection
  const handlePrivacyPolicyPress = () => {
    Linking.openURL('https://tictactoe2025.vercel.app/privacy-policy.html');
  };

  // If the app is not ready, return null or a loading indicator
  if (!appIsReady) {
    return null;
  }

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

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            headerStyle: {
              backgroundColor: '#fff',
              height: 50,
            },
            headerTitleStyle: {
              color: '#000',
            },
            headerTitleAlign: 'left',
            headerRight: () => (
              <Ionicons
                name="document-text-outline"
                size={24}
                color="#000"
                style={{ marginRight: 10 }}
                onPress={handlePrivacyPolicyPress}
              />
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} options={{ headerTitle: 'Home' }} />
          <Tab.Screen name="Single Player" component={SinglePlayerScreen} options={{ headerTitle: 'Single Player' }} />
          <Tab.Screen name="Two Player" component={TwoPlayerScreen} options={{ headerTitle: 'Two Player' }} />
        </Tab.Navigator>
        <StatusBar style={'auto'} />
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