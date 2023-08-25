import React from 'react';
import { View,Image,Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
const Header = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.header}>
      <TouchableOpacity onPress={()=>navigation.goBack()} >
        <Image source={require('../assets/arrow1.png')} style={styles.iconImage} />
       </TouchableOpacity>
      <Image source={require('../assets/zimo11.png')} style={styles.logoIcon} resizeMode="contain" />
      <Image source={require('../assets/zimo2.png')} style={styles.iconImage} />
    </View>
      );  
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    // justifyContent: 'center',
    height: 60,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
  },
  logoIcon: {
    width: 80,
    height: 40,
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  backButton: {
   // paddingRight: 20,
  },
});

export default Header;
