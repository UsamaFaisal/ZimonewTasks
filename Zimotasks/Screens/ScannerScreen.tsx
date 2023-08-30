import React, { useRef, useState,useEffect } from 'react';
import { View, Text, StyleSheet, Linking, Image, TouchableOpacity} from 'react-native';
import { RNCamera, BarCodeReadEvent } from 'react-native-camera';
import { useNavigation } from '@react-navigation/native';
import { PinchGestureHandler, State } from 'react-native-gesture-handler';

const ScannerScreen = () => {
  const cameraRef = useRef<RNCamera | null>(null);
  const navigation = useNavigation();
  const [isFlashlightOn, setIsFlashlightOn] = useState(false); // State for flashlight toggle
  const [isImageVisible, setIsImageVisible] = useState(true);  
  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsImageVisible((prev) => !prev);
    }, 1000);
    
    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);
  const barcodeRecognized = async ({ data }: BarCodeReadEvent) => {
    console.log(data);
    if (await Linking.canOpenURL(data)) {
      Linking.openURL(data)
        .then(() => {
          console.log(`Opened URL: ${data}`);
        })
        .catch((error) => {
          console.error(`Error opening URL: ${error}`);
        });
    } else {
      console.warn(`Not a valid URL: ${data}`);
    }
  };

  // Function to toggle flashlight
  const toggleFlashlight = async () => {
    if (cameraRef.current) {
      try {
        const torchMode = isFlashlightOn
          ? RNCamera.Constants.FlashMode.off
          : RNCamera.Constants.FlashMode.torch;
        setIsFlashlightOn(!isFlashlightOn);
      } catch (e) {
        console.error('Error toggling flashlight:', e);
      }
    }
  };
  const [lastZoom,setlastZoom]=useState(0);

  const handleZoom = (event) => {
    const currentZoom = event.nativeEvent.scale;
    if (event.nativeEvent.state === State.ACTIVE) {
      const newZoomLevel = lastZoom + (currentZoom-1);
      if (newZoomLevel >= 0 && newZoomLevel <= 1) {
        if (cameraRef.current) {
          cameraRef.current.zoom = newZoomLevel; 
          setlastZoom(newZoomLevel);
        }
      }
    }
  };
  return (
    <PinchGestureHandler onGestureEvent={handleZoom}> 
    <View style={styles.container}>     
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../assets/arrow.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <Image source={require('../assets/zimo1.png')} style={styles.iconImage1} />
        <View style={styles.in}>
          <Text style={styles.txt}>PAKISTAN</Text>
          <Image source={require('../assets/flag.png')} style={styles.iconImage} />
        </View>
      </View>
      
      <RNCamera
        ref={cameraRef}
        style={styles.camera}
        onBarCodeRead={barcodeRecognized}
        flashMode={isFlashlightOn ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
        zoom={lastZoom}
      />
      {isImageVisible && (
      <Image
        source={require('../assets/arr.png')} // Use your transparent image
        style={styles.overlayImage}
      />)}
      <View style={styles.footer}>      
        <TouchableOpacity>
          <View>
          <Text style={styles.smalltxt}>Scan</Text>
          <Text style={styles.largetxt}>QR</Text>
          <Text style={styles.smalltxt}>Code</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.buttonText1}>History</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleFlashlight}>
          <Image
            source={require('../assets/flashlight.png')} // Use your flashlight icon image
            style={styles.buttonIcon}
          />
        </TouchableOpacity>
      </View>
      
    </View>
    </PinchGestureHandler>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayImage: {
    position: 'absolute',
    top: '10%', // Adjust the position as needed
    // alignSelf: 'center',
    // width: 700, // Adjust the size as needed
    // height: 700,
    opacity: 1, // Adjust the opacity as needed
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  txt: {
    color: 'white',
    justifyContent: 'center',
    paddingRight:3,
    fontSize:10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  in: {
    flexDirection: 'row',
    alignItems:'center',
  },
  middleImage: {
    width: 200, 
    // height: 200,
    marginVertical: 20,
    // color:'rgba(255, 255, 255, 0.5)',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  smalltxt:{
    fontSize:8,
    color:'white',
    marginLeft:5,
  },
  largetxt:{
   color:'white',
   fontSize:14,
   alignItems:'center',
   marginLeft:5,
  },
  iconImage: {
    width: 22,
    height: 22,
  },
  iconImage1: {
    width: 90,
    height: 28,
    paddingLeft:10,
    marginLeft:67,
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    zIndex: 1,
  },
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
  buttonIcon: {
    width: 24,
    height: 24,
    tintColor: 'white',
    paddingRight:20,
    marginRight:7,
  },
  buttonText: {
    color: 'white',
  },
  buttonText1:{
    color:'white',
    // paddingRight:10,
    paddingLeft:10,
  },
});

export default ScannerScreen;
