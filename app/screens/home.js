import React, {useEffect, useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import axios from 'axios';

import {githubToken} from '../../config';
import SearchBar from '../components/searchBar';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

const Home = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [searchName, onChangeText] = useState('');

  const fetchData = () => {
    axios
      .get('/user')
      .then(res => {
        console.log(res);
        setResponse(res);
      })
      .catch(err => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log('response', response);

  const userName = response?.data?.name;

  const searchUser = () => {
    // axios call here
  };

  return (
    <View style={styles.main}>
      <View style={styles.greetingContainer}>
        <Text>{userName ? `Welcome ${userName}` : "We couldn't find you"}</Text>
      </View>
      <Text>Home Screen</Text>
      <TouchableOpacity
        onPress={() => {
          console.log('navigation', navigation);
          navigation.push('Profile');
        }}>
        <Text>Go to Profile screen</Text>
      </TouchableOpacity>
      {SearchBar({
        searchAction: searchUser,
        searchCriteria: searchName,
        onChangeText,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    padding: 10,
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Home;
