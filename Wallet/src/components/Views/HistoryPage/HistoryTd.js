import React from 'react';
import {View, StyleSheet, Text, TouchableOpacity} from 'react-native';

function HistoryTd({data}) {
  return (
    <>
      {data.length !== 0 ? (
        data.map(d => {
          return (
            <View style={styles.container} key={d.id}>
              <Text
                style={{
                  width: '6%',
                  paddingBottom: 20,
                  paddingTop: 10,
                  borderRightWidth: 1,
                  borderRightColor: 'white',
                  textAlign: 'center',
                }}>
                {d.id}
              </Text>
              <Text
                style={{
                  width: '14%',
                  borderRightWidth: 1,
                  borderRightColor: 'white',
                  textAlign: 'center',
                }}>
                {d.re_gas} gas
              </Text>
              <TouchableOpacity
                style={{
                  width: '35%',
                  borderRightWidth: 1,
                  borderRightColor: 'white',
                  textAlign: 'center',
                  height: 90,
                }}>
                <Text note>{d.re_hash}</Text>
              </TouchableOpacity>
              <Text
                style={{
                  width: '35%',
                  borderRightWidth: 1,
                  borderRightColor: 'white',
                  textAlign: 'center',
                }}>
                {d.re_to}
              </Text>
              <Text
                style={{
                  width: '10%',
                  borderRightWidth: 1,
                  borderRightColor: 'white',
                  textAlign: 'center',
                }}>
                {d.re_value}ETH
              </Text>
            </View>
          );
        })
      ) : (
        <View style={styles.view}>
          <Text style={{fontSize: 16}}>거래내역이 없습니다.</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    height: 95,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
  },
  view: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 220,
  },
});

export default React.memo(HistoryTd);
