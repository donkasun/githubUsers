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
import {useAxios} from '../hooks/useAxios';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const renderProfileCard = ({item}) => {
  return <ProfileCard user={item} />;
};

const Home = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [searchName, onChangeText] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);


  const {response, error, loading} = useAxios({
    method: 'get',
    url: '/user',
  });

  useEffect(() => {
    if (response !== null) {
      setUser(response);
    }
  }, [response]);

  const username = user?.name;
  
  const searchUser = () => {
    // axios call here
  };

  return (
    <View style={styles.main}>
      {user && (
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.push('Profile', {username: user?.login})}>
          <Text style={{fontSize: fonts.size.small}}>My Profile</Text>
        </TouchableOpacity>
      )}
      <View style={styles.greetingContainer}>
        <Text style={styles.header}>
          {username
            ? `Welcome ${username}`
            : "Looks like we counldn't find you on Github"}
        </Text>
        {!username && (
          <Text style={styles.warningMessage}>
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
  profileContainer: {
    alignSelf: 'flex-end',
  },
  header: {
    fontSize: fonts.size.medium,
    fontWeight: 'bold',
  },
  warningMessage: {
    fontSize: fonts.size.small,
    textAlign: 'center',
    marginTop: 10,
  },
  greetingContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default Home;
