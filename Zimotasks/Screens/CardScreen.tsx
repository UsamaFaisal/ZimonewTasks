import React , { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from '../components/Card';
import Card1 from '../components/Card1';
import PagerView from 'react-native-pager-view';

const CardScreen = () => {
  const [currentPage, setCurrentPage] = useState(0);

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };
  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0} // Set the initial page
        onPageSelected={onPageSelected} // Handle page selection changes
      >
        <View key="1">
          <Card />
        </View>
        <View key="2">
          <Card1/>
        </View>
      </PagerView>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
    width: '100%',
  },
  pageIndicator: {
    marginTop: 20,
    fontSize: 18,
  },
});
export default CardScreen;
