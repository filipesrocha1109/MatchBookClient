import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image, TouchableOpacity } from "react-native";
import colors from '../../public/globalColors'

export function ButtonSolidE(props) {

    return (     
      
                <Text style={[styles.ButtonSolidE, props.stl]} >
                {props.msg}
                </Text>
    );
}

export function ButtonOutlinedE(props) {

    return (     
      
                <Text style={[styles.ButtonOutlinedE, props.stl]} >
                {props.msg}
                </Text>
    );
}


const styles = StyleSheet.create({

    ButtonSolidE: {   
        color: colors.background_2,
        backgroundColor : colors.primary_1,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius:25,
        fontFamily: 'Lexend_Regular',
        fontWeight: '500',
        fontSize: 15,
        color: '#ffff'        
    },
    ButtonOutlinedE:{
        color: colors.background_2,
        padding: 10,
        paddingHorizontal: 30,
        borderRadius:25,
        fontFamily: 'Lexend_Regular',
        fontWeight: '500',
        fontSize: 15,
        color: colors.base_1, 
        borderWidth: 1,
        borderColor: colors.primary_1 ,
        
    }

});
