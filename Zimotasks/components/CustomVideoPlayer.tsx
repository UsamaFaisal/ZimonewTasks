import React, { useState, useRef ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Image, TouchableWithoutFeedback,ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const CustomVideoPlayer = () => {
    const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isBuffering, setIsBuffering] = useState(true);
  const [showControls, setShowControls] = useState(true);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const videoRef = useRef(null);
  const handleback = () => {
    // Lock the orientation to landscape
    navigation.goBack();
    Orientation.lockToPortrait();
      setOrientation('PORTRAIT');
    
  };
  const resetTimeout = () => {
    setShowControls(true);
    clearTimeout(controlTimeout);
    controlTimeout = setTimeout(() => {
      setShowControls(false);
    }, 5000); // 5 seconds timeout
  };

  let controlTimeout:any;

  const toggleControls = () => {
    setShowControls(!showControls);
    resetTimeout();
  };
  useEffect(() => {
    resetTimeout();
  }, [isPlaying]);

  const toggleOrientation = () => {
    if (orientation === 'PORTRAIT') {
      Orientation.lockToLandscape();
      setOrientation('LANDSCAPE');
    } else {
      Orientation.lockToPortrait();
      setOrientation('PORTRAIT');
    }
  };
  // const handleBuffer = (meta) => {
  //   if (meta.isBuffering) {
  //     setIsBuffering(true);
  //   } else {
  //     setIsBuffering(false);
  //   }
  // };
  const handleBuffering = (buffering) => {
    setIsBuffering(buffering?.isBuffering);
    if (buffering?.isBuffering == true) {
     setIsBuffering(true);
    }
    else if (buffering?.isBuffering == false) {
      setIsBuffering(false);
    }
  };
  const window = Dimensions.get('window');

  return (
    <TouchableWithoutFeedback onPress={toggleControls}>
    <View style={styles.container}>
      {showControls && (<View style={styles.header}>
      <TouchableOpacity onPress={handleback} >
        <Image source={require('../assets/arrow.png')} style={styles.iconImage} />
       </TouchableOpacity>
       <Image source={require('../assets/zimo1.png')} style={styles.iconImage1} />
       <View style={styles.in}>
            <Image source={require('../assets/carrow.png')} style={styles.iconImage} />
            <Image source={require('../assets/heart.png')} style={styles.iconImage} />
       </View>
      </View>)}
      <Video
        ref={videoRef}
        source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
        controls={true}
        // Remove loading state when video loads
        paused={!isPlaying} // Use paused prop to control playback
        resizeMode={orientation === 'PORTRAIT' ? 'contain' : 'cover'}
        style={styles.video}
        onBuffer={() => setIsBuffering(true)} // Set loading state when buffering
        onLoad={() => setIsBuffering(false)}
        onPlaybackStalled={() => setIsBuffering(true)}
        onPlaybackResume={()=>setIsBuffering(false)}
      />
      {isBuffering && (
          <View style={styles.loader}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      <View style={styles.overlay}> 
      {showControls && (     
      <TouchableOpacity onPress={toggleOrientation}>
                {orientation === 'PORTRAIT' ? (
                  <Image source={require('../assets/fullscreen.png')} style={styles.controlImage} />
                ) : (
                  <Image source={require('../assets/exitfullscreen.png')} style={styles.controlImage} />
                )}
                
              </TouchableOpacity>)}
      </View>
    </View>
 </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay:{
   position:'absolute',
   top:'40%',
   alignSelf:'flex-end',
   justifyContent:'space-between',

  },
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controlImage: {
    width: 40,
    height: 40,
  },
  in: {
    flexDirection:'row',
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  iconImage1: {
    width: 90,
    height: 34,
    marginLeft:35,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  header: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    zIndex: 1, // Ensure the header is above the video
  },
  headerText: {
    color: 'white',
  },
  playButtonContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -24 }, { translateY: -24 }],
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 48,
    zIndex: 1, // Ensure the play button is above the video
  },
  playButton: {
    fontSize: 48,
    color: 'white',
  },
  controls: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 12,
    justifyContent: 'space-around',
    alignItems: 'center', // Add alignItems to center the items horizontally
    backgroundColor: '#000',
    flexDirection: 'row', // Change to 'row' for row-wise layout
    zIndex: 1,
  },
  
  controlText: {
    color: 'white',
    marginRight: 10,
  },
});

export default CustomVideoPlayer;
