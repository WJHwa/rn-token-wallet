import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';
import getbalance from '../../../utils/getbalance';

function SendModal({setOn, on, setAddress, keyed, modals, setBalance, type}) {
  const onPress = async a => {
    setAddress(a);
    let balance = await getbalance(a, type);
    setBalance(balance);
    setOn(false);
  };
  return (
    <>
      <Modal
        visible={on}
        animationType="slide"
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            flex: 3,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#E0E0E0',
            borderBottomWidth: 1,
          }}>
          <Text style={{color: 'black', fontSize: 18}}>
            주소를 선택해주세요
          </Text>
        </View>
        {modals === true ? (
          keyed.map(k => {
            return (
              <View
                key={k.id}
                style={{
                  flex: 2,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'white',
                  borderBottomWidth: 1,
                  borderBottomColor: 'grey',
                }}>
                <Text
                  style={{
                    fontSize: 16,
                    marginLeft: 20,
                    marginRight: 20,
                    marginBottom: 4,
                  }}>
                  주소 : {k.address}
                </Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 100,
                    marginRight: 100,
                    padding: 20,
                    borderRadius: 20,
                    backgroundColor: 'grey',
                  }}
                  onPress={() => onPress(k.address)}>
                  <Text style={{color: 'white'}}>선택</Text>
                </TouchableOpacity>
              </View>
            );
          })
        ) : (
          <></>
        )}
        <View style={{flex: 6, backgroundColor: 'white'}}></View>
      </Modal>
    </>
  );
}

export default React.memo(SendModal);
