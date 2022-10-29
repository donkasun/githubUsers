import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
// import {StackActions} from '@react-navigation/native';

const Profile = ({route, navigation}) => {
  let number = route?.params?.number || 0; 
  return (
    <View>
      <Text>{`Profile Screen ${number}`}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('navigation', navigation);
            navigation.push('Profile', {number: 1 + number});
        //   navigation.dispatch(StackActions.push('Profile', {number: number+1}));
        }}>
        <Text>Go to New Profile screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
