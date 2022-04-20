import React, {useEffect, useState, useCallback, useRef} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import Menu from '../_Menu/Menu';
import Share from 'react-native-share';
import SendModal from '../_Modal/SendModal';
import Sendmmtform from './Sendmmtform';
import '../../../../shim';
import Web3 from 'web3';
import data from '../../../../data.json';
import Clipboard from '@react-native-clipboard/clipboard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import getbalance from '../../../utils/getbalance';

const checkAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }
  return true;
};

function Sendmmt({navigation, route}) {
  const [balance, setBalance] = useState('');
  const [address, setAddress] = useState('');
  const [gasvalue, setGasvalue] = useState(7);
  const [addressValue, setAddressValue] = useState('');
  const [value, setValue] = useState('');
  const [on, setOn] = useState(false);
  const [modals, setModals] = useState(false);
  const [keyed, setKeyed] = useState([]);
  const toastRef = useRef(null);
  const type = 'ERC';

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const onpress = async () => {
    const gasLimit = '50000';
    // 주소 확인
    try {
      if (!checkAddress(addressValue)) {
        return Alert.alert('받는 주소를 확인해주세요.');
      }
      // 이더(Ehter) 단위 금액을 Wei로 변환
      let ehter = web3.utils.toWei(value, 'ether');
      if (web3.utils.toBN(ehter).lte(0)) {
        // 0보다 작으면
        return Alert.alert('이체 금액을 확인해주세요.');
      }
      // // // 가스비(수수료) 계산
      let gass = web3.utils.toWei(web3.utils.toBN(gasvalue), 'gwei');
      let estimateFee = gass * gasLimit;

      // // // 이체하는데 필요한 총 금액 계산(이체 금액 + 가스비)
      let totalRequiredAmount = web3.utils
        .toBN(ehter)
        .add(web3.utils.toBN(estimateFee))
        .toString();

      // // 잔액이 이체에 필요한 금액보다 작으면...
      let balances = web3.utils.toWei(balance, 'wei');

      if (web3.utils.toBN(balances).lt(web3.utils.toBN(totalRequiredAmount))) {
        let totalRequiredEther = web3.utils.fromWei(totalRequiredAmount);
        return Alert.alert(
          '잔액이 부족합니다.',
          `수수료 포함하여 필요한 금액\n${totalRequiredEther} MMT`,
        );
      } else {
        // Alert.alert('Ok');
        // 0x4C82b4A0e1dA9a1D3821a7BDBCc88EE39B9d9ad5
        let transaction = {
          address: address,
          toAddress: addressValue,
          gas: gasvalue,
          value: value,
          gasLimit: gasLimit,
        };
        navigation.navigate('JT출금', transaction);
      }
    } catch (e) {
      console.log(e);
      // return Alert.alert('이체 금액을 확인해주세요.2');
    }
  };

  const showCopyToast = useCallback(() => {
    toastRef.current.show('복사되었습니다.');
  }, [toastRef.current]);

  const copy = useCallback(() => {
    Clipboard.setString(address);
    showCopyToast();
  }, [Clipboard]);

  const onshare = useCallback(async () => {
    await Share.open({
      message: address,
    });
  }, [Share]);

  const start = async () => {
    try {
      let keys = JSON.parse(await AsyncStorage.getItem('storage_key'));
      if (keys.length > 1) {
        setModals(true);
        setOn(true);
        return setKeyed(keys);
      }
      setAddress(keys.address);
      let balance = await getbalance(keys.address, 'ERC');
      setBalance(balance);
      setKeyed(keys);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    start();
    return () => {
      console.log('clean up');
    };
  }, []);
  return (
    <>
      <View style={styles.container}>
        <Sendmmtform
          address={address}
          toastRef={toastRef}
          copy={copy}
          balance={balance}
          gasvalue={gasvalue}
          setGasvalue={setGasvalue}
          value={value}
          setValue={setValue}
          addressValue={addressValue}
          setAddressValue={setAddressValue}
          onpress={onpress}
          onshare={onshare}
        />
        <SendModal
          on={on}
          setOn={setOn}
          setAddress={setAddress}
          keyed={keyed}
          modals={modals}
          type={type}
          setBalance={setBalance}
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
    margin: 20,
  },
});

export default Sendmmt;
