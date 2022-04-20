import React, {useState, useCallback} from 'react';
import {View, StyleSheet} from 'react-native';
import Menutoggle from './Menutoggle';
import LogoutModal from '../_Modal/LogoutModal';

function Menu({navigation}) {
  const [on, setOn] = useState(false);
  const [modal, setModal] = useState(false);
  const [master, setMaster] = useState(false);

  const set = useCallback(() => {
    setMaster(true);
  }, []);

  const Logout = useCallback(() => {
    setModal(true);
  }, [modal]);

  return (
    <>
      <View style={styles.container}>
        <Menutoggle
          on={on}
          setOn={setOn}
          Logout={Logout}
          master={master}
          set={set}
          navigation={navigation}
        />
        <LogoutModal
          setModal={setModal}
          navigation={navigation}
          modal={modal}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
    backgroundColor: 'grey',
    marginBottom: 4,
    marginTop: 0,
    borderRadius: 35,
  },
  bottomText: {
    color: 'white',
  },
});

export default Menu;
