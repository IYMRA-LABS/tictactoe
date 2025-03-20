import { useEffect, useState } from 'react';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { ThemeProvider } from 'styled-components/native';
import { DefaultTheme } from '../theme'; 
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import HomeScreen from '../screens/HomeScreen';
import SinglePlayerScreen from '../screens/SinglePlayerScreen';
import TwoPlayerScreen from '../screens/TwoPlayerScreen';

SplashScreen.preventAutoHideAsync();

const usePreloadAssets = async () => {
  const images = [
    require('../assets/images/st_btn.png'),
    require('../assets/images/background.png'),
    require('../assets/images/home_bg.png'),

    require('../assets/logo/adaptive_icon.png'),
    require('../assets/logo/adaptive_icon_dark.png'),
    require('../assets/logo/favicon.png'),
    require('../assets/logo/foreground.png'),
    require('../assets/logo/icon.png'),

    require('../assets/images/logo/adaptive_icon.png'),
  ];

  const cacheImages = images.map((image) => Asset.loadAsync(image));
  await Promise.all(cacheImages);
};

const Tab = createBottomTabNavigator();

export default function AppLayout() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await usePreloadAssets();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        await SplashScreen.hideAsync();
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
});
