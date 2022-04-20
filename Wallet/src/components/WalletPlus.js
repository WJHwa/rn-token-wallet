import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
import axiosInstance from '../utils/axiosInstance';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

function WalletPlus({navigation}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [privatekey, setPrivatekey] = useState('');
  const [loading, setLoading] = useState(false);

  const storeData = async wallet => {
    let keys = [];
    let key = JSON.parse(await AsyncStorage.getItem('storage_key'));
    keys.push(key, wallet);
    await AsyncStorage.setItem('storage_key', JSON.stringify(keys));
    // await RNSecureKeyStore.set(address, privatekey, {
    //   accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    // });
    navigation.reset({routes: [{name: 'Home'}]});
  };

  const onpress = async e => {
    e.preventDefault();

    if (password === '') {
      return Alert.alert(null, '비밀번호를 적어주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (address === '') {
      return Alert.alert(null, '지갑주소를 적어주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (id === '') {
      return Alert.alert(null, '아이디를 적어주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (mnemonic === '') {
      return Alert.alert(
        null,
        '니모닉을 정확히 적어주세요.',
        [{text: '닫기'}],
        {
          cancelable: true,
        },
      );
    } else if (privatekey === '') {
      return Alert.alert(null, 'key를 정확히 적어주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    }

    let wallet = {
      address: address,
    };
    storeData(wallet);

    // DB 이용시 //
    // setLoading(true);

    // let body = {
    //   id: id,
    //   address: address,
    //   password: password,
    // };

    // try {
    //   const res = await axiosInstance.post('/walletupdate', body);
    //   if (res.data === true) {
    //     setLoading(true);
    //     let wallet = {
    //       address: address,
    //     };
    //     await RNSecureKeyStore.set(address, privatekey, {
    //       accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    //     });
    //     storeData(wallet);
    //   } else if (res.data === false) {
    //     return Alert.alert('비밀번호가 틀렸습니다.다시 확인해주세요.');
    //   } else {
    //     return Alert.alert('존재하지 않은 아이디입니다.다시 확인해주세요.');
    //   }
    // } catch (e) {
    //   console.log(e);
    // }
  };

  useEffect(() => {
    setLoading(false);
  }, []);
  return (
    <>
      {loading === false ? (
        <KeyboardAwareScrollView>
          <View style={styles.inputContainer}>
            <View style={{marginBottom: 30}}>
              <Text style={styles.wallettext}>지갑불러오기</Text>
            </View>
            <Text style={styles.inputtext}>아이디</Text>
            <TextInput
              value={id}
              style={styles.input}
              placeholder="아이디를 입력해주세요."
              onChangeText={t => setId(t)}
            />
            <Text style={styles.inputtext}>비밀번호</Text>
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              keyboardType="numbers-and-punctuation"
              placeholder="8자~16자 로 설정해주세요."
              onChangeText={t => setPassword(t)}
            />
            <Text style={styles.inputtext}>지갑주소</Text>
            <TextInput
              value={address}
              style={styles.input}
              placeholder="지갑주소를 입력해주세요."
              onChangeText={t => setAddress(t)}
            />
            <Text style={styles.inputtext}>나모닉 단어</Text>
            <TextInput
              value={mnemonic}
              style={styles.input}
              placeholder="지갑주소를 입력해주세요."
              onChangeText={t => setMnemonic(t)}
            />
            <Text style={styles.inputtext}>Private Key</Text>
            <TextInput
              value={privatekey}
              style={styles.input}
              placeholder="지갑주소를 입력해주세요."
              onChangeText={t => setPrivatekey(t)}
            />
            <TouchableOpacity style={styles.button} onPress={onpress}>
              <Text style={styles.buttonText}>지갑 불러오기</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAwareScrollView>
      ) : (
        <LoadingSpinner
          visible={loading}
          textContent="새로운 지갑을 불러오고 있습니다.."
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 5,
    paddingBottom: 30,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    paddingLeft: 10,
    fontSize: 17,
    width: 250,
    marginBottom: 7,
  },
  inputtext: {
    fontSize: 13,
    marginTop: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'grey',
    width: '80%',
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 60,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 15,
    color: 'white',
  },
  oncontainer: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 5,
    paddingBottom: 100,
    paddingTop: 20,
  },
  text: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
    marginBottom: 20,
    marginRight: 15,
    marginLeft: 15,
  },
  ontext: {
    fontSize: 17,
    marginTop: 7,
    marginBottom: 13,
  },
  wallettext: {
    fontSize: 16,
    color: 'black',
    paddingBottom: 20,
    paddingTop: 5,
    paddingRight: 137,
    paddingLeft: 137,
    borderBottomColor: 'white',
    borderBottomWidth: 2,
  },
});

export default WalletPlus;
