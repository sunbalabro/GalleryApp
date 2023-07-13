import React, { FC, useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';

import CacheImage from '../../Components/CacheImages';

export const Home: FC = (props) => {
  const [imgData, setImgData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const imagesPerPage = 10;

  useEffect(() => {
    async function grabPictures() {
      const report = await fetch(
        'https://www.flickr.com/services/rest/?method=flickr.photos.getRecent&api_key=ab80d5e8dc49c72a905703c9c7173d4e&format=json&nojsoncallback=1',
        {
          method: 'GET',
        }
      );
      const xmlString = await report.json();
      const jsOb = xmlString.photos.photo;
      setImgData(jsOb);
    }
    grabPictures();
  }, []);

  const indexOfLastImage = currentPage * imagesPerPage;
  const indexOfFirstImage = indexOfLastImage - imagesPerPage;
  const currentImages = imgData.slice(indexOfFirstImage, indexOfLastImage);

  const handleNextPage = () => {
    const totalPages = Math.ceil(imgData.length / imagesPerPage);
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
      <ScrollView>
    <View style={styles.container}>
      <Text style={styles.header}> Gallery Home</Text>
        {currentImages.map((photo: any) => (
          <CacheImage key={photo.id} uri={`https://live.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`} />
        ))}
      <View style={styles.paginationContainer}>
        <Button onPress={handlePreviousPage} disabled={currentPage === 1}>
          <Text style={styles.btn}>«</Text> 
        </Button>
        <Text>{`Page ${currentPage}`}</Text>
        <Button
          onPress={handleNextPage}
          disabled={currentPage === Math.ceil(imgData.length / imagesPerPage)}
        >
         <Text style={styles.btn}>»</Text>   
        </Button>
      </View>
    </View>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  paginationContainer: {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    borderColo: 'black',
    borderWidth: 3,
    marginBottom: 30,
    padding: 10,
    borderRadius: 30
  },
  btn: {
    fontSize: 30
  },
  header:{
    fontSize: 40,
    marginTop: 30,
    color: "#fa7da7",
    fontWeight: "bold",
    marginBottom: 30
  }
});