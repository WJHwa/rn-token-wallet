import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Login from '../components/Views/LoginPage/Login';
import Register from '../components/Views/RegisterPage/Register';
import Home from '../components/Views/HomePage/Home';
import Send from '../components/Views/SendPage/Send';
import Sendmmt from '../components/Views/SendPage/Sendmmt';
import History from '../components/Views/HistoryPage/History';
import WalletPlus from '../components/WalletPlus';
import ComfimTx from '../components/Views/_ComfimPage/ComfimTx';
import Complete from '../components/Views/_ComfimPage/Complete';
import JTComfimTx from '../components/Views/_ComfimPage/JTComfimTx';
import JTComplete from '../components/Views/_ComfimPage/JTComplete';
import BurnAdd from '../components/Views/admin/BurnAdd';
import BurnAddComfimTx from '../components/Views/_ComfimPage/BurnAddComfimTx';
import BurnAddComplete from '../components/Views/_ComfimPage/BurnAddComplete';

const StackNavigator = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        options={{headerShown: false}}
        component={Login}
      />
      {/* <Stack.Screen
        name="Register"
        options={{headerShown: false}}
        component={Register}
      /> */}
      <Stack.Screen
        name="Home"
        options={{headerShown: false}}
        component={Home}
      />
      {/* <Stack.Screen name="지갑불러오기" component={WalletPlus} />
      <Stack.Screen
        name="Send"
        options={{headerShown: false}}
        component={Send}
      />
      <Stack.Screen
        name="SendMMT"
        options={{headerShown: false}}
        component={Sendmmt}
      />
      <Stack.Screen
        name="History"
        options={{headerShown: false}}
        component={History}
      />
      <Stack.Screen name="출금" component={ComfimTx} />
      <Stack.Screen name="JT출금" component={JTComfimTx} />
      <Stack.Screen
        name="Complete"
        options={{headerShown: false}}
        component={Complete}
      />
      <Stack.Screen
        name="JTComplete"
        options={{headerShown: false}}
        component={JTComplete}
      />
      <Stack.Screen
        name="BurnAdd"
        options={{headerShown: false}}
        component={BurnAdd}
      />
      <Stack.Screen name="소각발행" component={BurnAddComfimTx} />
      <Stack.Screen
        name="BurnAddComplete"
        options={{headerShown: false}}
        component={BurnAddComplete}
      /> */}
    </Stack.Navigator>
  );
};

export default StackNavigator;
