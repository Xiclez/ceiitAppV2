// components/BottomNavbar.js
import React from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BottomNavbar = ({ navigation }) => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 10, backgroundColor: '#fff' }}>
      <Icon name="home-outline" size={28} color="#1e3a8a" onPress={() => navigation.navigate('Home')} />
      <Icon name="calendar-outline" size={28} color="#aaa" onPress={() => navigation.navigate('Objetos')} />
      <Icon name="notifications-outline" size={28} color="#aaa" onPress={() => navigation.navigate('Notifications')} />
      <Icon name="person-outline" size={28} color="#aaa" onPress={() => navigation.navigate('Perfil')} />
    </View>
  );
};

export default BottomNavbar;
