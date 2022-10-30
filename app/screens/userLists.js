import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';

import ProfileCard from '../components/profileCard';
import {fonts} from '../constants';
import {useAxios} from '../hooks/useAxios';

const UserLists = ({route, navigation}) => {
  const {listType, username, title, count} = route?.params;

  const {response = []} = useAxios({
    method: 'get',
    url: `/users/${username}/${listType}`,
  });

  const renderProfileCard = ({item}) => {
    return <ProfileCard user={item} minimumView navigation={navigation} />;
  };

  return (
    <View style={styles.main}>
      {listType && (
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            {title}
            <Text style={styles.normalText}>'s of</Text> {username}
          </Text>
          {count >= 0 && (
            <Text
              style={{
                ...styles.normalText,
                ...styles.smallText,
              }}>{`${count} result${count > 1 ? 's' : ''} found`}</Text>
          )}
        </View>
      )}
      <FlatList
        data={response}
        renderItem={renderProfileCard}
        keyExtractor={item => item?.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 10,
    flex: 1,
  },
  textContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: fonts.size.medium,
    fontWeight: 'bold',
  },
  normalText: {
    fontWeight: 'normal',
  },
  smallText: {
    fontSize: fonts.size.small,
  },
});

export default UserLists;
