import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Footer = () => {
  return (
    <View style={styles.footer}>
      {/* Footer content goes here */}
      <TouchableOpacity onPress={() => console.log('Footer button pressed')}>
        <Image source={require('../assets/heart.png')} style={styles.iconImage} />
      </TouchableOpacity>
      {/* Add more footer content as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        // backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
  iconImage: {
    width: 34,
    height: 34,
  },
});

export default Footer;
