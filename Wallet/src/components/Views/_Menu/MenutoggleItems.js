import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MasterMenu from './MasterMenu';

function MenutoggleItems({setOn, on, Logout, master, set, navigation}) {
  return (
    <>
      {master === false ? (
        <View style={styles.container}>
          <TouchableOpacity style={styles.button} onPress={Logout}>
            <Text style={styles.bottomText}>ʟᴏɢᴏᴜᴛ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('SendMMT')}>
            <Text style={styles.bottomText}>ᴍᴍᴛ sᴇɴᴅ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            {on === false ? (
              <Text style={styles.bottomText}>ᴡᴀʟʟᴇᴛ ᴅᴇʟᴇᴛ</Text>
            ) : (
              <Text
                style={{
                  color: 'red',
                }}>
                ᴅᴇʟᴇᴛᴇ
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={set}>
            <Text style={styles.bottomText}>ᴄʟᴏsᴇ</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <MasterMenu setOn={setOn} Logout={Logout} navigation={navigation} />
      )}
    </>
  );
}
const styles = StyleSheet.create({
  button: {
    padding: 22,
    backgroundColor: 'black',
    margin: 3,
    marginTop: 0,
    borderRadius: 35,
  },
  bottomText: {
    color: 'white',
  },
  container: {
    flexDirection: 'row',
  },
});

export default React.memo(MenutoggleItems);
