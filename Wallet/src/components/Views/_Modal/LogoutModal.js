import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function LogoutModal({setModal, navigation, modal}) {
  const onPress = async () => {
    await AsyncStorage.removeItem('storage_key');
    navigation.reset({routes: [{name: 'Login'}]});
    setModal(false);
  };
  return (
    <>
      <Modal visible={modal} animationType="slide" transparent>
        <View
          style={{
            flex: 4,
          }}></View>
        <View
          style={{
            flex: 5,
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderBottomWidth: 0,
            margin: 6,
            marginBottom: 0,
          }}>
          <TouchableOpacity
            style={{
              backgroundColor: 'grey',
              marginLeft: 350,
              marginTop: 3,
              padding: 6,
              paddingTop: 0,
              paddingBottom: 2,
              borderRadius: 30,
            }}
            onPress={() => setModal(false)}>
            <Text style={{color: 'white', fontSize: 17}}>x</Text>
          </TouchableOpacity>
          <Text
            style={{
              marginBottom: 60,
              marginTop: 10,
              fontSize: 19,
              color: 'black',
            }}>
            로그아웃
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 4,
            }}>
            로그아웃시 저장된 지갑정보가 사라질수 있습니다.
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 4,
            }}>
            지갑정보를 다시 불러와야할수도 있습니다.
          </Text>
          <Text
            style={{
              fontSize: 15,
              marginLeft: 10,
              marginRight: 20,
              marginBottom: 4,
            }}>
            그래도 원하시면 로그아웃 버튼을 눌러주세요.
          </Text>
        </View>
        <View
          style={{
            flex: 4,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            borderWidth: 1,
            borderTopWidth: 0,
            margin: 6,
            marginTop: 0,
          }}>
          <TouchableOpacity
            style={{
              padding: 20,
              borderRadius: 30,
              backgroundColor: 'grey',
            }}
            onPress={() => onPress()}>
            <Text style={{color: 'white'}}>로그아웃</Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 5}}></View>
      </Modal>
    </>
  );
}

export default LogoutModal;
