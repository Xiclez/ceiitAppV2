import React from 'react';
import { View, Text, ScrollView, TextInput, ImageBackground, TouchableOpacity, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Asegúrate de tener react-native-vector-icons instalado

const Home = () => {
  const ultimosPrestamos = [
    { id: '1', titulo: 'Coffee break nuevo ingreso', tipo: 'Convivencia', fecha: 'Oct 02', plusIcon: true },
    { id: '2', titulo: 'Visita museo de Antropología', tipo: 'Cultural', fecha: 'Oct 02', plusIcon: true },
  ];

  const categorias = [
    { id: '1', icon: 'ios-people', name: 'Visitas' },
    { id: '2', icon: 'ios-heart', name: 'Misas' },
    { id: '3', icon: 'ios-football', name: 'Deportivos' },
    { id: '4', icon: 'ios-book', name: 'Cultural' },
  ];

  const eventosCulturales = [
    { id: '1', titulo: 'Concierto con causa', fecha: 'Oct 02', plusIcon: true },
    { id: '2', titulo: 'Misa de Asunción', fecha: 'Oct 02', plusIcon: true },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f5f5f5' }}>
      {/* Header */}
      <View style={{ paddingHorizontal: 20, paddingVertical: 10 }}>
        <Text style={{ color: '#888', fontSize: 12 }}>Marzo 23, 2023</Text>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hola <Text style={{ color: '#1e3a8a' }}>Juan Ramirez</Text> 👋</Text>
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

      {/* Nuevos */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Nuevos</Text>
        <FlatList
          data={ultimosPrestamos}
          horizontal
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginRight: 10 }}>
              <ImageBackground
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={{ width: 150, height: 100, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
              >
                <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  {item.plusIcon && <Text style={{ color: '#ffcc00', marginBottom: 5 }}>+5</Text>}
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.titulo}</Text>
                  <Text style={{ color: '#fff' }}>{item.tipo}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Categorías */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Categorías</Text>
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

      {/* Culturales */}
      <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
        <FlatList
          data={eventosCulturales}
          renderItem={({ item }) => (
            <TouchableOpacity style={{ marginBottom: 10 }}>
              <ImageBackground
                source={{ uri: 'https://via.placeholder.com/150' }}
                style={{ height: 100, justifyContent: 'flex-end', borderRadius: 10, overflow: 'hidden' }}
              >
                <View style={{ padding: 10, backgroundColor: 'rgba(0,0,0,0.3)' }}>
                  {item.plusIcon && <Text style={{ color: '#ffcc00', marginBottom: 5 }}>+5</Text>}
                  <Text style={{ color: '#fff', fontWeight: 'bold' }}>{item.titulo}</Text>
                  <Text style={{ color: '#fff' }}>{item.fecha}</Text>
                </View>
              </ImageBackground>
            </TouchableOpacity>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      {/* Bottom Navigation */}
      
    </ScrollView>
  );
};

export default Home;
