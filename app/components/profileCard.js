import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {fonts} from '../constants';
import Avatar from './avatar';

const ProfileCard = props => {
  const {profileImage, username, name, bio, followers, following} = props;
  return (
    <View style={styles.main}>
      <View style={styles.profileContainer}>
        <Avatar size="large" image={profileImage} />
      </View>
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{`@${username}`}</Text>
        <Text style={styles.heading}>{name}</Text>
        <Text style={styles.text}>{`${bio ?? ''}`}</Text>
        <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.text}>{`${following ?? 0} Following`}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <Text style={styles.text}>{`${followers ?? 0} Followers`}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  main: {
    magin: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileContainer: {
    marginRight: 10,
    justifyContent: 'center',
  },
  divider: {
    width: 1,
    height: '80%',
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  textContainer: {
    margin: 10,
    flex: 1,
  },
  title: {
    fontSize: fonts.size.medium,
  },
  heading: {
    fontSize: fonts.size.large,
    fontWeight: 'bold',
  },
  text: {
    fontSize: fonts.size.small,
    marginVertical: 5,
  },
});

export default ProfileCard;
