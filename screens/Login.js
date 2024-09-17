import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, Animated, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';

const LoginScreen = ({ onLoginSuccess, onRoleSelect }) => {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role is user

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const bgAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -150,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setLoaded(true));
    }, 3000);
  }, []);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#F5F5F5'],
  });

  const handleLogin = (selectedRole) => {
    setRole(selectedRole);
    onRoleSelect(selectedRole); // Pass the selected role to App.js
    onLoginSuccess(); // Log in
  };

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: translateYAnim }] }]}>
        <Image
          source={require('../assets/imgs/logoInvMgr.png')}
          style={styles.logo}
        />
      </Animated.View>
      
      {loaded && (
        <Animated.View style={[styles.formContainer, { opacity: fadeAnim }]}>
          <TextInput
            style={styles.input}
            placeholder="Correo o Matrícula"
            placeholderTextColor="#8E8E8E"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            placeholderTextColor="#8E8E8E"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          {/* Botones para seleccionar rol */}
          <View style={styles.roleButtonContainer}>
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('user')}>
              <Text style={styles.roleButtonText}>Iniciar sesión como Usuario</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.roleButton} onPress={() => handleLogin('admin')}>
              <Text style={styles.roleButtonText}>Iniciar sesión como Admin</Text>
            </TouchableOpacity>
          </View>
          
          
          
        </Animated.View>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    position: 'absolute',
    top: '40%',
  },
  logo: {
    width: 150,
    height: 150,
  },
  formContainer: {
    width: '80%',
    marginTop: '50%',
  },
  input: {
    height: 40,
    borderColor: '#8E8E8E',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
  roleButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  roleButton: {
    flex: 1,
    backgroundColor: '#0A74DA',
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  roleButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;
