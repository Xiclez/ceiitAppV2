import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './screens/Home';
import Objetos from './screens/Objetos';
import ObjetoDetalle from './screens/ObjetoDetalle';
import BottomNavbar from './components/BottomNavbar';
import LoginScreen from './screens/Login'; 
import Perfil from './screens/Perfil';
import HistorialPrestamos from './screens/HistorialPrestamos';
import Escaner from './screens/Escaner';
import SolicitudPrestamo from './screens/SolicitudPrestamo';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

interface EscanerScreenProps {
  userRole: 'user' | 'admin';
}

const EscanerScreen: React.FC<EscanerScreenProps> = ({ userRole }) => {
  return <Escaner userRole={userRole} />;
};

function HomeScreen() {
  return <Home />;
}

function PerfilScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Perfil"
        component={Perfil}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="HistorialPrestamos" 
        component={HistorialPrestamos}
        options={{ headerShown: false, title: 'Historial de Préstamos' }}
      />
    </Stack.Navigator>
  );
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
      <Stack.Screen 
        name="SolicitudPrestamo" 
        component={SolicitudPrestamo} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

function MainApp({ route }: { route: any }) {
  const { userRole } = route.params;

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
        name="Escaner"
        children={() => <EscanerScreen userRole={userRole} />}
        options={{ headerShown: false }} 
      />
    </Tab.Navigator>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<'user' | 'admin'>('user'); // Default role is 'user'

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleRoleSelect = (role: 'user' | 'admin') => {
    setUserRole(role);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isLoggedIn ? (
          <Stack.Screen 
            name="Login" 
            options={{ headerShown: false }}
          >
            {props => (
              <LoginScreen 
                {...props} 
                onLoginSuccess={handleLogin} 
                onRoleSelect={handleRoleSelect}
              />
            )}
          </Stack.Screen>
        ) : (
          <Stack.Screen 
            name="MainApp" 
            component={MainApp}
            options={{ headerShown: false }} 
            initialParams={{ userRole }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
