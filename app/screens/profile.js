import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import ProfileCard from '../components/profileCard';
import {useAxios} from '../hooks/useAxios';

const Profile = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const username = route?.params?.username;

  const {response, error, loading} = useAxios({
    method: 'get',
    url: `/users/${username}`,
  });

  useEffect(() => {
    if (response !== null) {
      setUser(response);
    }
  }, [response]);

  const onFollowingClick = () =>
    navigate('Following', 'following', user.following);
  const onFollowersClick = () =>
    navigate('Followers', 'followers', user.followers);
  const navigate = (title, type, count) => {
    navigation.push('UserList', {
      username: user?.login,
      title,
      listType: type,
      count,
    });
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'lightgray'}}>
      {user && (
        <ProfileCard
          user={user}
          onFollowersClick={onFollowersClick}
          onFollowingClick={onFollowingClick}
        />
      )}
    </View>
  );
};

export default Profile;
