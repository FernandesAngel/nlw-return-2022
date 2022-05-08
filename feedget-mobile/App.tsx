import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
// import AppLoading from 'expo-app-loading';
import * as Font from 'expo-font';
import {  Inter_400Regular, Inter_500Medium, Inter_700Bold, useFonts} from '@expo-google-fonts/inter';
import Widget from './src/components/Widget';
import { theme } from './src/theme';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {


  const [fontsLoaded] =  useFonts({
    Inter_400Regular,
    Inter_500Medium
  });

  if (!fontsLoaded) {
    SplashScreen.preventAutoHideAsync();
    // return <AppLoading />;
  }

  SplashScreen.hideAsync();

  // useEffect(() => {
  //   async function loadResourcesAndDataAsync() {
  //     try{
  //       SplashScreen.preventAutoHideAsync();

  //       await Font.loadAsync({
  //         Inter_400Regular,
  //         Inter_500Medium,
  //         Inter_700Bold
  //       });
  //       console.log('entrooou')
  //     } catch (e) {
  //       // We might want to provide this error information to an error reporting service
  //       console.log('tudo errado', e);
  //      } finally {
  //       SplashScreen.hideAsync();
  //      }
  //   }
  //   loadResourcesAndDataAsync()
  // }, []);

  return (
    <>
    <StatusBar
        style="light"
        backgroundColor="transparent"
        translucent
    />

    <View style={{
      flex: 1,
      backgroundColor: theme.colors.background
    }}>
      <Widget />
    </View>
    </>
  );
}

