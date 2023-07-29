import React from 'react';
import {StyleSheet, View, Text, ScrollView, FlatList} from 'react-native';
import {Colors} from '../../config/Colors';
import {BarChart, PieChart} from 'react-native-gifted-charts';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Analytics = () => {
  const barData = [
    {
      value: 40,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
      
    },
    {value: 20, frontColor: Colors.LLGREY},
    {
      value: 50,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
    },
    {value: 40, frontColor: Colors.LLGREY},
    {
      value: 75,
      label: 'Mar',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
    },
    {value: 25, frontColor: Colors.LLGREY},
    {
      value: 30,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
    },
    {value: 20, frontColor: Colors.LLGREY},
    {
      value: 60,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
    },
    {value: 40, frontColor: Colors.LLGREY},
    {
      value: 65,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: {color: Colors.LLLGREY},
      frontColor: Colors.PRIMARY_COLOR,
    },
    {value: 30, frontColor: Colors.LLGREY},
  ];

  const pieData = [
    {value: 30, color: Colors.PRIMARY_COLOR, text: '54%'},
    {value: 20, color: Colors.RED, text: '74%'},
    {value: 10, color: Colors.YELLOW, text: '14%'},
    {value: 80, color: Colors.GREEN, text: '80%'},
    {value: 10, color: Colors.ORANGE, text: '20%'},
    {value: 40, color: Colors.PINK, text: '44%'},
    {value: 60, color: Colors.PURPLE, text: '74%'},
  ];

  const categories = [
    {
      id: 1,
      name: 'Education',
      icon: (
        <FontAwesome5
          name="graduation-cap"
          color={Colors.PRIMARY_COLOR}
          size={14}
        />
      ),
    },
    {
      id: 2,
      name: 'Food',
      icon: <MaterialCommunityIcons name="food" color={Colors.RED} size={14} />,
    },
    {
      id: 3,
      name: 'Sports',
      icon: (
        <MaterialIcons name="sports-tennis" color={Colors.GREEN} size={14} />
      ),
    },
    {
      id: 4,
      name: 'Shopping',
      icon: (
        <FontAwesome6 size={14} color={Colors.BLACK} name="cart-shopping" />
      ),
    },
    {
      id: 5,
      name: 'Fuel',
      icon: <FontAwesome6 size={14} color={Colors.BLACK} name="gas-pump" />,
    },
    {
      id: 6,
      name: 'Rent',
      icon: (
        <FontAwesome6 name="house-chimney-window" size={14} color={'orange'} />
      ),
    },
  ];

  const renderCategoryItem = ({item}) => {
    return (
      <View style={styles.category_item}>
        {item?.icon}
        <TextComponent text={item?.name} />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <TextComponent text={'Analytics'} style={styles.heading} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <TextComponent text={'Overview'} style={styles.sub_heading} />
        <BarChart
          barWidth={10}
          noOfSections={3}
          barBorderRadius={10}
          frontColor={Colors.LLGREY}
          data={barData}
          onPress={() => console.log('a')}
          yAxisThickness={0}
          xAxisThickness={0}
          isAnimated={true}
          yAxisTextStyle={{color: Colors.LLGREY}}
          yAxisLabelTexts={['low', 'fair', 'good', 'Xlent']}
          yAxisLabelWidth={1}
        />

        <View style={[styles.flex, {marginTop: 40}]}>
          <View style={styles.flex}>
            <View style={styles.key_circle} />
            <TextComponent text={'Income'} />
          </View>

          <View style={styles.flex}>
            <View  style={[styles.key_circle , {backgroundColor: Colors.LLGREY}]}  />
            <TextComponent text={'Expenses'} />
          </View>
        </View>

        <TextComponent text={'Expense ratio'}  style={[styles.sub_heading, {marginTop: 30, marginBottom: 10}]} />

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />

        <View style={{alignSelf: 'center'}}>
          <PieChart
            donut
            innerRadius={50}
            data={pieData}
            style={styles.pie_chart}
            showText
            textColor={Colors.WHITE}
            focusOnPress={true}
            onLabelPress={(item, index) => console.log(item)}
            textSize={13}
            strokeColor="transparent"
            strokeWidth={60}
            shiftInnerCenterX={5}
            shiftInnerCenterY={8}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
    paddingBottom: 60,
  },
  sub_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h4,
    fontWeight: 'bold',
    marginTop: 30,
  },
  heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h3,
  },
  category_item: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
    marginHorizontal: 5,
    backgroundColor: Colors.WHITE,
    elevation: 3,
    padding: 10,
    paddingRight: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  pie_chart: {
    alignSelf: 'center',
  },
  flex: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    gap: 20,
    alignItems: 'center',
  },
  key_circle:{
    width: 10,
    height: 10,
    borderRadius: 30,
    backgroundColor: Colors.PRIMARY_COLOR,
  }
});
