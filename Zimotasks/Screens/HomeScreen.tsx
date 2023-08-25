import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const HomeScreen: React.FC<any> = ({ navigation }) => {
  return (
    <View style={styles.container}>
       <View style={styles.button}>
        <Button
          title="TASK 1"
          onPress={() => navigation.navigate('CardScreen')}
         />
       </View>
       <View style={styles.button}>
        <Button
          title="TASK 2"
          onPress={() => navigation.navigate('VideoScreen')}
         />
       </View>
       <View style={styles.button}>
        <Button
          title="TASK 3"
          onPress={() => navigation.navigate('ScannerScreen')}
         />
       </View>
       <View style={styles.button}>
        <Button
          title="TASK 4"
          onPress={() => navigation.navigate('AnimationScreen')}
         />
       </View>
       <View style={styles.button}>
        <Button
          title="TASK 5"
          onPress={() => navigation.navigate('Gallery')}
         />
       </View>
       <View style={styles.button}>
        <Button
          title="TASK 6"
           onPress={() => navigation.navigate('StaticContact')}
         />
       </View>
    </View>
  );
};
const styles=StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button:{
    margin:5,
  },
});
export default HomeScreen;
