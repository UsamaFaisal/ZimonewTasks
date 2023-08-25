// Card.tsx
import React from 'react';
import { View, StyleSheet,ImageBackground,Text } from 'react-native';
import Timer from './Timer';
import ProgressBar from './ProgressBar';
import IndicatorLines from './IndicatorLines';
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
            <BuyNowButton />
        </ImageBackground>
      </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    // flex: 1,
    // borderWidth: 1,
    // borderColor: '#000',
    // backgroundColor:'#000',
    borderRadius: 10,
    //  padding: 110,
    marginTop: 120,
    marginRight:20,
    marginLeft:20,
    // alignItems: 'center',
    // alignItems: 'center',
    // justifyContent: 'center',
    overflow: 'hidden',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start', // Horizontally space ProgressBar and IndicatorLines
    alignItems: 'flex-end', // Align them to the bottom
  },
  imageBackground: {
    // padding:110,
    // height:270,
    //  resizeMode: 'cover',
  },
  textt:{
    fontSize:9,
   color:'white',
   alignSelf:'center',
   alignItems:'center',
//    margin:5,
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
