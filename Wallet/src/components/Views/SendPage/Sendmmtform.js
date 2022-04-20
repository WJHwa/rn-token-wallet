import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import SendmmtformItems from './SendmmtformItems';
import Toast from 'react-native-easy-toast';
import QRCode from 'react-native-qrcode-svg';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMonero} from '@fortawesome/free-brands-svg-icons';
import {faCopy} from '@fortawesome/free-solid-svg-icons';

function Sendmmtform({
  address,
  toastRef,
  copy,
  onshare,
  balance,
  gasvalue,
  setGasvalue,
  value,
  setValue,
  addressValue,
  setAddressValue,
  onpress,
  activeQR,
}) {
  return (
    <>
      <View style={styles.Sendfrom}>
        <Toast ref={toastRef} defaultCloseDelay={100} position="top" />
        <Text
          style={{marginLeft: 5, marginBottom: 10, fontSize: 14}}
          onPress={copy}>
          {address} <FontAwesomeIcon icon={faCopy} />
        </Text>
        <View style={{alignItems: 'center'}}>
          <QRCode value={JSON.stringify(address)} />
        </View>
        <TouchableOpacity style={styles.sharebotton} onPress={onshare}>
          <Text>공유하기</Text>
        </TouchableOpacity>
        <Text style={styles.text}>
          {balance.slice(0, 4) + ' CT' || '..불러오는중'}
        </Text>
        <KeyboardAwareScrollView>
          <SendmmtformItems
            gasvalue={gasvalue}
            setGasvalue={setGasvalue}
            value={value}
            setValue={setValue}
            addressValue={addressValue}
            setAddressValue={setAddressValue}
            onpress={onpress}
            activeQR={activeQR}
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
    marginTop: 2,
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

export default Sendmmtform;
