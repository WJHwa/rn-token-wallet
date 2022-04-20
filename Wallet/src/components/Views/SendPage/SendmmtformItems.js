import React from 'react';
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

function SendmmtformItems({
  gasvalue,
  setGasvalue,
  value,
  setValue,
  addressValue,
  setAddressValue,
  onpress,
  activeQR,
}) {
  return (
    <>
      <Text style={styles.inputText}>지갑 주소</Text>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <TextInput
          returnKeyType="next"
          value={addressValue}
          onChangeText={t => setAddressValue(t)}
          placeholder="지갑주소를 정확하게 입력해주세요."
          keyboardType="numbers-and-punctuation"
          style={styles.input}
        />
        {!addressValue ? (
          <TouchableOpacity style={styles.qrcode} onPress={activeQR}>
            <FontAwesomeIcon icon={faQrcode} size={18} />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>

      <Text style={styles.inputText}>보낼 MMT</Text>
      <TextInput
        value={value}
        returnKeyType="next"
        placeholder="보내실 TTC를 입력해주세요."
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
        minimumValue={7}
        onValueChange={v => setGasvalue(v)}
        maximumValue={15}
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

export default SendmmtformItems;
