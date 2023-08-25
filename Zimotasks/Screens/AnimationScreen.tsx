import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Animated } from 'react-native';
import axios from 'react-native-axios';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import { fetchMoviesSuccess } from '../action/moviesActions';
const AnimationScreen = ({ movies, fetchMoviesSuccess }) => {
  const translateY = new Animated.Value(0);

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

  const gestureHandler = Animated.event(
    [{ nativeEvent: { translationY: translateY } }],
    { useNativeDriver: false }
  );

  const animatedStyle = {
    transform: [{ translateY }],
  };

  const renderMovies = () => {
    if (!movies || !movies.movies) {
      return null;
    }
    
    return movies.movies.map((movie, index) => {
      const opacity = translateY.interpolate({
        inputRange: [-index * 100, 0],
        outputRange: [0.5, 1],
        extrapolate: 'identity',
      });
      return (
        <Animated.View
          key={movie.id}
          style={[styles.movieBox, { opacity }]}
        >
          <Text style={styles.movieTitle}>Title: {movie.title}</Text>
          <Text style={styles.movieReleaseYear}>Release Year: {movie.releaseYear}</Text>
        </Animated.View>
      );
    });
  };

  return (
    <View style={styles.container}>
      {movies ? (
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View style={[styles.movieContainer, animatedStyle]}>
            {renderMovies()}
          </Animated.View>
        </PanGestureHandler>
      ) : (
        <ActivityIndicator size="large" />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'pink',
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
