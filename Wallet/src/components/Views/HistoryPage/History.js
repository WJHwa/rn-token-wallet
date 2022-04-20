import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axiosInstance from '../../../utils/axiosInstance';
import HistoryTr from './HistoryTr';
import Menu from '../_Menu/Menu';
import axios from 'axios';
import HistoryModal from '../_Modal/HistoryModal';

function History({navigation}) {
  const [on, setOn] = useState(false);
  const [modals, setModals] = useState(false);
  const [data, setData] = useState([
    {
      id: '',
      gas: '',
      transactionHash: '',
      to: '',
    },
  ]);
  const [keyed, setKeyed] = useState('');

  const roop = async token => {
    let res = await axios.get('http://10.0.2.2:8080/history', {
      headers: {
        authorization: `${token}`,
      },
    });
    if (res.data) {
      setData(res.data);
    } else {
      Alert.alert('거래하신 기록이 없습니다.');
    }
  };

  const start = async () => {
    let item = JSON.parse(await AsyncStorage.getItem('storage_key'));
    if (item.length > 1) {
      setKeyed(item);
      setModals(true);
      setOn(true);
    } else {
      roop(itme.address);
    }
  };

  useEffect(() => {
    start();
    return;
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Text style={styles.text}>History</Text>
        <HistoryTr data={data} />
      </View>
      <HistoryModal
        modals={modals}
        setOn={setOn}
        on={on}
        keyed={keyed}
        roop={roop}
      />
      <Menu navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#E0E0E0',
  },
  text: {
    marginBottom: 6,
    marginTop: 13,
    marginLeft: 10,
  },
});

export default History;
