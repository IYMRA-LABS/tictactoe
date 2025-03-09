import { useEffect, useState } from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ThemeProvider, DefaultTheme } from '@react-navigation/native';
import { Asset } from 'expo-asset';

import HomeScreen from './screens/HomeScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import TwoPlayerScreen from './screens/TwoPlayerScreen';

const Tab = createBottomTabNavigator();

const Layout = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();

        // Load all the assets that the app needs
        const assets = [
          require('./assets/images/logo/icon.png'),
          require('./assets/images/logo/adaptiveIcon.png'),
          require('./assets/images/logo/adaptiveIconDark.png'),
        ];

        await Asset.loadAsync(assets); // Load all assets asynchronously

        // After all assets are loaded, set appIsReady to true
        setAppIsReady(true);

        // Hide the splash screen
        await SplashScreen.hideAsync();
      } catch (e) {
        console.warn(e);
      }
    }

    prepare();
  }, []);

  if (!appIsReady) {
    return <Text>Loading...</Text>; // Temporary loading text or a splash screen
  }

  return (
    <ThemeProvider value={DefaultTheme}>
      <SafeAreaView style={styles.safeArea}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home-outline';
              if (route.name === 'Single Player') iconName = 'person-outline';
              if (route.name === 'Two Player') iconName = 'people-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50',
            tabBarInactiveTintColor: '#888',
            tabBarStyle: {
              backgroundColor: '#fff',
              borderTopWidth: 0,
              paddingBottom: 5,
              height: 60,
            },
            headerShown: false,
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Single Player" component={SinglePlayerScreen} />
          <Tab.Screen name="Two Player" component={TwoPlayerScreen} />
        </Tab.Navigator>
      </SafeAreaView>
    </ThemeProvider>
  );
}

export default Layout;