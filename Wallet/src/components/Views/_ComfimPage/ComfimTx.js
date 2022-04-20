import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import LoadingSpinner from 'react-native-loading-spinner-overlay';

function ComfimTx({navigation, route}) {
  const [on, setOn] = useState(false);
  const {toAddress, value, gas, gasLimit, address} = route.params;

  let provider = ethers.getDefaultProvider('ropsten');
  let estimateFee = ethers.BigNumber.from(gas).mul(gasLimit);
  let gasPrice = ethers.utils.formatUnits(estimateFee, 'gwei').toString();
  let total = ethers.utils
    .parseEther(value)
    .add(ethers.utils.parseEther(gasPrice));
  let totalAmount = ethers.utils.formatEther(total).toString();

  const onSign = async () => {
    setOn(true);

    let nonce = await provider.getTransactionCount(address);

    let transaction = {
      to: toAddress,
      value: ethers.utils.parseEther(value), // gwei //
      gasPrice: ethers.utils.parseUnits(gas.toString(), 'gwei'), // gwei
      gasLimit: ethers.BigNumber.from(gasLimit),
      nonce: ethers.utils.hexlify(nonce),
      chainId: 3,
    };

    let privateKey = await RNSecureKeyStore.get(address);

    let wallet = new ethers.Wallet(privateKey);

    let sign = wallet.connect(provider);

    try {
      const tx = await sign.sendTransaction(transaction);
      const data = {
        transactionHash: tx.hash,
        to: tx.to,
        value: value,
        gas: gas,
        address: address,
      };
      navigation.navigate('Complete', data);
    } catch (err) {
      console.log(err);
    }
    setOn(false);
  };

  useEffect(() => {
    setOn(false);
    return;
  }, []);

  return (
    <>
      <View style={styles.view}>
        <Text style={{marginBottom: 1, marginTop: 2}}>출금 금액 </Text>
        <Text style={{fontSize: 30, color: 'black'}}>{value} ETH</Text>
        <Text style={{marginTop: 20, marginBottom: 1}}>받는 주소</Text>
        <Text style={styles.viewAddress}>{toAddress}</Text>
      </View>
      <View style={styles.viewGas}>
        <Text>수수료(가스비) : </Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: 'black', fontSize: 20}}>{gasPrice} ETH</Text>
          <Text style={{fontSize: 15}}>가스 가격 :{gas} gwei</Text>
        </View>
      </View>
      <View style={styles.viewGas}>
        <Text>총 비용(출금금액 + 수수료) </Text>
        <Text style={{color: 'black', fontSize: 20}}>{totalAmount} ETH</Text>
      </View>
      <View style={styles.viewText}>
        <Text style={{fontSize: 14, marginLeft: 2, marginTop: 2}}>
          * 위 거래내용을 확인하시기 바랍니다.
        </Text>
        <Text style={{fontSize: 14, marginLeft: 2, marginTop: 2}}>
          * 아래 승인버튼을 선택하시면 계속해서 거래를 진행합니다.
        </Text>
      </View>
      <View style={styles.viewButton}>
        <TouchableOpacity style={styles.button} onPress={onSign}>
          <Text style={{textAlign: 'center', fontSize: 15, color: 'white'}}>
            승인
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingSpinner
        visible={on}
        textContent="출금중 입니다."></LoadingSpinner>
    </>
  );
}

const styles = StyleSheet.create({
  view: {
    flex: 4.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0E0E0',
  },
  viewAddress: {
    fontSize: 17,
    color: 'black',
    marginLeft: 5,
    marginRight: 5,
  },
  viewGas: {
    flex: 2.5,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  viewText: {flex: 1.5, margin: 20, borderWidth: 1, marginTop: 25},
  viewButton: {
    flex: 5,
    margin: 30,
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: '#808080',
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 20,
  },
});

export default ComfimTx;
