import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, TouchableOpacity, ScrollView  } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import colors from '../../public/globalColors'
import Global from '../../public/Global'

export default function ListBook( props ) {

    return (     

        <View
            style={styles.Macth}                    
        >
            <View>
                <Text style={{marginTop:30}}>
                    {props.element}
                </Text>
                <Text>
                    index: {props.index} 
                </Text>
            </View>
        </View>                      
    );
}




const windowHeight = Dimensions.get('window').height ;
const windowWidth = Dimensions.get('window').width ;

const styles = StyleSheet.create({
    Macth:{
        width:windowWidth,
        height: windowHeight * 0.75,
        //backgroundColor: 'blue',
        padding:20,
        display:'flex',
        flexDirection:'column'
    },
    Macth1:{
        width:windowWidth,
        height: windowHeight * 0.75,
        //backgroundColor: 'blue',
        padding:20
    },NextPage:{
        //position:'absolute' ,
        alignSelf: 'flex-end', 
        marginTop:300, 
        right:15, 

    },
    PreviusPage:{
        //position:'absolute',
        alignSelf: 'flex-start', 
        marginTop:300, 
        left:15
    }
})