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
  
  const onFollowingClick = () => navigate('Following', 'following');
  const onFollowersClick = () => navigate('Followers', 'followers');
  const navigate = (title, type) => {
    navigation.push('UserList', {
      username: user?.login,
      name: title,
      listType: type,
    });
  };

  return (
    <View style={{flex: 1, padding: 10, backgroundColor:'lightgray'}}>
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
