import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const BuyNowButton: React.FC = () => {
  return (
    <View style={styles.buyNowButtonContainer}>
      <TouchableOpacity   onPress={() => console.log('Buy Now pressed')}>
        <View style={styles.buttonContent}>
          <Text style={styles.buyNowButtonText}>£25.00 GBP</Text>
          <Text style={styles.buyNowButtonText}>Buy Entry Now</Text>   
        </View>
        <View style={styles.buttonshortContent}>
          <Text style={styles.shortText}>#ZM123456789</Text>   
        </View>
       
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  buyNowButtonContainer: {
    alignSelf: 'stretch',
  },
  buttonContent: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between', // Align texts at the start and end
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
  },
  buttonshortContent: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'flex-end', // Align texts at the start and end
    // alignItems: 'flex-end',
    borderRadius: 5,
  },
  buyNowButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold', // Adjust as needed
  },
  shortText: {
    color: 'white',
    padding:2,
    fontSize: 14, // Adjust as needed
  },
});

export default BuyNowButton;
