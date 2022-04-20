import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import BurnAddformItem from './BurnAddformItem';

function BurnAddform({balance, CTbalance, address, navigation}) {
  return (
    <>
      <View style={styles.Sendfrom}>
        <View style={styles.view}>
          <Text>Burn Add</Text>
        </View>
        <View style={styles.viewBalance}>
          <Text>잔액</Text>
          <Text style={styles.text}>
            {CTbalance.slice(0, 3) + ' CT' || '..불러오는중'}
          </Text>
          <Text style={styles.text}>
            {balance.slice(0, 4) + ' ETH' || '..불러오는중'}
          </Text>
        </View>
        <KeyboardAwareScrollView>
          <BurnAddformItem address={address} navigation={navigation} />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  Sendfrom: {
    flex: 8,
    flexDirection: 'column',
  },
  text: {
    marginTop: 7,
    marginBottom: 8,
    textAlign: 'center',
    fontSize: 16,
    color: 'black',
    marginLeft: 5,
  },
  view: {
    marginBottom: 1,
    borderBottomWidth: 1,
    marginLeft: 4,
    marginRight: 4,
  },
  viewBalance: {
    paddingBottom: 7,
    marginBottom: 20,
    marginTop: 8,
    borderBottomWidth: 0.3,
    marginLeft: 5,
    marginRight: 5,
  },
});

export default BurnAddform;
