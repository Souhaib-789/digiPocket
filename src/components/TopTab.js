import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Colors } from '../config/Colors';
import { Sizes } from '../config/Sizes';

const TopTab = (props) => {

    return (
        <View style={styles.container}>
            {
                props?.options?.map((item, index) => {
                    return (
                        <TouchableOpacity key={index} style={[styles.tab , {backgroundColor: item?.name == props?.focused ? Colors.PRIMARY_COLOR : Colors.WHITE}]} onPress={() => props?.onActivePress(item)}>
                            <Text style={[styles.text, { color: item?.name == props?.focused ? Colors.WHITE : Colors.BLACK }]}>{item?.name}</Text>
                        </TouchableOpacity>
                    )
                })
            }
        </View>
    );
}

export default TopTab;

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.WHITE,
        width: '100%',
        padding: 8,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        
    },
    tab: {
        width: '40%',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingVertical: 15,
        borderRadius: 40,
        backgroundColor: Colors.WHITE
    },
    text: {
        fontSize: Sizes.h5,
        fontWeight: 'bold'
    }
});