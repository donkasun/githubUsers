import React, {useEffect, useState} from 'react';
import {View} from 'react-native';

import ProfileCard from '../components/profileCard';
import {useAxios} from '../hooks/useAxios';

const Profile = ({route, navigation}) => {
  const [user, setUser] = useState(null);
  const username = route?.params?.username;

  const {response} = useAxios({
    method: 'get',
    url: `/users/${username}`,
  });

  useEffect(() => {
    if (response !== null) {
      setUser(response);
    }
  }, [response]);

  return (
    <View style={{flex: 1, padding: 10, backgroundColor: 'lightgray'}}>
      {user && (
        <ProfileCard
          user={user}
          disableCardClick={true}
          navigation={navigation}
        />
      )}
    </View>
  );
};

export default Profile;
