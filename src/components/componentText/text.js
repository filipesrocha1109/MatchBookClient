import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import colors from '../../public/globalColors'

export function H1(props) {

    return (            
            <Text style={[styles.h1, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function H2(props) {

    return (            
            <Text style={[styles.h2, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function H3(props) {

    return (            
            <Text style={[styles.h3, props.stl]}  >
               {props.msg}
            </Text>
    );
}

export function H4(props) {

    return (            
            <Text style={[styles.h4, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function H5(props) {

    return (            
            <Text style={[styles.h5, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function H6(props) {

    return (            
            <Text style={[styles.h6, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function Text1(props) {

    return (            
            <Text style={[styles.text1, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function Text2(props) {

    return (            
            <Text style={[styles.text2, props.stl]} >
               {props.msg}
            </Text>
    );
}

export function Text3(props) {

    return (            
            <Text style={[styles.text3, props.stl]} >
               {props.msg}
            </Text>
    );
}

const styles = StyleSheet.create({

    h1: {   
        fontFamily: 'Lexend_Bold',
        fontWeight: '700',
        fontSize: 24,
        color: '#000000'
    },
    h2: {   
        fontFamily: 'Lexend_Medium',
        fontWeight: '500',
        fontSize: 22,
        color: '#000000'
    },
    h3: {   
        fontFamily: 'Lexend_Regular',
        fontWeight: '400',
        fontSize: 20,
        color: '#000000'
    },
    h4: {   
        fontFamily: 'Lexend_Bold',
        fontWeight: '700',
        fontSize: 17,
        color: '#000000'
    },
    h5: {   
        fontFamily: 'Lexend_Medium',
        fontWeight: '500',
        fontSize: 15,
        color: '#000000'
    },
    h6: {   
        fontFamily: 'Lexend_Regular',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000'
    },
    text1: {   
        fontFamily: 'Lexend_Medium',
        fontWeight: '500',
        fontSize: 13,
        color: '#000000'
    },
    text2: {   
        fontFamily: 'Lexend_Medium',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000'
    },
    text3: {   
        fontFamily: 'Lexend_Regular',
        fontWeight: '400',
        fontSize: 12,
        color: '#000000'
    },


});
