import React from 'react';
import {View, TouchableOpacity, Modal, Text} from 'react-native';

function HistoryModal({on, setOn, modals, keyed, roop}) {
  const onPress = a => {
    roop(a);
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
          }}>
          <Text style={{color: 'black', fontSize: 18}}>
            주소를 선택해주세요
          </Text>
        </View>
        {modals === true ? (
          keyed.map(k => {
            return (
              <View
                key={k.value}
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
                  onPress={() => onPress(JSON.stringify(k))}>
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

export default HistoryModal;
