import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import staticData from '../assets/DummyData.json'; // Import the JSON file

const categories = [
  { id: '1', name: 'Herramientas', icon: 'home' },
  { id: '2', name: 'Máquinas', icon: 'heart' },
  { id: '3', name: 'Impresoras', icon: 'football' },
  { id: '4', name: 'Sublimación', icon: 'book' },
  { id: '5', name: 'Electrónica', icon: 'book' },
  { id: '6', name: 'Audiovisuales', icon: 'book' },
];

const Objetos = () => {
  const navigation = useNavigation();
  const [objetos, setObjetos] = useState([]);

  useEffect(() => {
    

    setObjetos(staticData.objetos);
  }, []);

  const getEstadoStyle = (estado) => {
    switch (estado) {
      case 'Disponible':
        return styles.estadoDisponible;
      case 'En Uso':
        return styles.estadoEnUso;
      case 'En Mantenimiento':
        return styles.estadoMantenimiento;
      case 'No Disponible':
        return styles.estadoNoDisponible;
      default:
        return styles.estadoDefault;
    }
  };

  const renderCategory = () => (
    <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Categorías</Text>
      <FlatList
        data={categories}
        horizontal
        renderItem={({ item }) => (
          <TouchableOpacity style={{ alignItems: 'center', marginRight: 15 }}>
            <View style={{
              width: 60,
              height: 60,
              borderRadius: 30,
              backgroundColor: '#fff',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 5,
            }}>
              <Icon name={item.icon} size={28} color="#1e3a8a" />
            </View>
            <Text>{item.name}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={{ marginBottom: 15 }} 
      onPress={() => navigation.navigate('ObjetoDetalle', { objeto: item })}
    >
      <ImageBackground
        source={{ uri: item.urlImagen || 'default-image-url' }} // Usa una imagen por defecto si `urlImagen` es undefined
        style={{ height: 150, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
      >
        <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: '#ffcc00', marginBottom: 5 }}>{item.categoria || 'Sin categoría'}</Text>
          <Text style={[styles.estadoLabel, getEstadoStyle(item.estado)]}>{item.estado || 'Estado desconocido'}</Text>
        </View>
        <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.4)', flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: '#fff', fontWeight: 'bold', padding: 10 }}>{item.nombre}</Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={objetos}
      ListHeaderComponent={() => (
        <View>
          {/* Header */}
          <View style={{ paddingHorizontal: 20, paddingVertical: 15 }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#1e3a8a', textAlign: 'center' }}>Objetos</Text>
          </View>

          {/* Search and Date */}
          <View style={{ paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <TextInput
              placeholder="Buscar"
              style={{
                flex: 1,
                height: 40,
                backgroundColor: '#fff',
                borderRadius: 10,
                paddingHorizontal: 10,
                marginRight: 10,
              }}
            />
            <View style={{ height: 40, backgroundColor: '#fff', borderRadius: 10, paddingHorizontal: 10, justifyContent: 'center' }}>
              <Text>Order by</Text>
            </View>
          </View>

          {/* Render Categories */}
          {renderCategory()}
        </View>
      )}
      renderItem={renderItem}
      keyExtractor={item => item._id} // Usar el `_id` para keyExtractor
      contentContainerStyle={{ paddingHorizontal: 20 }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  estadoLabel: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  estadoDisponible: {
    backgroundColor: '#4CAF50', // Verde
  },
  estadoEnUso: {
    backgroundColor: '#FFEB3B', // Amarillo
    color: '#000',
  },
  estadoMantenimiento: {
    backgroundColor: '#B3E5FC', // Azul claro
    color: '#000',
  },
  estadoNoDisponible: {
    backgroundColor: '#F44336', // Rojo
  },
  estadoDefault: {
    backgroundColor: '#9E9E9E', // Gris por defecto
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default Objetos;
             
