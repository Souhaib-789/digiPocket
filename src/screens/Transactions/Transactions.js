import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {Colors} from '../../config/Colors';
import Income from './Income';
import Expenses from './Expenses';
import TopTab from '../../components/TopTab';
import TextComponent from '../../components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Sizes } from '../../config/Sizes';
import { useNavigation } from '@react-navigation/native';


const Transactions = () => {
  const [activeComponent, setactiveComponent] = useState('Income');
const navigation = useNavigation()
  const options = [
    {
      id: 1,
      name: 'Income',
    },
    {
      id: 2,
      name: 'Expenses',
    },
  ];

  return (
    <View style={styles.container}>

      <View style={styles.flex}>
        <TextComponent text={'Transactions'} style={styles.heading} />
        <TouchableOpacity onPress={()=> navigation.navigate('AddTransaction')}>
        <Ionicons name='add-circle-outline' color={Colors.BLACK} size={23} />
        </TouchableOpacity>
      </View>

      <TopTab
        options={options}
        onActivePress={e => setactiveComponent(e?.name)}
        focused={activeComponent}
      />

      {activeComponent == 'Income' ? <Income /> : <Expenses />}
    </View>
  );
};

export default Transactions;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  flex:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20
  },
  heading:{
    fontSize: Sizes.h3
  }
});
