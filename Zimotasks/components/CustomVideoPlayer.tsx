import React, { useState, useRef ,useEffect} from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions,Image, TouchableWithoutFeedback } from 'react-native';
import Video from 'react-native-video';
import { useNavigation } from '@react-navigation/native';
import Orientation from 'react-native-orientation-locker';

const CustomVideoPlayer = () => {
    const navigation = useNavigation();
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [orientation, setOrientation] = useState('PORTRAIT');
  const videoRef = useRef(null);

  const videoAspectRatio = 16 / 9;

//   const handleStartFromBeginning = () => {
//     if (videoRef.current) {
//       videoRef.current.seek(0); // Seek to the beginning
//       setIsPlaying(true);
//     }
    
//   };
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
// }
const handlePause = () => {
    setIsPlaying(false);
  };
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
  const window = Dimensions.get('window');
  const videoSource = require('../assets/video1.mp4'); // Adjust the source as needed
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
        source={videoSource}
        controls={false}
        paused={!isPlaying} // Use paused prop to control playback
        resizeMode="contain"
        style={[
          styles.video,
          {
            width: orientation === 'PORTRAIT' ? window.width : window.height, // Use window dimensions based on orientation
            height: orientation === 'PORTRAIT' ? window.width :window.height, // Use window dimensions based on orientation
          },
        ]}
      />
      <TouchableOpacity
        style={styles.playButtonContainer}
        onPress={togglePlay}
      >
        {!isPlaying && (
          <Text style={styles.playButton}>▶️</Text>
        )}
      </TouchableOpacity>
      {showControls && (
        <View style={styles.controls}>
          <TouchableOpacity onPress={toggleControls}> 
          <View  style={styles.controls}>
              <TouchableOpacity onPress={togglePlay}>
                
                {isPlaying ? (
                  <Image source={require('../assets/pause.png')} style={styles.controlImage} />
                ) : (
                  <Image source={require('../assets/play.png')} style={styles.controlImage} />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={toggleOrientation}>
                {orientation === 'PORTRAIT' ? (
                  <Image source={require('../assets/fullscreen.png')} style={styles.controlImage} />
                ) : (
                  <Image source={require('../assets/exitfullscreen.png')} style={styles.controlImage} />
                )}
                
              </TouchableOpacity>
              </View>
          </TouchableOpacity>
        </View>
      )}
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
  touchArea: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  controlImage: {
    width: 48,
    height: 48,
  },
  in: {
    flexDirection:'row',
    // alignItems: 'center',
  },
  iconImage: {
    width: 34,
    height: 34,
  },
  iconImage1: {
    width: 90,
    height: 34,
  },
  video: {
    // position: 'absolute',
    top: 0,
    left: 0,
    margin:5,
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
    bottom: 15,
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
