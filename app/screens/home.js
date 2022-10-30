import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
} from 'react-native';

import axios from 'axios';

import {githubToken} from '../../config';
import SearchBar from '../components/searchBar';
import ProfileCard from '../components/profileCard';

axios.defaults.baseURL = 'https://api.github.com';
axios.defaults.headers.common.Authorization = `bearer ${githubToken}`;

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const renderProfileCard = ({item}) => {
  console.log('item', item);
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

  const fetchData = () => {
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
    fetchData();
  }, []);

  console.log('response', response);

  const user = response?.data;
  const userName = user?.name;

  const searchUser = () => {
    // axios call here
  };

  return (
    <View style={styles.main}>
      <TouchableOpacity
        style={{alignSelf: 'flex-end', marginRight: 20}}
        onPress={() => {
          navigation.push('Profile', {name: user?.login});
        }}>
        <Text style={{}}>Me</Text>
      </TouchableOpacity>
      <View style={styles.greetingContainer}>
        <Text>{userName ? `Welcome ${userName}` : "We couldn't find you"}</Text>
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
      {/* <ScrollView
        contentContainerStyle={styles.scrollView}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text>Pull down to see RefreshControl indicator</Text>
        <ProfileCard
          profileImage={user?.avatar_url}
          username={user?.login}
          name={user?.name}
          bio={user?.bio}
          followers={user?.followers}
          following={user?.following}
        />
      </ScrollView> */}
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
  scrollView: {
    flex: 1,
    // backgroundColor: 'pink',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Home;
