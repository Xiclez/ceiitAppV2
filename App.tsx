import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Text, View } from 'react-native';
import Home from './screens/Home';
import Objetos from './screens/Objetos';
import ObjetoDetalle from './screens/ObjetoDetalle';
import BottomNavbar from './components/BottomNavbar';
import LoginScreen from './screens/Login'; 
import Perfil from './screens/Perfil';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeScreen() {
  return <Home />;
}
function PerfilScreen() {
  return <Perfil />;
}

function ObjetosStackScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="ListaObjetos"  
        component={Objetos} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ObjetoDetalle" 
        component={ObjetoDetalle} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings!</Text>
    </View>
  );
}

function MainApp() {
  return (
    <Tab.Navigator tabBar={props => <BottomNavbar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }} 
      />
      <Tab.Screen
        name="Objetos"
        component={ObjetosStackScreen} 
        options={{ headerShown: false }} 
      />
      <Tab.Screen
        name="Perfil"
        component={PerfilScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Estado para manejar si el usuario está logueado o no

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          // Si no está logueado, mostramos la pantalla de Login
          <Stack.Screen 
            name="Login" 
            options={{ headerShown: false }}
          >
            {props => <LoginScreen {...props} onLoginSuccess={() => setIsLoggedIn(true)} />} 
          </Stack.Screen>
        ) : (
          // Si está logueado, mostramos la aplicación principal
          <Stack.Screen 
            name="MainApp" 
            component={MainApp} 
            options={{ headerShown: false }} 
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
