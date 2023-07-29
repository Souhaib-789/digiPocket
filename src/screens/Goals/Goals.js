import React, {useState} from 'react';
import {StyleSheet, View, Text, FlatList, ScrollView, TouchableOpacity} from 'react-native';
import {Colors} from '../../config/Colors';
import {Sizes} from '../../config/Sizes';
import TextComponent from '../../components/TextComponent';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Switch} from 'react-native-switch';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const Goals = () => {
  const [Value, setValue] = useState(false);
  const navigation = useNavigation()
  const renderListItem = ({item}) => {
    return (
      <View style={styles.list_item}>
        <View style={styles.flex}>
          <FontAwesome6 size={18} color={Colors.BLACK} name="cart-shopping" />
          <View style={{gap: 8}}>
            <TextComponent text={'Car'} style={styles.list_text} />
            <Progress.Bar
              progress={0.8}
              height={5}
              width={200}
              animated={true}
              useNativeDriver={true}
              color={Colors.PRIMARY_COLOR}
              borderWidth={1}
            />
          </View>
        </View>
        <TextComponent text={'$200'} style={styles.expense_text} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextComponent text={'Goals'} style={styles.heading} />

      <ScrollView>
        <View style={styles.box}>
          <Ionicons
            name="checkmark-done-circle"
            color={Colors.PRIMARY_COLOR}
            size={30}
          />
          <View>
            <TextComponent text={'Goals Achieved'} style={styles.box_span} />
            <TextComponent text={'0/1'} style={styles.box_heading} />
          </View>
        </View>

        <View style={styles.flex}>
          <TextComponent text={'Show Achieved Goals'} style={styles.box_span} />

          <Switch
            value={Value}
            onValueChange={val => {
              setValue(val);
            }}
            circleSize={23}
            barHeight={15}
            circleBorderWidth={2}
            backgroundActive={Colors.RGBA}
            backgroundInactive={Colors.LLGREY}
            circleActiveColor={Colors.PRIMARY_COLOR}
            circleBorderActiveColor={Colors.PRIMARY_COLOR}
            renderActiveText={false}
            renderInActiveText={false}
          />
        </View>

        <TextComponent text={'Current Goals'} style={styles.sub_heading} />
        <FlatList
          data={[1, 2]}
          renderItem={renderListItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />

        {Value && (
          <>
            <TextComponent text={'Achieved Goals'} style={styles.sub_heading} />
            <FlatList
              data={[1, 2]}
              renderItem={renderListItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
            />
          </>
        )}

      </ScrollView>
      <TouchableOpacity style={styles.add_button} onPress={()=> navigation.navigate('AddGoal')}>
  <Ionicons name={'add'} color={Colors.WHITE} size={25} />
</TouchableOpacity>
    </View>
  );
};

export default Goals;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingBottom: 80,
  },
  heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
  },
  box: {
    backgroundColor: Colors.WHITE,
    elevation: 5,
    borderRadius: 10,
    paddingVertical: 20,
    paddingHorizontal: 15,
    width: '50%',
    gap: 12,
    marginVertical: 20,
    marginHorizontal: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  box_span: {
    color: Colors.BLACK,
    fontSize: Sizes.h6,
  },
  box_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
    fontWeight: 'bold',
  },
  flex: {
    flexDirection: 'row',
    gap: 15,
    alignItems: 'center',
  },
  list_text: {
    color: Colors.BLACK,
    fontSize: Sizes.h5,
  },
  expense_text: {
    color: Colors.BLACK,
    fontSize: Sizes.h5,
    fontWeight: 'bold',
  },
  sub_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h5,
    fontWeight: 'bold',
    marginTop: 30,
    marginBottom: 5,
  },
  list_item: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: Colors.RGBA2,
    padding: 15,
    borderRadius: 5,
  },
  add_button:{
    backgroundColor: Colors.PRIMARY_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
 width: 50,
 height: 50,
 position: 'absolute',
 bottom: 100,
 right: 20
  }
});