import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Perfil = () => {
  return (
    <View style={styles.container}>
      {/* Header de perfil */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Perfil</Text>
      </View>

      {/* QR code y foto de perfil */}
      <View style={styles.qrContainer}>
        <ImageBackground
          source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/800px-QR_code_for_mobile_English_Wikipedia.svg.png' }}
          style={styles.qrCode}
          resizeMode="contain"
        >
          <View style={styles.profilePicContainer}>
            <Image
              source={{ uri: 'https://muhimu.es/wp-content/uploads/2017/04/FRENTE-NITIDA.jpg' }} // URL de ejemplo para la foto de perfil
              style={styles.profilePic}
            />
            <TouchableOpacity style={styles.cameraIcon}>
              <Icon name="camera-outline" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </ImageBackground>
        <Text style={styles.userName}>Juan Ramirez</Text>
        <Text style={styles.carrera}>Ing. en Mecatrónica</Text>
        <Text style={styles.userId}>11422</Text>
      </View>

      {/* Opciones de perfil */}
      <View style={styles.optionContainer}>
        <TouchableOpacity style={styles.optionRow}>
          <Icon name="wallet-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Mis préstamos</Text>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="calendar-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Mi información</Text>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="heart-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Favoritos</Text>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Icon name="person-outline" size={24} color="#000" />
          <Text style={styles.optionText}>Cerrar Sesión</Text>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingTop: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  qrContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  qrCode: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    marginBottom: 20,
    position: 'relative', // Necesario para posicionar la imagen de perfil correctamente
  },
  profilePicContainer: {
    position: 'absolute',
    top: '50%', // Centrado vertical
    left: '50%', // Centrado horizontal
    transform: [{ translateX: -45 }, { translateY: -45 }], // Ajuste para centrar el círculo de la imagen de perfil
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: 'hidden',
    borderWidth: 3,
    borderColor: '#fff',
  },
  profilePic: {
    width: '100%',
    height: '100%',
    borderRadius: 45,
  },
  cameraIcon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#1e3a8a',
    borderRadius: 10,
    padding: 2,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  carrera: {
    fontSize: 16,
    color: '#000',
  },
  userId: {
    fontSize: 16,
    color: '#666',
  },
  optionContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    marginHorizontal: 20,
    paddingVertical: 10,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 1,
  },
  optionText: {
    flex: 1,
    fontSize: 18,
    marginLeft: 15,
    color: '#000',
  },
});

export default Perfil;
