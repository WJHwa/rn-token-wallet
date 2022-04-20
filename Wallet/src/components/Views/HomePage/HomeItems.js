import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faEthereum, faMonero} from '@fortawesome/free-brands-svg-icons';

function HomeItems({wallets, navigation}) {
  return (
    <>
      {wallets &&
        wallets.map(wallet => {
          return (
            <View style={styles.wallet} key={wallet.id}>
              <Text style={styles.addressText}>
                주소: {wallet.address || ''}
              </Text>
              <Text style={styles.walletText}>
                <FontAwesomeIcon icon={faEthereum} />
                잔액: {wallet.balance || '불러오는중 입니다.'} ETH
              </Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.push('Send', {
                    address: wallet.address,
                  })
                }>
                <Text style={styles.buttonText}>송금</Text>
              </TouchableOpacity>
            </View>
          );
        })}
    </>
  );
}
const styles = StyleSheet.create({
  wallet: {
    flex: 0.25,
    backgroundColor: 'white',
    margin: 3,
    marginTop: 6,
    borderBottomWidth: 2,
    borderBottomColor: 'grey',
  },
  walletText: {
    fontSize: 18,
    marginTop: 7,
    marginLeft: 10,
  },
  button: {
    backgroundColor: 'grey',
    borderRadius: 30,
    marginLeft: 100,
    marginRight: 100,
    marginTop: 10,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 17,
  },
  addressText: {
    fontSize: 15,
    marginLeft: 10,
    marginRight: 10,
  },
});

export default React.memo(HomeItems);
