import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Menu from '../_Menu/Menu';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Sendform from './Sendform';
import SendModal from '../_Modal/SendModal';
import getbalance from '../../../utils/getbalance';

function Send({navigation, route}) {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [on, setOn] = useState(false);
  const [modals, setModals] = useState(false);
  const [keyed, setKeyed] = useState([]);
  const type = 'ether';

  const start = async () => {
    let keys = JSON.parse(await AsyncStorage.getItem('storage_key'));
    let key = route.params;

    if (key) {
      setAddress(key.address);
      let balan = await getbalance(key.address);
      setBalance(balan);
    } else if (keys.length > 1) {
      setModals(true);
      setOn(true);
      return setKeyed(keys);
    }
    setAddress(keys.address);
    let balan = getbalance(keys.address);
    setBalance(balan);
    setKeyed(keys);
  };

  useEffect(() => {
    start();
    return () => console.log('clean up');
  }, []);

  return (
    <>
      <View style={styles.container}>
        {/* {scan && (
          <QRCodeScanner
            reactivate={true}
            showMarker={true}
            ref={node => (scanner.current = node)}
            flashMode={RNCamera.Constants.FlashMode.torch}
            onRead={e => setResult(e.data)}
            topContent={
              <Text style={{flex: 1, fontSize: 18, padding: 32, color: '#777'}}>
                QR코드 스캐너
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={{padding: 16}}>
                <Text style={{fontSize: 21, color: 'rgb(0,122,255)'}}>OK</Text>
              </TouchableOpacity>
            }
          />
        )} */}
        <Sendform address={address} balance={balance} navigation={navigation} />
      </View>
      <SendModal
        on={on}
        setOn={setOn}
        setAddress={setAddress}
        setBalance={setBalance}
        keyed={keyed}
        modals={modals}
        type={type}
      />
      <Menu navigation={navigation} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 5,
    backgroundColor: '#E0E0E0',
    margin: 15,
    marginBottom: 0,
  },
});

export default Send;
