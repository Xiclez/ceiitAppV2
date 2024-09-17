import React from 'react';
import { View, Text, ScrollView, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  // Próximas devoluciones de equipos
  const proximasDevoluciones = [
    { id: '1', titulo: 'SIERRA DE MESA RYOBI', fechaDevolucion: 'Oct 10' },
    { id: '2', titulo: 'IMPRESORA 3D CREALITY', fechaDevolucion: 'Oct 15' },
  ];

  // Categorías de equipos disponibles
  const categorias = [
    { id: '1', icon: 'build', name: 'Herramientas' },
    { id: '2', icon: 'print', name: 'Impresoras 3D' },
    { id: '3', icon: 'hat', name: 'Sublimación' },
  ];

  // Equipos más solicitados
  const equiposPopulares = [
    { id: '1', titulo: 'Láser de Corte', categoria: 'Máquinas', urlImagen: 'https://m.media-amazon.com/images/I/71zrbVEpAaL.jpg' },
    { id: '2', titulo: 'Torno de Madera', categoria: 'Herramientas', urlImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFd2PLKOm-wZl2e3xD57rL-_D8IENvasFQGQ&s' },
  ];

  // Préstamos activos
  const prestamosActivos = [
    { id: '1', nombre: 'SIERRA DE MESA RYOBI', fechaPrestamo: 'Sep 01', fechaDevolucion: 'Sep 10' },
    { id: '2', nombre: 'IMPRESORA 3D CREALITY', fechaPrestamo: 'Ago 15', fechaDevolucion: 'Ago 20' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ color: '#888', fontSize: 12 }}>Marzo 23, 2023</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hola <Text style={{ color: '#1e3a8a' }}>Juan Ramirez</Text> 👋</Text>
        <Text>Tienes 2 préstamos activos.</Text>
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
          <Text>11/10 - 14/10</Text>
        </View>
      </View>

      {/* Préstamos Activos */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Tus Préstamos Activos</Text>
        <FlatList
          data={prestamosActivos}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.nombre}</Text>
                <Text>Prestado el: {item.fechaPrestamo}</Text>
                <Text>Devolución: {item.fechaDevolucion}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Próximas Devoluciones */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Próximas Devoluciones</Text>
        <FlatList
          data={proximasDevoluciones}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <View style={{ padding: 10, backgroundColor: '#fff', borderRadius: 10 }}>
                <Text style={{ fontWeight: 'bold' }}>{item.titulo}</Text>
                <Text>Devolución: {item.fechaDevolucion}</Text>
              </View>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Categorías de Equipos */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categorías de Equipos</Text>
        <FlatList
          data={categorias}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{ alignItems: 'center', marginRight: 20 }}>
              <View style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 5,
              }}>
                <Icon name={item.icon} size={24} color="#1e3a8a" />
              </View>
              <Text>{item.name}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Equipos Populares */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Equipos Populares</Text>
        <FlatList
          data={equiposPopulares}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <ImageBackground
                source={{ uri: item.urlImagen }}
                style={{ width: 150, height: 100, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
              >
                <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.titulo}</Text>
                  <Text style={{ color: '#fff' }}>{item.categoria}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </ScrollView>
  );
};

export default Home;
