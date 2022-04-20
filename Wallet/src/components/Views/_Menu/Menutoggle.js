import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import MenutoggleItems from './MenutoggleItems';

function Menutoggle({on, setOn, Logout, master, set, navigation}) {
  return (
    <>
      {on === false ? (
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('Home')}>
            <Text style={styles.bottomText}>ʜᴏᴍᴇ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('Send')}>
            <Text style={styles.bottomText}>sᴇɴᴅ</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.push('History')}>
            <Text style={styles.bottomText}>ʜɪsᴛᴏʀʏ</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setOn(true)}>
            <Text style={styles.bottomText}>..더보기</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <MenutoggleItems
          setOn={setOn}
          on={on}
          Logout={Logout}
          master={master}
          set={set}
          navigation={navigation}
        />
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  button: {
    padding: 24,
    backgroundColor: 'grey',
    margin: 4,
    marginTop: 0,
    borderRadius: 35,
  },
  bottomText: {
    color: 'white',
  },
});

export default React.memo(Menutoggle);
