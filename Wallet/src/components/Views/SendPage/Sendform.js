import React, {useRef, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import Toast from 'react-native-easy-toast';
import SendformItems from './SendformItems';
import QRCode from 'react-native-qrcode-svg';
import Share from 'react-native-share';
import Clipboard from '@react-native-clipboard/clipboard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

function Sendform({address, balance, navigation}) {
  const [scan, setScan] = useState(false);
  const toastRef = useRef(null);

  const copy = () => {
    Clipboard.setString(address);
    showCopyToast();
  };
  const showCopyToast = () => {
    toastRef.current.show('복사되었습니다.');
  };

  const activeQR = () => {
    setScan(true);
  };

  const onshare = async () => {
    await Share.open({
      message: address,
    });
  };
  return (
    <>
      <View style={styles.Sendfrom}>
        <Toast ref={toastRef} defaultCloseDelay={100} position="top" />
        <Text
          style={{marginLeft: 5, marginBottom: 10, fontSize: 14}}
          onPress={copy}>
          주소 : {address} <FontAwesomeIcon icon={faCopy} />
        </Text>
        <View style={{alignItems: 'center'}}>
          <QRCode value={JSON.stringify(address)} />
        </View>
        <TouchableOpacity style={styles.sharebotton} onPress={onshare}>
          <Text>공유하기</Text>
        </TouchableOpacity>
        <Text style={styles.text}>{balance || '..불러오는중'} ETH</Text>
        <KeyboardAwareScrollView>
          <SendformItems
            activeQR={activeQR}
            address={address}
            balance={balance}
            navigation={navigation}
          />
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
    marginTop: 15,
    marginBottom: 10,
    textAlign: 'center',
    fontSize: 17,
    color: 'black',
    marginLeft: 5,
  },
  sharebotton: {
    backgroundColor: '#FFFAFA',
    borderRadius: 20,
    borderWidth: 0.3,
    padding: 5,
    marginTop: 10,
    alignItems: 'center',
    marginRight: 130,
    marginLeft: 130,
  },
});

export default Sendform;
