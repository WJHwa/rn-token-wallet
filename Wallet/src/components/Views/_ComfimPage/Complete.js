import React from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons';
import axiosInstance from '../../../utils/axiosInstance';

function Complete({navigation, route}) {
  const {gas, hash, to, value, address} = route.params;

  const onPress = async () => {
    let body = {
      to: to,
      value: value,
      gas: gas,
      hash: hash,
      address: address,
    };
    try {
      const res = await axiosInstance.post('/complete', body);
      if (res.data === true) {
        navigation.reset({routes: [{name: 'Home'}]});
      } else {
        console.log(res.data);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <View style={styles.view}>
        <FontAwesomeIcon icon={faCheckCircle} size={160} color="green" />
        <Text style={styles.viewText}>
          거래가 완료되었습니다. 트랜잭션을 확인하는데에 시간이 조금 걸릴수
          있습니다.
        </Text>
        <Text style={{textAlign: 'center'}}>transactionHash</Text>
        <TouchableOpacity>
          <Text note style={styles.viewTransaction}>
            {hash}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{textAlign: 'center', color: 'white'}}>확인</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  view: {flex: 8, justifyContent: 'center', alignItems: 'center'},
  viewText: {
    fontSize: 17,
    marginTop: 20,
    color: 'black',
    marginBottom: 20,
  },
  viewTransaction: {
    fontSize: 17,
    color: '#07C',
    textDecorationLine: 'underline',
    marginLeft: 7,
    marginRight: 7,
    marginTop: 7,
  },
  viewButton: {flex: 2, margin: 30, justifyContent: 'flex-end'},
  button: {
    backgroundColor: '#808080',
    padding: 20,
    borderRadius: 20,
  },
});

export default Complete;
