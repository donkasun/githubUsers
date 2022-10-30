import React, {useState} from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {icons} from '../constants';

const SearchBar = ({searchAction, searchCriteria, onChangeText, reset}) => {
  const [searched, setSearched] = useState(false);

  const textChange = text => {
    onChangeText(text);
    setSearched(false);
  };

  const clickSearch = () => {
    setSearched(true);
    searchAction();
  };

  const clickClear = () => {
    setSearched(false);
    onChangeText(null);
    reset();
  };

  return (
    <View style={styles.mainContainer}>
      <Image source={icons.search} style={styles.icon} />
      <View style={{flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={textChange}
          value={searchCriteria}
          placeholder="Enter github username"
          placeholderTextColor="gray"
        />
      </View>
      {searchCriteria && !searched && (
        <TouchableOpacity onPress={clickSearch} hitSlop={10}>
          <Image source={icons.rightArrow} style={styles.icon} />
        </TouchableOpacity>
      )}
      {searchCriteria && searched && (
        <TouchableOpacity onPress={clickClear} hitSlop={10}>
          <Image source={icons.close} style={styles.icon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#c3c4c2',
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    padding: 0,
  },
});

export default SearchBar;
