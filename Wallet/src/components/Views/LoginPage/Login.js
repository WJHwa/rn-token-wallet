import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loginform from './Loginform';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
import axiosInstance from '../../../utils/axiosInstance';

function Login({navigation}) {
  const [on, setOn] = useState(false);

  const confirm = async () => {
    let key = await AsyncStorage.getItem('storage_key');
    if (key) {
      setOn(true);
      navigation.reset({routes: [{name: 'Home'}]});
    }
  };

  async function onLogin(body, type) {
    setOn(true);
    const res = await axiosInstance.post(`${type}`, body);
    switch (type) {
      case '/login':
        if (res.data) {
          let address = {address: res.data.address};
          await AsyncStorage.setItem('storage_key', JSON.stringify(address));
          navigation.reset({routes: [{name: 'Home'}]});
        }
      case '/keylogin':
        if (res.data.key) {
          await AsyncStorage.setItem('storage_key', res.data.key);
          navigation.reset({routes: [{name: 'Home'}]});
        }
      default:
        return;
    }
  }
  useEffect(() => {
    confirm();
  }, []);
  return (
    <>
      <View style={styles.textstyle}>
        {on === false ? (
          <Text style={styles.text}>로그인후 이용해주세요.</Text>
        ) : (
          <></>
        )}
      </View>
      <KeyboardAwareScrollView>
        {on === false ? (
          <Loginform setOn={setOn} navigation={navigation} onLogin={onLogin} />
        ) : (
          <LoadingSpinner
            visible={on}
            textContent="지갑 불러오는중 입니다."></LoadingSpinner>
        )}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
  textstyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  icon: {
    alignItems: 'center',
  },
});

export default Login;
