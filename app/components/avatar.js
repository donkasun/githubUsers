import React from 'react';
import { Image, StyleSheet} from 'react-native';
import constants from '../constants';

const Avatar = props => {
  const {image, size} = props;
  return (
      <Image
        defaultSource={constants.icons.avatar}
        source={{uri:image}}
        style={size == 'large' ? styles.largeImage : styles.smallImage}
      />
  );
};

const styles = StyleSheet.create({
  largeImage: {
    width: 80,
    height: 80,
  },
  smallImage: {
    width: 30,
    height: 30,
  },
});

export default Avatar;
