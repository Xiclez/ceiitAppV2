import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ImageBackground, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

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
    const staticData = [
      {
        _id: '1',
        nombre: 'SIERRA DE MESA RYOBI',
        descripcion: 'Sierra de mesa para trabajos de carpintería.',
        estado: 'Disponible',
        categoria: 'Herramientas',
        urlImagen: 'https://cdn.homedepot.com.mx/productos/133485/133485-d.jpg',
        ubicacion: 'Taller de Madera y Metal',
      },
      {
        _id: '2',
        nombre: 'TORNO DE MADERA KNOVA',
        descripcion: 'Torno de madera para trabajos precisos.',
        estado: 'Disponible',
        categoria: 'Herramientas',
        urlImagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFd2PLKOm-wZl2e3xD57rL-_D8IENvasFQGQ&s',
        ubicacion: 'Taller de Madera y Metal',
      },
      {
        _id: '3',
        nombre: 'IMPRESORA 3D CREALITY',
        descripcion: 'Impresora 3D para prototipado rápido.',
        estado: 'En Uso',
        categoria: 'Impresoras',
        urlImagen: 'https://www.3dmarket.mx/wp-content/uploads/2022/07/Impresora-3D-Ender-3-S1-Creality.webp',
        ubicacion: 'FabLab',
      },
      {
        _id: '4',
        nombre: 'SUBLIMADORA CACHUCHAS',
        descripcion: 'Máquina de sublimación para gorras.',
        estado: 'Disponible',
        categoria: 'Sublimación',
        urlImagen: 'https://resources.sears.com.mx/medios-plazavip/mkt/6109c9f131422_gorrajpg.jpg',
        ubicacion: 'FabLab',
      },
      {
        _id: '5',
        nombre: 'TALADRO INALÁMBRICO',
        descripcion: 'Taladro inalámbrico de alta potencia.',
        estado: 'Disponible',
        categoria: 'Herramientas',
        urlImagen: 'https://static.grainger.com/rp/s/is/image/Grainger/22UT50_AS02?$glgmain$',
        ubicacion: 'Taller de Madera y Metal',
      },
      {
        _id: '6',
        nombre: 'LÁSER DE CORTE',
        descripcion: 'Máquina láser para corte de precisión.',
        estado: 'En Mantenimiento',
        categoria: 'Máquinas',
        urlImagen: 'https://m.media-amazon.com/images/I/71zrbVEpAaL.jpg',
        ubicacion: 'FabLab',
      },
      {
        _id: '7',
        nombre: 'Raspberry Pi 3 Model B+',
        descripcion: 'Computadora compacta para proyectos de IoT.',
        estado: 'Disponible',
        categoria: 'Electrónica',
        urlImagen: 'https://m.media-amazon.com/images/I/71nhCFbdy0L.jpg',
        ubicacion: 'Oficina',
      },
      {
        _id: '8',
        nombre: 'Protoboard',
        descripcion: 'Tablilla de pruebas para prototipado de circuitos de 830 puntos.',
        estado: 'Disponible',
        categoria: 'Electrónica',
        urlImagen: 'https://aelectronics.com.mx/893/protoboard-blanca-de-830-puntos.jpg',
        ubicacion: 'Oficina',
      },
      {
        _id: '9',
        nombre: 'PROYECTOR EPSON',
        descripcion: 'Proyector de alta definición para presentaciones.',
        estado: 'En Uso',
        categoria: 'Audiovisuales',
        urlImagen: 'https://mediaserver.goepson.com/ImConvServlet/imconv/93ca5c94893d43c0e0512ff54ce6f5b624db3707/1200Wx1200H?use=banner&hybrisId=B2C&assetDescr=V11H569020_Proyectores_Epson%20PowerLite%20X17_ES',
        ubicacion: 'Oficina',
      },
      {
        _id: '10',
        nombre: 'MESA DE CORTE',
        descripcion: 'Mesa de corte para trabajos grandes.',
        estado: 'No Disponible',
        categoria: 'Herramientas',
        urlImagen: 'https://res.cloudinary.com/dn4m0kr7j/image/upload/v1719868792/logoInvMgr_ongzfh.png',
        ubicacion: 'Taller de Madera y Metal',
      }
    ];

    setObjetos(staticData);
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
             
