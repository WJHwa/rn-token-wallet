import React, {useState, useCallback, useEffect} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import BurnAddform from './BurnAddform';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../_Menu/Menu';
import getbalance from '../../../utils/getbalance';

function BurnAdd({navigation}) {
  const [balance, setBalance] = useState('');
  const [CTbalance, setCTBalance] = useState('');
  const [address, setAddress] = useState('');

  const start = async () => {
    let mainkey = JSON.parse(await AsyncStorage.getItem('storage_key'));
    setAddress(mainkey[1].address);
    let balance = await getbalance(mainkey[1].address, 'ether');
    let balanceCT = await getbalance(mainkey[1].address, 'ERC');
    setCTBalance(balanceCT);
    setBalance(balance);
  };

  useEffect(() => {
    start();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <BurnAddform
          balance={balance}
          CTbalance={CTbalance}
          address={address}
          navigation={navigation}
        />
      </View>
      <Menu navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#E0E0E0',
    margin: 15,
  },
});

export default BurnAdd;
