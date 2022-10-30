import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import ProfileCard from '../components/profileCard';
import {useAxios} from '../hooks/useAxios';

const UserLists = ({route, navigation}) => {
  const [list, setList] = useState([]);

  const listType = route?.params?.listType;
  const username = route?.params?.username;

  const {response, error, loading} = useAxios({
    method: 'get',
    url: `/users/${username}/${listType}`,
  });

  useEffect(() => {
    if (response != null) {
      setList(response);
    }
  }, [response]);

  const renderProfileCard = ({item}) => {
    return (
      <ProfileCard
        user={item}
        minimumView
        onPress={() => {
          navigation.push('Profile', {username:item.login});
        }}
      />
    );
  };

  return (
    <View style={styles.main}>
      {listType && <Text>{listType}</Text>}
      <FlatList
        data={list}
        renderItem={renderProfileCard}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
  },
});

export default UserLists;
