import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import constants from '../constants';

const Avatar = props => {
  const {image, size} = props;
  console.log("image",image);
  return (
    <View>
      <Image
        defaultSource={constants.icons.avatar}
        source={{uri:image}}
        style={size == 'large' ? styles.largeImage : styles.smallImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {},
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
