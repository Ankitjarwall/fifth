import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Landing from './screen/landing';
import Profile from './screen/profile';
import Story from './screen/story';
import { MenuProvider } from "react-native-popup-menu";
import { useContext } from "react";
import StoriesContextProvider, { StoriesContext } from './store/storiesContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StoriesContextProvider>
      <MenuProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="landing" component={Landing} />
            <Stack.Screen name="profile" component={Profile} />
            <Stack.Screen name="story" component={Story} />
          </Stack.Navigator>
        </NavigationContainer>
      </MenuProvider>
    </StoriesContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
