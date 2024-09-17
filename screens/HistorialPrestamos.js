import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import dummyData from '../assets/DummyData.json'; // Import the JSON file

const HistorialPrestamos = () => {
  const [prestamos, setPrestamos] = useState([]);

  useEffect(() => {
    // Load loan data from the JSON file
    setPrestamos(dummyData.prestamos);
  }, []);

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Activo':
        return styles.estadoActivo;
      case 'Finalizado':
        return styles.estadoFinalizado;
      case 'Cancelado':
        return styles.estadoCancelado;
      default:
        return styles.estadoDefault;
    }
  };

  const renderPrestamo = ({ item }) => (
    <TouchableOpacity style={{ marginBottom: 15 }}>
      <ImageBackground
        source={{ uri: item.urlImagen || 'default-image-url' }}
        style={{ height: 150, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
      >
        <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#ffcc00', marginBottom: 5 }}>{item.categoria || 'Sin categoría'}</Text>
          <Text style={[styles.estadoLabel, getEstadoStyle(item.estado)]}>{item.estado || 'Estado desconocido'}</Text>
        </View>
        <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.nombre}</Text>
          <Text style={{ color: '#fff' }}>Dev: {item.fechaDevolucionEstimada}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={prestamos}
      ListHeaderComponent={() => (
        <View style={styles.header}>
          <Text style={styles.headerText}>Historial de Préstamos</Text>
        </View>
      )}
      renderItem={renderPrestamo}
      keyExtractor={item => item._id}
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e3a8a',
  },
  estadoLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  estadoActivo: {
    backgroundColor: '#4CAF50',
  },
  estadoFinalizado: {
    backgroundColor: '#FFEB3B',
    color: '#000',
  },
  estadoCancelado: {
    backgroundColor: '#F44336',
  },
  estadoDefault: {
    backgroundColor: '#9E9E9E',
  },
});

export default HistorialPrestamos;
