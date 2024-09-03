import React, { useEffect, useRef, useState } from 'react';
import { View, TextInput, Button, Animated, StyleSheet, Image } from 'react-native';

const LoginScreen = ({ onLoginSuccess }) => {
  const [loaded, setLoaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const fadeAnim = useRef(new Animated.Value(0)).current; // Inicia la opacidad en 0
  const translateYAnim = useRef(new Animated.Value(0)).current; // Controla la posición vertical del logo
  const bgAnim = useRef(new Animated.Value(0)).current; // Controla la transición del fondo

  useEffect(() => {
    // Simular la carga de la pantalla splash
    setTimeout(() => {
      // Mover el logo hacia arriba y cambiar el fondo
      Animated.parallel([
        Animated.timing(translateYAnim, {
          toValue: -150, // Ajusta según sea necesario
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(bgAnim, {
          toValue: 1, // Cambia de oscuro a claro
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(fadeAnim, {
          toValue: 1, // Mostrar los campos de texto y botón
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => setLoaded(true));
    }, 3000); // Simula un tiempo de carga de 3 segundos
  }, []);

  const backgroundColor = bgAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#000000', '#F5F5F5'], // De oscuro a claro
  });

  return (
    <Animated.View style={[styles.container, { backgroundColor }]}>
      <Animated.View style={[styles.logoContainer, { transform: [{ translateY: translateYAnim }] }]}>
        <Image
          source={require('../assets/imgs/logoInvMgr.png')} // Reemplaza con la ruta correcta de tu imagen local
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
          <View style={styles.buttonContainer}>
            <Button title="Iniciar Sesión" color="#0A74DA" onPress={onLoginSuccess} />
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
  buttonContainer: {
    marginTop: 20,
  },
});

export default LoginScreen;
