import React, { useEffect } from 'react';
import {
    StyleSheet,
    View,
    StatusBar,
    Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

interface SplashScreenProps {
    navigation: any;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ navigation }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('Home'); // replace the current screen with the next screen
        }, 3000); // display the splash screen for 3 seconds
    }, [navigation]);

    return (
        <View style={styles.container}>
            <View style={styles.PicWrapper}>
                <View style={styles.BodyPic}>
                    <Image
                        source={require('../assets/zimo.png')}
                        style={{ height: '100%', width: '100%' }}
                        resizeMode='contain'
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000000",
    },
    PicWrapper: {
        height: hp('65%'),
        width: wp("100%"),
        alignItems: 'center',
        justifyContent: 'center'
    },
    BodyPic: {
        height: hp('40%'),
        width: wp('80%'),
        borderRadius: 10,
        overflow: 'hidden'
    },
});

export default SplashScreen;
