//@ts-nocheck
import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator } from 'react-native';
import shorthash from 'shorthash';
import RNFS from 'react-native-fs';

const CacheImage = ({ uri }: { uri: string }) => {
  const [source, setSource] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      const name = shorthash.unique(uri);
      const path = `${RNFS.CachesDirectoryPath}/${name}`;

      try {
        const imageExists = await RNFS.exists(path);

        if (imageExists) {
          setSource(`file://${path}`);
        } else {
          const newImagePath = `${RNFS.CachesDirectoryPath}/${name}.jpg`;
          const downloadResult = await RNFS.downloadFile({ fromUrl: uri, toFile: newImagePath }).promise;

          if (downloadResult.statusCode === 200) {
            setSource(`file://${newImagePath}`);
          } else {
            console.log('Failed to download image:', downloadResult.statusCode);
          }
        }
      } catch (error) {
        console.log('Error fetching image:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [uri]);

  if (loading) {
    return <ActivityIndicator style={{width: 200 , height: 200}} />;
  }

  if (!source) {
    return null;
  }

  return <Image source={{ uri: source }} style={{ width: 300, height: 300 , margin: 10 }} />;
};

export default CacheImage;