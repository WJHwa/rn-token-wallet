import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

function MasterMenu({setOn, Logout, navigation}) {
  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={Logout}>
          <Text style={styles.bottomText}>ʟᴏɢᴏᴜᴛ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('SendMMT')}>
          <Text style={styles.bottomText}>ᴍᴍᴛ sᴇɴᴅ</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.push('BurnAdd')}>
          <Text style={styles.bottomText}>ʙᴜʀɴ n ᴀᴅᴅ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.bottomText}>ʟᴏᴄᴋ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setOn(false)}>
          <Text style={styles.bottomText}>ᴄʟᴏsᴇ</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: '3%',
    paddingTop: '6%',
    paddingBottom: '6%',
    backgroundColor: 'black',
    margin: 3,
    marginRight: 1,
    marginTop: 0,
    borderRadius: 35,
  },
  bottomText: {
    color: 'white',
    fontSize: 14,
  },
  container: {
    flexDirection: 'row',
  },
});

export default MasterMenu;
