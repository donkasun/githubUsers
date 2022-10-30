import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';

import axios from 'axios';

import {fonts} from '../constants';
import {githubToken} from '../../config';
import SearchBar from '../components/searchBar';
import ProfileCard from '../components/profileCard';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const renderProfileCard = ({item}) => {
  return (
    <ProfileCard
      profileImage={item?.avatar_url}
      username={item?.login}
      name={item?.name}
      bio={item?.bio}
      followers={item?.followers}
      following={item?.following}
    />
  );
};

const Home = ({navigation}) => {
  const [response, setResponse] = useState(null);
  const [searchName, onChangeText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  const getPersonalProfile = () => {
    setRefreshing(true);
    axios
      .get('/user')
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
    getPersonalProfile();
  }, []);

  console.log('response', response);

  const user = response?.data;
  const userName = user?.name;

  const searchUser = () => {
    // axios call here
  };

  return (
    <View style={styles.main}>
      {user && (
        <TouchableOpacity
          style={{alignSelf: 'flex-end'}}
          onPress={() => {
            navigation.push('Profile', {user: user});
          }}>
          <Text style={{fontSize: fonts.size.small}}>My Profile</Text>
        </TouchableOpacity>
      )}
      <View style={styles.greetingContainer}>
        <Text style={{fontSize: fonts.size.medium, fontWeight: 'bold'}}>
          {userName
            ? `Welcome ${userName}`
            : "Looks like we counldn't find you on Github"}
        </Text>
        {!userName && (
          <Text
            style={{
              fontSize: fonts.size.small,
              textAlign: 'center',
              marginTop: 10,
            }}>
            Make sure to update the config with Github access token in config
          </Text>
        )}
      </View>
      {SearchBar({
        searchAction: searchUser,
        searchCriteria: searchName,
        onChangeText,
      })}
      <FlatList
        data={user ? [user] : []}
        renderItem={renderProfileCard}
        keyExtractor={item => item?.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
