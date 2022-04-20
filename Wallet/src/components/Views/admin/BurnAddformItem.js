import React, {useState} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Slider from '@react-native-community/slider';

function BurnAddformItem({address, navigation}) {
  const [gasvalue, setGasvalue] = useState(7);
  const [value, setValue] = useState('');
  const [master, setMaster] = useState('');
  const [gasLimit, setGasLimit] = useState('');

  const AddBurnBtn = (array, name) => {
    if (master !== 'ABC') {
      return Alert.alert('마스터키를 정확하게 입력해주세요.');
    }
    let raw = {
      gas: gasvalue,
      value: value,
      gasLimit: gasLimit,
      address: address,
      array: array,
      name: name,
    };
    navigation.navigate('소각발행', raw);
  };

  return (
    <>
      <Text style={styles.inputText}>마스터 키</Text>
      <TextInput
        value={master}
        returnKeyType="next"
        placeholder="마스터키를 입력해주세요."
        keyboardType="name-phone-pad"
        style={styles.input}
        onChangeText={t => setMaster(t)}
      />
      <Text style={styles.inputText}>가스 제한</Text>
      <TextInput
        value={gasLimit}
        returnKeyType="next"
        placeholder="가스제한을 입력해주세여."
        keyboardType="numeric"
        style={styles.input}
        onChangeText={t => setGasLimit(t)}
      />
      <Text style={styles.inputText}>소각 또는 추가발행</Text>
      <TextInput
        value={value}
        returnKeyType="next"
        placeholder="입력해주세요."
        keyboardType="numeric"
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => AddBurnBtn('addCoin', '추가발행')}>
          <Text style={styles.buttonText}>Burn</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          type="submit"
          onPress={() => AddBurnBtn('burnCoin', '소각')}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>
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
  sliderText: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 4,
    marginRight: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    margin: 20,
    marginBottom: 10,
    backgroundColor: 'grey',
    padding: 27,
    paddingRight: 50,
    paddingLeft: 50,
    borderRadius: 30,
    borderColor: 'black',
    borderWidth: 1,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
  },
});

export default BurnAddformItem;
