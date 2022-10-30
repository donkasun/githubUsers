import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

import axios from 'axios';

const Profile = ({route, navigation}) => {
  let number = route?.params?.number || 0;
  const loginName = route?.params?.name;

  const [response, setResponse] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const getUserDetails = () => {
    setRefreshing(true);
    axios
      .get(`/user/${loginName}`)
      .then(res => {
        console.log(res);
        setResponse(res);
        setRefreshing(false);
      })
      .catch(err => {
        console.log(err);
        setRefreshing(false);
      });
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  console.log('response', response);

  return (
    <View style={{flex: 1}}>
      <Text>{`Profile Screen ${number}`}</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('navigation', navigation);
          navigation.push('Profile', {number: 1 + number});
        }}>
        <Text>Go to New Profile screen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Profile;
