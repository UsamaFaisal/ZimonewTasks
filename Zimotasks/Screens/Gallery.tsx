import React, { useState } from 'react';
import { View, Button, Image, ScrollView, Text, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import Header from '../components/Header1';

const Gallery = () => {
  const [selectedImages, setSelectedImages] = useState([]);

  const handleImageSelection = async () => {
    const options = {
      mediaType: 'photo',
      selectionLimit: 0,
      includeBase64: false,
    };

    try {
      const result = await launchImageLibrary(options);
      if (!result.didCancel) {
         const uris = result.assets.map((asset) => asset.uri);
        setSelectedImages([...selectedImages, ...uris]);
      }
    } catch (error) {
      console.log('Error selecting image: ', error);
    }
  };

  const renderImages = () => {
    const rows = [];
    for (let i = 0; i < selectedImages.length; i += 2) {
      const firstImage = selectedImages[i];
      const secondImage = selectedImages[i + 1];
      if (i % 4 === 0) {
        rows.push(
          <View style={styles.imageRow} key={i}>
            <Image source={{ uri: firstImage }} style={styles.image} />
            {secondImage && <Image source={{ uri: secondImage }} style={styles.image} />}
          </View>
        );
      } else {
        rows.push(
          <View style={styles.singleImageRow} key={i}>
            <Image source={{ uri: firstImage }} style={styles.image1} />
          </View>
        );
      }
    }
    return rows;
  };

  return (
    <View>
      <Header />
      <Button title="Select Images" onPress={handleImageSelection} />
      <ScrollView>
        {renderImages()}
      </ScrollView>
      {selectedImages.length === 0 && (
        <Text style={styles.noImagesText}>No images selected</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '48%',
    aspectRatio: 1,
    borderWidth:1,
    borderColor:'white',
    margin: 2,
  },
  image1: {
    width: '100%',
    aspectRatio: 2,
    borderWidth:1,
    borderColor:'white',
    margin: 2,
  },
  imageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  singleImageRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  noImagesText: {
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Gallery;
