import React from 'react';
import {View} from 'react-native';

import ProfileCard from '../components/profileCard';

const Profile = ({route, navigation}) => {
  let user = route?.params?.user || {};

  const onFollowersClick = () => {
    navigation.push('UserList', {username: user?.login, name:'Following'});
  };
  const onFollowingClick = () => {
    navigation.push('UserList', {username: user?.login, name:'Followers'});
  };

  return (
    <View style={{flex: 1, padding: 10}}>
      <ProfileCard
        profileImage={user?.avatar_url}
        username={user?.login}
        name={user?.name}
        bio={user?.bio}
        followers={user?.followers}
        following={user?.following}
        onFollowersClick={onFollowersClick}
        onFollowingClick={onFollowingClick}
      />
    </View>
  );
};

export default Profile;
