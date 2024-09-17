import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const ObjetoDetalle = ({ route, navigation }) => {
  const { objeto } = route.params;
  console.log('Objeto recibido en ObjetoDetalle:', objeto);

  // Contar cuántos objetos están disponibles en la categoría de este objeto
  const disponibles = route.params?.objeto?.categoria 
    ? route.params?.objeto?.categoria.length
    : 0;

  return (
    <ScrollView style={styles.container}>
      {/* Imagen de fondo */}
      <ImageBackground source={{ uri: objeto.urlImagen }} style={styles.imageBackground}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.title}>Detalles del Objeto</Text>
          <TouchableOpacity>
            <Icon name="heart-outline" size={28} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.overlay}>
          <View style={styles.eventInfo}>
            <Text style={styles.category}>{objeto.categoria}</Text>
            <Text style={styles.name}>{objeto.nombre}</Text>
            <Text style={styles.state}>{objeto.estado}</Text>
          </View>
        </View>
      </ImageBackground>

      {/* Detalles del objeto */}
      <View style={styles.detailsContainer}>
        <View style={styles.locationContainer}>
          <Icon name="location-outline" size={20} color="#1e3a8a" />
          <Text style={styles.location}>{objeto.ubicacion}</Text>
        </View>

        <Text style={styles.description}>{objeto.descripcion}</Text>

        {/* Mostrar la cantidad de objetos disponibles */}
      </View>

     {/* Botón */}
     <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('SolicitudPrestamo', { objeto })} // Navegar a la pantalla SolicitudPrestamo
        >
          <Text style={styles.buttonText}>Solicitar Préstamo</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  imageBackground: {
    height: 300,
    justifyContent: 'flex-end',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingTop: 40,
    position: 'absolute',
    top: 0,
    width: '100%',
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  overlay: {
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 15,
  },
  eventInfo: {
    padding: 10,
  },
  category: {
    color: '#ffcc00',
    marginBottom: 5,
  },
  name: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 24,
  },
  state: {
    color: '#fff',
    fontSize: 18,
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: -20,
    marginHorizontal: 20,
    elevation: 3,
    flexGrow: 1,
    flexShrink: 1,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  location: {
    marginLeft: 5,
    fontSize: 16,
    color: '#1e3a8a',
  },
  description: {
    fontSize: 16,
    color: '#333',
    lineHeight: 24,
    marginBottom: 10,
    flexWrap: 'wrap',
  },
  buttonContainer: {
    margin: 20,
  },
  button: {
    backgroundColor: '#1e3a8a',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  disponibles: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
  },
});

export default ObjetoDetalle;
