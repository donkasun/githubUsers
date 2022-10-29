import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

const Home = ({navigation}) => {
  return (
    <View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('navigation', navigation);
          navigation.push('Profile');
        }}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Home;
