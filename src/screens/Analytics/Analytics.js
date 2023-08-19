import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { Colors } from '../../config/Colors';
import { BarChart, PieChart } from 'react-native-gifted-charts';
import TextComponent from '../../components/TextComponent';
import { Sizes } from '../../config/Sizes';
import { useDispatch, useSelector } from 'react-redux';
import { Fonts } from '../../config/Fonts';
import { hideLoading, showAlert, showLoading } from '../../redux/actions/AppAction';
import firestore from '@react-native-firebase/firestore';
import Icon from '../../components/Icon';

const Analytics = () => {

  const theme = useSelector(state => state.AppReducer.theme)
  const userID = useSelector(state => state.AuthReducer.userInfo.uid);
  const dispatch = useDispatch();

  const [incomes, setincomes] = useState([]);
  const [PIE_DATA, setPIE_DATA] = useState([]);
  const [refreshing, setRefreshing] = useState(false);


  useEffect(() => {
    getAllData()
  }, [])


  const getAllData = async () => {
    const usersCollectionRef = firestore().collection('Users');
    try {
      dispatch(showLoading());
      const userDoc = await usersCollectionRef.doc(userID).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        const incomeArray = userData.income || [];
        const expenseArray = userData.expenses || [];

        setincomes(incomeArray);
        if (expenseArray) {
          // console.log('----- expenseArray -----', expenseArray);

          const counts = categories.reduce((result, category) => {
            const count = expenseArray.reduce((total, item) => {
              if (item?.category === category?.name) {
                return total + 1;
              }
              return total;
            }, 0);

            result[category?.name] = count;
            return result;
          }, {});

          if (counts) {
            calculatePieData(counts)
          } else {
            console.log('loading pie data');
          }
        }
      } else {
        console.log('User document not found');
        return [];
      }
    } catch (error) {
      console.error('Error fetching user expenses: ', error);
      dispatch(showAlert('Something went wrong'))
      return [];
    } finally {
      dispatch(hideLoading())
    }
  };

  const barData = [
    {
      value: 1,
      label: 'Jan',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    {
      value: 1,
      label: 'Feb',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    {
      value: 1,
      label: 'March',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    {
      value: 1,
      label: 'Apr',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    {
      value: 1,
      label: 'May',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    {
      value: 1,
      label: 'Jun',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },

    {
      value: 1,
      label: 'Jul',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },

    {
      value: 35,
      label: 'Aug',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 15, frontColor: Colors.LLGREY },

    {
      value: 1,
      label: 'Sep',
      spacing: 2,
      labelWidth: 30,
      labelTextStyle: { color: Colors.LLLGREY },
      frontColor: Colors.PRIMARY_COLOR,
    },
    { value: 1, frontColor: Colors.LLGREY },
    
  ];

  const categories = [
    {
      id: 1,
      name: 'Education',
      color: Colors.PINK,
    },
    {
      id: 2,
      name: 'Food',
      color: Colors.ORANGE,
    },
    {
      id: 3,
      name: 'Bills',
      color: Colors.DGREEN,
    },
    {
      id: 4,
      name: 'Shopping',
      color: Colors.LBLUE,
    },
    {
      id: 5,
      name: 'Fuel',
      color: Colors.PURPLE,
    },
    {
      id: 6,
      name: 'Rent',
      color: Colors.BROWN,
    },
    {
      id: 7,
      name: 'Gift',
      color: Colors.YELLOW,
    },
    {
      id: 8,
      name: 'Travel',
      color: Colors.PRIMARY_COLOR,
    },
    {
      id: 9,
      name: 'Sport',
      color: Colors.GREEN,
    },
    {
      id: 10,
      name: 'Medical',
      color: Colors.RED,
    },
  ];

  const calculatePieData = (Counts) => {
    try {
      const totalSum = categories.reduce((sum, category) => sum + Counts[category?.name], 0);

      let pieDataArray = categories.map(category => ({
        value: Counts[category?.name],
        color: category?.color,
        text: `${((Counts[category?.name] / totalSum) * 100).toFixed(1)}%`
      }))
      setPIE_DATA(pieDataArray)
      // console.log('----- pieData -----' , pieDataArray);
    } catch (err) {
      console.log(err);
      dispatch(showAlert('Poor internet connection !'))
    }
  }

  const renderCategoryItem = ({ item }) => {
    return (
      <View style={[styles.category_item, { backgroundColor: theme ? Colors.BLACK : Colors.WHITE }]}>
        <Icon category={item?.name} color={item?.color} />
        <TextComponent text={item?.name} />
      </View>
    );
  };




  return (
    <View style={[styles.container, { backgroundColor: theme ? Colors.BLACK : Colors.WHITE }]}>
      <TextComponent text={'Analytics'} style={styles.heading} />

      <ScrollView showsVerticalScrollIndicator={false} refreshControl={  <RefreshControl
            refreshing={refreshing}
            onRefresh={getAllData}
            colors={[Colors.PRIMARY_COLOR, Colors.BLACK]}
          /> }>
        <TextComponent text={'Overview'} style={[styles.sub_heading, { color: theme ? Colors.WHITE : Colors.BLACK }]} />
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
          yAxisTextStyle={{ color: Colors.LLGREY }}
          yAxisLabelTexts={['low', 'fair', 'good', 'Xlent']}
          yAxisLabelWidth={1}
        />

        <View style={[styles.flex, { marginTop: 40 }]}>
          <View style={styles.flex}>
            <View style={styles.key_circle} />
            <TextComponent text={'Income'} />
          </View>

          <View style={styles.flex}>
            <View style={[styles.key_circle, { backgroundColor: Colors.LLGREY }]} />
            <TextComponent text={'Expenses'} />
          </View>
        </View>

        <TextComponent text={'Expense ratio'} style={[styles.sub_heading, { color: theme ? Colors.WHITE : Colors.BLACK, marginTop: 30, marginBottom: 10 }]} />

        <FlatList
          data={categories}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
        />


        {
          PIE_DATA ?

            <View style={{ alignSelf: 'center' }}>
              <PieChart
                donut
                innerRadius={50}
                data={PIE_DATA}
                style={styles.pie_chart}
                showText
                textColor={Colors.WHITE}
                focusOnPress={true}
                onLabelPress={(item, index) => console.log(item)}
                textSize={13}
                strokeColor="transparent"
                strokeWidth={70}
                shiftInnerCenterX={5}
                innerCircleColor={theme ? Colors.BLACK : Colors.WHITE}
                shiftInnerCenterY={8}
              />
            </View> : <ActivityIndicator color={Colors.PRIMARY_COLOR} size={20} />
        }

      </ScrollView>
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 60,
  },
  sub_heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h4,
    marginTop: 30,
    fontFamily: Fonts.SemiBold
  },
  heading: {
    fontSize: Sizes.h3,
    fontFamily: Fonts.Regular
  },
  category_item: {
    flexDirection: 'row',
    gap: 10,
    marginVertical: 8,
    marginHorizontal: 4,
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
  key_circle: {
    width: 10,
    height: 10,
    borderRadius: 30,
    backgroundColor: Colors.PRIMARY_COLOR,
  }
});
