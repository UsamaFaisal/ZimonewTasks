import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

const IndicatorLines: React.FC = () => {
  return (
    <View style={styles.container}>
        <View style={styles.con}>
      <Text style={styles.start}>££5,000,000 GBP                  </Text>
      <View >
      <Text style={styles.upper}> Sotheby's</Text>  
        <Text style={styles.below}>INTERNATIONAL REALITY</Text>
      </View>
      </View>
      <View style={styles.indicatorLinesContainer}>
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        <View style={styles.line} />
        
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    start:{
        alignSelf:'flex-start',
        color:'white',
    },
    below:{
        fontSize:6,
        color:'#fff',
    },
    con:{
        flexDirection:'row',
        marginBottom:10,
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    upper:{
        alignSelf:'flex-end',
        color:'white',
    },
  container: {
    marginBottom: 20,
    flexDirection: 'column',
    alignItems: 'center',
    // alignItems: 'center', // Center the content vertically
  },
  indicatorLinesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  line: {
    flex: 1,
    height: 3, // Adjust the height of the lines as needed
    backgroundColor: '#fff', // Adjust the color of the lines as needed
    marginHorizontal: 5, // Adjust the spacing between lines as needed
  },
});

export default IndicatorLines;
