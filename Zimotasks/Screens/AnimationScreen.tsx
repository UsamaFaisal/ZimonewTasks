import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated, FlatList, Dimensions } from 'react-native';
import axios from 'react-native-axios';
import { connect } from 'react-redux';
import { fetchMoviesSuccess } from '../action/moviesActions';
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
const AnimationScreen = ({ movies, fetchMoviesSuccess }) => {
  
  const MARGIN = 50;
  const BOXHEIGHT=60;
  const HEIGHT=BOXHEIGHT+MARGIN*2;
  const {height:wheight} =Dimensions.get("window");
  const height=wheight-64;


  useEffect(() => {
    const url = 'https://reactnative.dev/movies.json';
    axios
      .get(url)
      .then((response) => {
        fetchMoviesSuccess(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [fetchMoviesSuccess]);



  const backgroundColors = [
    '#d44c9c',
    '#ff99da',
    '#ff99da',
    '#d44c9c',
  ];
  
  const renderLoader = () => {
    if (!movies || !movies.movies) {
      return (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return null;
  };
  const y = new Animated.Value(0);
  const onScroll = Animated.event([{ nativeEvent: { contentOffset: { y } } }], {
    useNativeDriver: true,
  });
  
  return (
    <View style={styles.container}>
      {renderLoader()}
      <AnimatedFlatList
         scrollEventThrottle={16}
         bounces={false}
        data={movies.movies}
        keyExtractor={(item) => item.id.toString()}
        {...{ onScroll }}
        renderItem={({ item, index }) => {
          const position =Animated.subtract(index*HEIGHT,y);
          const isDisappearing=-HEIGHT;
          const isTop=0;
          const isBottom=height-HEIGHT;
          const isAppearing=height;
          const translateY= Animated.add(
            y,
            y.interpolate({
              inputRange:[0,0.0001+index*HEIGHT],
              outputRange:[0,-index*HEIGHT],
              extrapolateRight:'clamp',
            })
          );
            const scale=position.interpolate({
              inputRange:[isDisappearing,isTop,isBottom,isAppearing],
              outputRange:[0.5,1,1,0.5],
              extrapolate:'clamp',

            });
            const opacity=position.interpolate({
              inputRange:[isDisappearing,isTop,isBottom,isAppearing],
              outputRange:[0,1,1,0],
            });
            const backgroundColor =position.interpolate({
              inputRange:[isDisappearing,isTop,isBottom,isAppearing],
              outputRange:backgroundColors,
            });
          return (
            <Animated.View
              style={{
                borderRadius: 15,
                borderWidth: 1,
                marginRight: 50,
                marginLeft: 50,
                alignItems: 'center',
                borderColor: '#000',
                marginTop: 5,
                marginBottom: 15,
                padding: 50,
                backgroundColor,
                opacity,
                transform: [{ translateY },{scale}],
                
              }}
            >
              <Text style={styles.movieTitle}>Title: {item.title}</Text>
              <Text style={styles.movieReleaseYear}>Release Year: {item.releaseYear}</Text>
            </Animated.View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
  },
  loaderContainer: {
    flex: 1,
    // position:'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  movieContainer: {
    flex: 1,
  },
  movieBox: {
    borderRadius: 8,
    borderWidth: 1,
    margin: 35,
    alignItems: 'center',
    borderColor: '#000',
    marginBottom: 10,
    padding: 50,
  },
  movieTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  movieReleaseYear: {
    fontSize: 14,
    color: '#fff',
  },
});

const mapStateToProps = (state) => ({
  movies: state.movies,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMoviesSuccess: (data) => dispatch(fetchMoviesSuccess(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AnimationScreen);
