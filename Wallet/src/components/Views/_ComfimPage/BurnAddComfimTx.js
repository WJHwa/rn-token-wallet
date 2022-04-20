import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';
import '../../../../shim';
import Web3 from 'web3';
import data from '../../../../data.json';
import ABIS from 'ethereumjs-abi';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
const Tx = require('ethereumjs-tx').Transaction;

function BurnAddComfimTx({navigation, route}) {
  const [on, setOn] = useState(false);

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const privateKey = Buffer.from(data.privatekey, 'hex');
  const {address, value, gas, gasLimit, array, name} = route.params;
  const contract = data.contract;
  let estimateFee = web3.utils.toBN(gas * gasLimit);
  let gasPrice = web3.utils.fromWei(estimateFee, 'gwei').toString();

  const onSign = async () => {
    setOn(true);
    try {
      let datas = ABIS.simpleEncode(
        `${array}(uint256)`,
        web3.utils.toWei(value, 'ether'),
      );
      var accountNonce = await web3.eth.getTransactionCount(address);

      var rawTransaction = {
        nonce: web3.utils.toHex(accountNonce),
        from: address,
        to: contract,
        gasPrice: web3.utils.toWei(web3.utils.toBN(gas), 'gwei'),
        gasLimit: web3.utils.toBN(web3.utils.toHex(gasLimit.toString())),
        data: datas,
      };

      let tx = new Tx(rawTransaction, {
        chain: 'ropsten',
      });
      tx.sign(privateKey);
      let serializedeTx = tx.serialize();
      let raw = '0x' + serializedeTx.toString('hex');
      let receipt = await web3.eth.sendSignedTransaction(raw);
      let data = {
        hash: receipt.transactionHash,
        gas: receipt.gasUsed,
        value: value,
        name: name,
      };
      navigation.navigate('BurnAddComplete', data);
      setOn(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setOn(false);
  }, []);

  return (
    <>
      <View style={styles.view}>
        <Text style={{marginBottom: 1, marginTop: 2}}>value </Text>
        <Text style={{fontSize: 30, color: 'black'}}>{value}</Text>
        <Text style={{marginTop: 20, marginBottom: 1}}>이행</Text>
        <Text style={styles.viewAddress}>{name}</Text>
      </View>
      <View style={styles.viewGas}>
        <Text>수수료(가스비) : </Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{fontSize: 16, color: 'black'}}>
            가스 제한 : {gasLimit} GasLimit
          </Text>
          <Text style={{fontSize: 16, color: 'black'}}>
            가스 가격 :{gas} gwei
          </Text>
        </View>
      </View>
      <View style={styles.viewGas}>
        <Text>총 가스비 </Text>
        <Text style={{color: 'black', fontSize: 20}}>{gasPrice} ETH</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => onSign()}>
          <Text style={{textAlign: 'center', fontSize: 15, color: 'white'}}>
            승인
          </Text>
        </TouchableOpacity>
      </View>
      <LoadingSpinner
        visible={on}
        textContent="진행중 입니다."></LoadingSpinner>
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
    marginTop: 3,
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

export default BurnAddComfimTx;
