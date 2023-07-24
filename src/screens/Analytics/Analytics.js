import React from 'react';
import {StyleSheet, View, Image} from 'react-native';
import {Colors} from '../../config/Colors';
import {BarChart} from 'react-native-gifted-charts';
import TextComponent from '../../components/TextComponent';
import {Sizes} from '../../config/Sizes';

const Analytics = () => {
  const barData = [
    {value: 250, label: 'Jan', frontColor: Colors.PRIMARY_COLOR },
    {value: 500, label: 'Feb', frontColor: Colors.PRIMARY_COLOR},
    {value: 745, label: 'Mar', frontColor: Colors.PRIMARY_COLOR},
    {value: 320, label: 'Apr'},
    {value: 600, label: 'May', frontColor: Colors.PRIMARY_COLOR},
    {value: 256, label: 'Jun', frontColor: Colors.PRIMARY_COLOR},
    {value: 300, label: 'Jul'},
    {value: 600, label: 'Aug'},
    {value: 700, label: 'Sep', frontColor: Colors.PRIMARY_COLOR},
    {value: 300, label: 'Oct'},
    {value: 400, label: 'Nov' ,frontColor: Colors.PRIMARY_COLOR},
    {value: 100, label: 'Dec'},
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextComponent text={'Analytics'} style={styles.heading} />
      </View>

      <BarChart
        barWidth={20}
        noOfSections={3}
        barBorderRadius={10}
        frontColor={Colors.LLGREY}
        data={barData}
        onPress={() => console.log('a')}
        yAxisThickness={0}
        xAxisThickness={0}
        yAxisTextStyle={{color: Colors.LLGREY}}
        yAxisLabelTexts={['low', 'fair', 'good', 'Xlent']}
      />
    </View>
  );
};

export default Analytics;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    padding: 20,
  },
  sub_heading: {
    color: Colors.GREY,
    fontSize: Sizes.h6,
  },
  heading: {
    color: Colors.BLACK,
    fontSize: Sizes.h2,
  },
});
