import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

function Loginform({navigation, onLogin}) {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [keys, setKeys] = useState('');
  const [chan, setChan] = useState(false);

  const onPress = async () => {
    if (password === '') {
      return Alert.alert(null, '비밀번호를 입력해주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (id === '') {
      return Alert.alert(null, '아이디를 확인해주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    }

    const body = {
      id: id,
      password: password,
    };

    onLogin(body, '/login');
  };

  const onKeyPress = async () => {
    if (keys === '') {
      return Alert.alert(null, '니모닉,키를 입력해주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    } else if (id === '') {
      return Alert.alert(null, '아이디를 입력해주세요.', [{text: '닫기'}], {
        cancelable: true,
      });
    }

    const body = {
      key: keys,
      id: id,
    };

    onLogin(body, '/keylogin');
  };
  return (
    <>
      {chan === false ? (
        <View style={styles.container}>
          <Text style={styles.text}>아이디</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={id}
            style={styles.input}
            onChangeText={t => setId(t)}
            placeholder="아이디를 입력하세요."
          />
          <Text style={styles.text}>비밀번호</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            secureTextEntry={true}
            value={password}
            style={styles.input}
            onChangeText={t => setPassword(t)}
            placeholder="비밀번호를 입력하세요."
          />
        </View>
      ) : (
        <View style={styles.container}>
          <Text style={styles.text}>아이디</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={id}
            style={styles.input}
            onChangeText={t => setId(t)}
            placeholder="아이디를 입력하세요."
          />
          <Text style={styles.text}>mnemonic or privatekey</Text>
          <TextInput
            keyboardType="numbers-and-punctuation"
            value={keys}
            style={styles.chaninput}
            onChangeText={t => setKeys(t)}
            placeholder="니모닉 또는 비밀키를 입력해주세요."
          />
        </View>
      )}
      <View style={styles.buttonGroup}>
        {chan === false ? (
          <TouchableOpacity
            onPress={() => {
              setChan(true);
            }}
            style={styles.mnicbutton}>
            <Text style={styles.buttonText}>니모닉 또는 key로 불러오기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              setChan(false);
            }}
            style={styles.mnicbutton}>
            <Text style={styles.buttonText}>비밀번호로 지갑불러오기</Text>
          </TouchableOpacity>
        )}
        {chan === false ? (
          <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.buttonText}>지갑불러오기</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={onKeyPress} style={styles.button}>
            <Text style={styles.buttonText}>지갑불러오기</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={{
            height: 50,
            backgroundColor: '#FFFF33',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 3,
          }}>
          <Text style={{fontSize: 15, color: 'black'}}>카카오톡 로그인</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.push('Register')}
          style={styles.button}>
          <Text style={styles.buttonText}>지갑생성</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    margin: 25,
    marginTop: 10,
    borderRadius: 15,
    marginBottom: 30,
    paddingBottom: 50,
  },
  text: {
    marginTop: 40,
  },
  input: {
    fontSize: 15,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 210,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 15,
    marginBottom: 50,
  },
  buttonGroup: {
    marginRight: 20,
    marginLeft: 20,
    marginBottom: 8,
    marginTop: 3,
  },
  button: {
    height: 50,
    backgroundColor: 'grey',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  mnicbutton: {
    height: 50,
    backgroundColor: 'black',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 15,
  },
  chaninput: {
    fontSize: 15,
    borderBottomWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    width: 300,
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: 30,
    marginBottom: 40,
  },
});

export default Loginform;
