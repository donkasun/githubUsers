import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  RefreshControl,
} from 'react-native';

import {fonts} from '../constants';
import SearchBar from '../components/searchBar';
import ProfileCard from '../components/profileCard';
import {useAxios} from '../hooks/useAxios';

const wait = timeout => {
  return new Promise(resolve => setTimeout(resolve, timeout));
};

const notFoundCard = () => {
  return (
    <View style={{alignItems: 'center', marginVertical: 20}}>
      <Text
        style={{fontSize: fonts.size.large, fontWeight: 'bold', color: 'gray'}}>
        User not found
      </Text>
    </View>
  );
};

const Home = ({navigation}) => {
  const [user, setUser] = useState(null);
  const [resultUser, setResultUser] = useState(null);
  const [searchName, onChangeText] = useState('');

  console.log('searchName', searchName);
  const onRefresh = useCallback(() => {
    searchUser();
  }, []);

  const {response: userData} = useAxios({
    method: 'get',
    url: '/user',
  });

  const {
    response: foundUser,
    error: searchError,
    execute,
    loading: searchLoading,
  } = useAxios(
    {
      method: 'get',
      url: `/users/${searchName}`,
    },
    false,
  );

  useEffect(() => {
    if (userData !== null) {
      setUser(userData);
    }
    if (foundUser) {
      setResultUser(foundUser);
    } else if (searchError) {
      setResultUser({id: 0, type: 'error'});
    }
  }, [userData, foundUser, searchError]);

  const username = user?.name;

  const searchUser = () => {
    console.log('on refresh', searchName);
    execute({
      method: 'get',
      url: `/users/${searchName}`,
    });
  };

  const searchNameChange = text => {
    onChangeText(text);
    setResultUser(null);
  };

  const renderProfileCard = ({item}) => {
    if (item?.type == 'error') {
      return notFoundCard();
    }

    return <ProfileCard user={item} navigation={navigation} />;
  };

  console.log('searchLoading', searchLoading);

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
        onChangeText: searchNameChange,
        reset: () => setResultUser(null),
      })}
      <FlatList
        data={resultUser ? [resultUser] : []}
        style={styles.list}
        renderItem={renderProfileCard}
        keyExtractor={item => item?.id}
        refreshControl={
          <RefreshControl refreshing={searchLoading} onRefresh={onRefresh} />
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
  list: {
    marginVertical: 10,
  },
});

export default Home;
