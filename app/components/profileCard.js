import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';

import {fonts} from '../constants';
import Avatar from './avatar';

const ProfileCard = props => {
  const {user, onFollowingClick, onFollowersClick, minimumView, onPress} =
    props;

  return (
    <TouchableOpacity style={styles.main} onPress={onPress} disabled={!minimumView}>
      <View style={styles.profileContainer}>
        <Avatar
          size={minimumView ? 'small' : 'large'}
          image={user?.avatar_url}
        />
      </View>
      <View style={styles.divider} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{`@${user?.login}`}</Text>
        {!minimumView && (
          <>
            <Text style={styles.heading}>{user?.name}</Text>
            <Text style={styles.text}>{`${user?.bio ?? ''}`}</Text>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
              <TouchableOpacity onPress={onFollowingClick}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>{user?.following ?? 0}</Text>{' '}
                  Following
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={onFollowersClick}>
                <Text style={styles.text}>
                  <Text style={styles.boldText}>{user?.followers ?? 0}</Text>{' '}
                  Followers
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  main: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'lightgray',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
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
  boldText: {fontWeight: 'bold'},
});

export default ProfileCard;
