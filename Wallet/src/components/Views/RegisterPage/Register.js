import React, {useState} from 'react';
import {View, StyleSheet, Text, Alert, TouchableOpacity} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Registerform from './Registerform';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowAltCircleLeft} from '@fortawesome/free-solid-svg-icons';
import LoadingSpinner from 'react-native-loading-spinner-overlay';

function Register({navigation}) {
  const [loading, setLoading] = useState(false);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            margin: 5,
            marginLeft: 6,
            padding: 2,
            borderRadius: 20,
          }}
          onPress={() => navigation.goBack()}>
          <FontAwesomeIcon icon={faArrowAltCircleLeft} />
        </TouchableOpacity>
        <Text style={{fontSize: 14, color: 'black'}}>지갑생성</Text>
      </View>
      <KeyboardAwareScrollView>
        {loading === false ? (
          <Registerform setLoading={setLoading} navigation={navigation} />
        ) : (
          <LoadingSpinner
            visible={loading}
            textContent="새로운 지갑을 생성하고 있습니다."
          />
        )}
      </KeyboardAwareScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 10,
    marginRight: 15,
    marginLeft: 15,
    borderRadius: 5,
    backgroundColor: '#E0E0E0',
    padding: 13,
  },
});
export default Register;
