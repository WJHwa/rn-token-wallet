import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert, Text, TouchableOpacity} from 'react-native';
import '@ethersproject/shims';
import {ethers} from 'ethers';
import '../../../../shim';
import Web3 from 'web3';
import data from '../../../../data.json';
import RNSecureKeyStore, {ACCESSIBLE} from 'react-native-secure-key-store';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
const Tx = require('ethereumjs-tx').Transaction;

function JTComfimTx({navigation, route}) {
  const [on, setOn] = useState(false);

  let estimateFee = ethers.BigNumber.from(route.params.gas).mul(
    route.params.gasLimit,
  );
  let gasPrice = ethers.utils.formatUnits(estimateFee, 'gwei').toString();
  let total = ethers.utils
    .parseEther(route.params.value)
    .add(ethers.utils.parseEther(gasPrice));
  let totalAmount = ethers.utils.formatEther(total).toString();

  const onSign = async () => {
    setOn(true);
    let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

    const privateKey = Buffer.from(data.privatekey, 'hex');
    const contract = data.contract;
    const ABI = data.ABI;
    const Contracted = new web3.eth.Contract(ABI, contract, {
      from: route.params.address,
    });

    try {
      const datas = Contracted.methods
        .transfer(
          route.params.toAddress,
          web3.utils.toWei(route.params.value, 'ether'),
        )
        .encodeABI();
      const nonce = await web3.eth.getTransactionCount(route.params.address);
      let rawTransaction = {
        from: route.params.address,
        gasPrice: web3.utils.toWei(web3.utils.toBN(route.params.gas), 'gwei'),
        gasLimit: web3.utils.toBN(
          web3.utils.toHex(route.params.gasLimit.toString()),
        ),
        to: contract,
        nonce: web3.utils.toHex(nonce),
        data: datas,
      };
      let tx = new Tx(rawTransaction, {
        chain: 'ropsten',
      });
      tx.sign(privateKey);
      let serializedeTx = tx.serialize();
      let raw = '0x' + serializedeTx.toString('hex');
      let receipt = await web3.eth.sendSignedTransaction(raw);
      const data = {
        transactionHash: receipt.hash,
        to: receipt.to,
        value: route.params.value,
        gas: route.params.gas,
        address: route.params.address,
      };
      navigation.navigate('JTComplete', data);
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
        <Text style={{marginBottom: 1, marginTop: 2}}>출금 금액 </Text>
        <Text style={{fontSize: 30, color: 'black'}}>
          {route.params.value} TTC
        </Text>
        <Text style={{marginTop: 20, marginBottom: 1}}>받는 주소</Text>
        <Text style={styles.viewAddress}>{route.params.toAddress}</Text>
      </View>
      <View style={styles.viewGas}>
        <Text>수수료(가스비) : </Text>
        <View style={{alignItems: 'flex-end'}}>
          <Text style={{color: 'black', fontSize: 20}}>{gasPrice} TTC</Text>
          <Text style={{fontSize: 15}}>가스 가격 :{route.params.gas} gwei</Text>
        </View>
      </View>
      <View style={styles.viewGas}>
        <Text>총 비용(출금금액 + 수수료) </Text>
        <Text style={{color: 'black', fontSize: 20}}>{totalAmount} TTC</Text>
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

export default JTComfimTx;
