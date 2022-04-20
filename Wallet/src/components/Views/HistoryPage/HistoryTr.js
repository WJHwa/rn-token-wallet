import React from 'react';
import {View, StyleSheet, Text, ScrollView} from 'react-native';
import HistoryTd from './HistoryTd';

function HistoryTr({data}) {
  return (
    <>
      <View style={styles.container}>
        <View style={styles.tr}>
          <Text style={styles.tr1}>#</Text>
          <Text style={styles.Trgas}>gas</Text>
          <Text style={styles.Trhash}>transaction</Text>
          <Text style={styles.Trto}>to</Text>
          <Text style={styles.Trvalue}>value</Text>
        </View>
        <ScrollView>
          <HistoryTd data={data} />
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 8,
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: 'white',
  },
  tr: {
    margin: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingBottom: 1,
    borderBottomWidth: 2,
    borderBottomColor: 'white',
    backgroundColor: '#808080',
  },
  tr1: {
    width: '5%',
    paddingBottom: 5,
    paddingTop: 5,
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
    textAlign: 'center',
    color: 'white',
  },
  Trgas: {
    width: '14%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    color: 'white',
  },
  Trhash: {
    width: '35%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    color: 'white',
  },
  Trto: {
    width: '35%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    color: 'white',
  },
  Trvalue: {
    width: '10%',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    borderRightWidth: 2,
    borderRightColor: 'white',
    textAlign: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    color: 'white',
  },
});

export default HistoryTr;
