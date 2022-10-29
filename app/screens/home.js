import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';

import axios from 'axios';

import {githubToken} from '../../config';
import {icons} from '../constants';

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
      <View
        style={{
          backgroundColor: '#c3c4c2',
          margin: 10,
          borderRadius: 10,
          padding: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image source={icons.search} style={styles.searchIcon} />
        <View style={{flex: 1}}>
          <TextInput
            style={styles.input}
            onChangeText={onChangeText}
            value={searchName}
            placeholder="Enter github username"
          />
        </View>
        {searchName != '' && (
          <TouchableOpacity onPress={searchUser} hitSlop={10}>
            <Image source={icons.rightArrow} style={styles.searchIcon} />
          </TouchableOpacity>
        )}
      </View>
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
  input: {
    padding: 0,
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});

export default Home;
