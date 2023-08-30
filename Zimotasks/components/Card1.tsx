import React from 'react';
import { View, StyleSheet,ImageBackground,Text } from 'react-native';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import IndicatorLines from './IndicatorLines1';
import BuyNowButton from './BuyNowButton';

const Card: React.FC<any> = () => {
  return (
    <View style={styles.cardContainer}>
        <ImageBackground
            source={require('../assets/background.png')}
            style={styles.imageBackground}>
            <Timer />
            <View style={styles.bottomContainer}>
                 <ProgressBar />
                 <IndicatorLines />
             </View>
             <View >
                 <Text style={styles.textt} >SHELTON STREET COVENT GARDEN LONDON WC2H UNITED KINGDOM</Text>
                 <Text style={styles.textt1} >#ZM7861234567</Text>
             </View>
             <View style={styles.line}>

             </View>
            <BuyNowButton />
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    borderRadius: 10,
    marginTop: 140,
    marginRight:20,
    height:390,
    marginLeft:20,
    alignSelf:'center',
    overflow: 'hidden',
  },
  line:{
      height: 8, 
      backgroundColor: '#fff', 
  },
  bottomContainer: {
    flexDirection: 'row',
    flex:1,
    justifyContent: 'flex-start', 
    alignItems: 'flex-end', 
  },
  imageBackground: {
    flex:1,
     resizeMode: 'cover',
  },
  textt:{
    fontSize:9,
   color:'white',
   alignSelf:'center',
   alignItems:'center',
  },
  textt1:{
    fontSize:9,
   color:'white',
   alignSelf:'flex-end',
   alignItems:'center',
   margin:5,
  },
});

export default Card;
