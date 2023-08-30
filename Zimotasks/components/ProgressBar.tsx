import React from 'react';
import { View, Text, StyleSheet ,Image} from 'react-native';
const ProgressBar: React.FC<any> = () => {
    const progress=26;
  const normalizedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <View style={styles.progressBarContainer}>
    <View >
      <Image style={styles.pb} source={require('../assets/pb.png')} />
    </View>
    <Text style={styles.textBelow}>{`${normalizedProgress}%`}</Text>
  </View>
  );
};
const styles = StyleSheet.create({
    progressBarContainer: {
        alignItems: 'center',
        margin:10,
      },
      textAbove: {
        marginTop: 5,
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
      },
      outerSquare: {
        width: 50, // Adjust the size as needed
        height: 50, // Adjust the size as needed
        borderColor: '#007AFF', // Outer square color
        borderWidth: 10, // Border width
        borderRadius: 10, // Outer square border radius
        overflow: 'hidden', // Clip inner content
      },
      innerSquare: {
        width: '100%',
        height: '100%',
        backgroundColor: '#007AFF', // Inner square color (progress color)
      },
      pb:{
        height:40,
        width:40,
      },
      textBelow: {
        // marginTop: 5,
        color: '#fff',
        fontSize: 16,
        
        // fontWeight: 'bold',
      },
      textAgy: {
        marginTop: 5,
        color: '#000',
        fontSize: 16,
        alignSelf:'flex-end',
        fontWeight: 'bold',
      },
});

export default ProgressBar;
