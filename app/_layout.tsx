import React, { useEffect, useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Linking, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import * as SplashScreen from 'expo-splash-screen';
import { Asset } from 'expo-asset';

// Screens
import HomeScreen from './screens/HomeScreen';
import SinglePlayerScreen from './screens/SinglePlayerScreen';
import TwoPlayerScreen from './screens/TwoPlayerScreen';

// Deep linking configuration with custom schema (tictactoe2025://)
const linking = {
  prefixes: ['tictactoe2025://'], // Custom URL schema: 'tictactoe2025://'
  config: {
    screens: {
      Home: 'play/home', // Map '/play/home' to HomeScreen
      'Single Player': 'play/single-player', // Map '/play/single-player' to SinglePlayerScreen
      'Two Player': 'play/two-player', // Map '/play/two-player' to TwoPlayerScreen
    },
  },
};

const Tab = createBottomTabNavigator();

async function preloadAssets() {
  const images = [
    require('@/assets/images/St_btn.png'),
    require('@/assets/images/background.png'),
    require('@/assets/images/homeBG.png'),

    require('@/assets/images/logo/AdaptionIcon.png'),
    require('@/assets/images/logo/adaptiveIconDark.png'),
    require('@/assets/images/logo/background.png'),
    require('@/assets/images/logo/foreground.png'),
    require('@/assets/images/logo/icon.png'),

    require('@/assets/images/logo/adaptiveIcon.png'),
  ];

  const cacheImages = images.map((image) => Asset.loadAsync(image));
  await Promise.all(cacheImages);
}

export default function AppLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await preloadAssets(); // Preload any assets
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true); // Set the app as ready after preloading assets
        await SplashScreen.hideAsync(); // Hide the splash screen
      }
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const openPrivacyPolicy = () => {
    Linking.openURL('https://tictactoe2025.vercel.app/privacy-policy.html'); // Open Privacy Policy URL
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <NavigationContainer linking={linking}>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName;
              if (route.name === 'Home') iconName = 'home-outline';
              if (route.name === 'Single Player') iconName = 'person-outline';
              if (route.name === 'Two Player') iconName = 'people-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#4CAF50', // Active tab color
            tabBarInactiveTintColor: '#888', // Inactive tab color
            tabBarStyle: {
              backgroundColor: '#fff', // Tab bar background color
              borderTopWidth: 0,
              paddingBottom: 5,
              height: 60,
            },
            headerShown: true,
            headerTitle: route.name,
            headerRight: () => (
              <TouchableOpacity onPress={openPrivacyPolicy} style={styles.privacyButton}>
                <Ionicons name="shield-outline" size={24} color="black" />
              </TouchableOpacity>
            ),
          })}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Single Player" component={SinglePlayerScreen} />
          <Tab.Screen name="Two Player" component={TwoPlayerScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  privacyButton: {
    paddingRight: 15,
  },
});  },
});
