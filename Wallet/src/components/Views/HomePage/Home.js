import React, {useEffect, useState, useRef} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Menu from '../_Menu/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeTable from './HomeTable';
import getbalance from '../../../utils/getbalance';

function Home({navigation}) {
  const [wallets, setWallets] = useState([]);
  const interval = useRef([]);

  const start = async () => {
    let key = JSON.parse(await AsyncStorage.getItem('storage_key'));
    setWallets(key);
    let data = [];
    key.forEach(async wallet => {
      let balance = await getbalance(wallet.address, 'ether');
      wallet.balance = balance;
      data.push(wallet);
      if (data.length === key.length) setWallets(data);
    });
  };

  useEffect(() => {
    start();
    console.log('useEffect');
    return () => {
      console.log('clean up');
    };
  }, []);

  // useEffect(() => {
  //   interval.current = setInterval(async () => {
  //     start();
  //   }, 20000);
  //   return () => clearInterval(interval.current);
  // }, []);

  return (
    <>
      <View style={styles.container}>
        <Text style={{marginLeft: 7, marginTop: 3}}>지갑</Text>
      </View>
      <HomeTable wallets={wallets} navigation={navigation} />
      <Menu navigation={navigation} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 22,
    marginBottom: 0,
    marginTop: 7,
    backgroundColor: 'white',
    paddingTop: 10,
    paddingBottom: 10,
  },
  redo: {
    borderRadius: 30,
    marginTop: 7,
    marginBottom: 4,
    paddingRight: 20,
    paddingLeft: 20,
  },
});

export default Home;
