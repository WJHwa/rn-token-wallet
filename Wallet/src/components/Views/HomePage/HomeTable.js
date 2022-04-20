import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import HomeItems from './HomeItems';

function HomeTable({wallets, navigation}) {
  return (
    <>
      <View style={styles.walletcontainer}>
        <HomeItems wallets={wallets} navigation={navigation} />
        <TouchableOpacity
          style={styles.plusbutton}
          onPress={() => navigation.push('지갑불러오기')}>
          <Text style={{fontSize: 15, color: 'white'}}>지갑불러오기</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  walletcontainer: {
    flex: 6,
    margin: 20,
    marginTop: 0,
  },
  plusbutton: {
    backgroundColor: 'grey',
    alignItems: 'center',
    marginTop: 10,
    marginRight: 40,
    marginLeft: 40,
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'black',
  },
});

export default HomeTable;
