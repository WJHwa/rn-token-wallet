import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faQrcode} from '@fortawesome/free-solid-svg-icons';
import Slider from '@react-native-community/slider';
import '../../../../shim';
import Web3 from 'web3';
import data from '../../../../data.json';

const checkAddress = address => {
  if (!/^(0x)?[0-9a-f]{40}$/i.test(address)) {
    return false;
  } else if (
    /^(0x|0X)?[0-9a-f]{40}$/.test(address) ||
    /^(0x|0X)?[0-9A-F]{40}$/.test(address)
  ) {
    return true;
  }
  return true;
};

function SendformItems({activeQR, address, balance, navigation}) {
  const [gasvalue, setGasvalue] = useState(1);
  const [addressValue, setAddressValue] = useState('');
  const [value, setValue] = useState('');

  let web3 = new Web3(new Web3.providers.HttpProvider(data.provider));

  const onpress = async () => {
    const gasLimit = '21000';
    // 주소 확인
    try {
      if (!checkAddress(addressValue)) {
        return Alert.alert('받는 주소를 확인해주세요.');
      }
      // // 이더(Ehter) 단위 금액을 Wei로 변환
      let ehter = web3.utils.toWei(value, 'ether');
      if (web3.utils.toBN(ehter).lte(0)) {
        // 0보다 작으면
        return Alert.alert('이체 금액을 확인해주세요.');
      }
      // // // 가스비(수수료) 계산
      let gass = web3.utils.toWei(web3.utils.toBN(gasvalue), 'gwei');
      let estimateFee = gass * gasLimit;

      // // // 이체하는데 필요한 총 금액 계산(이체 금액 + 가스비)
      let totalRequiredAmount = web3.utils
        .toBN(ehter)
        .add(web3.utils.toBN(estimateFee))
        .toString();

      // // 잔액이 이체에 필요한 금액보다 작으면...
      let balances = web3.utils.toWei(balance, 'wei');

      if (web3.utils.toBN(balances).lt(web3.utils.toBN(totalRequiredAmount))) {
        let totalRequiredEther = web3.utils.fromWei(totalRequiredAmount);
        return Alert.alert(
          '잔액이 부족합니다.',
          `수수료 포함하여 필요한 금액\n${totalRequiredEther} MMT`,
        );
      } else {
        // Alert.alert('OK');
        let transaction = {
          address: address,
          toAddress: addressValue,
          gas: gasvalue,
          value: value,
          gasLimit: gasLimit,
        };
        navigation.navigate('출금', transaction);
      }
    } catch (e) {
      console.log(e);
      // return Alert.alert('이체 금액을 확인해주세요.2');
    }
  };
  return (
    <>
      <Text style={styles.inputText}>지갑 주소</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          value={addressValue}
          returnKeyType="next"
          placeholder="지갑주소를 정확하게 입력해주세요."
          keyboardType="numbers-and-punctuation"
          style={styles.input}
          onChangeText={t => setAddressValue(t)}
        />
        {!addressValue ? (
          <TouchableOpacity style={styles.qrcode} onPress={activeQR}>
            <FontAwesomeIcon icon={faQrcode} size={18} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <Text style={styles.inputText}>보낼 ETH</Text>
      <TextInput
        value={value}
        returnKeyType="next"
        placeholder="보내실 ETH를 입력해주세요."
        keyboardType="phone-pad"
        style={styles.input}
        onChangeText={t => setValue(t)}
      />
      <Text
        style={{
          marginBottom: 10,
          color: 'black',
          textAlign: 'center',
        }}>
        * 가스 수수료(GWei) *
      </Text>
      <Text
        style={{
          color: 'black',
          textAlign: 'center',
        }}>
        {gasvalue}
      </Text>
      <View style={styles.sliderText}>
        <Text>Slow</Text>
        <Text>Fastest</Text>
      </View>
      <Slider
        value={gasvalue}
        minimumValue={1}
        onValueChange={v => setGasvalue(v)}
        maximumValue={8}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
        step={1}
      />
      <TouchableOpacity style={styles.button} type="submit" onPress={onpress}>
        <Text style={styles.buttonText}>보내기</Text>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 2,
    marginBottom: 20,
    fontSize: 17,
    marginLeft: 30,
    marginRight: 60,
    paddingLeft: 10,
  },
  inputText: {
    marginLeft: 10,
  },
  button: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: 'grey',
    padding: 20,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
  sliderText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrcode: {
    marginBottom: 30,
    marginTop: 20,
    marginLeft: -60,
  },
});

export default SendformItems;
