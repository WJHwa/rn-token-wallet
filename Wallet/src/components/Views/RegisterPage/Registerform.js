import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import axiosInstance from '../../../utils/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';

function Registerform({setLoading, navigation}) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [address, setAddress] = useState('');
  const [privatekey, setPrivatekey] = useState('');
  const [mnemonic, setMnemonic] = useState('');
  const [on, setOn] = useState(false);

  const GoHome = async () => {
    await AsyncStorage.setItem(
      'storage_key',
      JSON.stringify({address: address}),
    );
    await RNSecureKeyStore.set(address, privatekey, {
      accessible: ACCESSIBLE.ALWAYS_THIS_DEVICE_ONLY,
    });
    navigation.reset({routes: [{name: 'Home'}]});
  };

  const onPress = async e => {
    e.preventDefault();
    if (password !== password2) {
      return Alert.alert(null, '비밀번호를 확인해주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (password.length < 8) {
      return Alert.alert(
        null,
        '비밀번호가 짧습니다.다시 설정 해주세요.',
        [{text: '닫기'}],
        {
          cancelable: true,
        },
      );
    } else if (name === '') {
      return Alert.alert(null, '이름을 적어주세요..', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (password === '' || password2 === '') {
      return Alert.alert(null, '비밀번호를 적어주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    }
    setLoading(true);

    const body = {
      id: id,
      name: name,
      password: password,
    };
    try {
      const res = await axiosInstance.post('/register', body);
      setPrivatekey(res.data.privateKey);
      setMnemonic(res.data.mnemonic);
      setAddress(res.data.address);
      setOn(true);
      setLoading(false);
    } catch (err) {
      Alert.alert('이미 가입되어 있는 아이디입니다.');
    }
  };

  return (
    <>
      {on === false ? (
        <View style={styles.inputContainer}>
          <Text style={styles.inputtext}>아이디</Text>
          <TextInput
            style={styles.input}
            placeholder="아이디을 입력해주세요."
            value={id}
            onChangeText={t => setId(t)}
          />
          <Text style={styles.inputtext}>이름</Text>
          <TextInput
            style={styles.input}
            placeholder="이름을 입력해주세요."
            value={name}
            onChangeText={t => setName(t)}
          />
          <Text style={styles.inputtext}>비밀번호</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            keyboardType="numbers-and-punctuation"
            placeholder="8자~16자 로 설정해주세요."
            onChangeText={t => setPassword(t)}
          />
          <Text style={styles.inputtext}>비밀번호 재확인</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="다시 한번 입력해주세요."
            value={password2}
            onChangeText={t => setPassword2(t)}
            keyboardType="numbers-and-punctuation"
          />
        </View>
      ) : (
        <View style={styles.oncontainer}>
          <Text style={styles.ontext}>지갑주소</Text>
          <TextInput style={styles.input} value={address} />
          <Text style={styles.ontext}>비밀키</Text>
          <TextInput style={styles.input} value={privatekey} />
          <Text style={styles.ontext}>니모닉 단어</Text>
          <TextInput style={styles.input} value={mnemonic} />
          <Text style={styles.text}>
            * 개인 메모장 또는 아무도 모르는곳에 잘 보관해주세요. 잊어버리시면
            안됩니다. *
          </Text>
          <Text style={styles.text}>
            다 보관해주셨으면 홈으로 가기 버튼을 눌러주세요.
          </Text>
        </View>
      )}
      {on === false ? (
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={onPress}>
            <Text style={styles.buttonText}>지갑생성</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttoncontainer}>
          <TouchableOpacity
            type="submit"
            style={styles.button}
            onPress={GoHome}>
            <Text style={styles.buttonText}>홈으로 가기</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  inputContainer: {
    flex: 6,
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    marginRight: 15,
    marginLeft: 15,
    marginTop: 5,
    borderRadius: 5,
    paddingBottom: 200,
    paddingTop: 15,
  },
  input: {
    borderBottomWidth: 1,
    paddingLeft: 10,
    fontSize: 17,
    width: 250,
  },
  inputtext: {
    fontSize: 13,
    marginTop: 7,
    marginBottom: 13,
  },
  buttoncontainer: {
    flex: 1,
    paddingRight: 15,
    paddingLeft: 15,
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    width: '100%',
    height: 65,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 6,
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
});

export default Registerform;
