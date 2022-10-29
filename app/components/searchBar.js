import React from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {icons} from '../constants';

const SearchBar = ({searchAction, searchCriteria, onChangeText}) => {
  return (
    <View style={styles.mainContainer}>
      <Image source={icons.search} style={styles.searchIcon} />
      <View style={{flex: 1}}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={searchCriteria}
          placeholder="Enter github username"
        />
      </View>
      {searchCriteria != '' && (
        <TouchableOpacity onPress={searchAction} hitSlop={10}>
          <Image source={icons.rightArrow} style={styles.searchIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#c3c4c2',
    margin: 10,
    borderRadius: 10,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    padding: 0,
  },
});

export default SearchBar;
