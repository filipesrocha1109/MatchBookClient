import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView  } from "react-native";
import Feather  from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/header/header';
import { color } from "react-native-reanimated";

export default function ListMyBooks( props ) {

    // let pathImage = "https://site.com.br/imagens/"+props.img
    //source={{uri: pathImage}}

    const img = props.img;
    const title = props.title;
    const livroID = props.livroID;
    const navigation = props.navigation;
    const match = props.match;
    const matchID = props.matchID;

    return (
        <View
            style={styles.Book}
        >
            <View
                style={ styles.ContainerImg }
            >
                <Image
                    style={ styles.Img }
                    source={{ uri: img }}
                />
            </View>                   
            <View
                style={ styles.Text }
            >
                <H3
                    msg={title}
                    stl={{color: colors.primary_1}}
                />                      
            </View>
            <View
            style={ styles.Button }
            >
                <TouchableOpacity
                    style={{alignItems:'center'}}
                    onPress={() => navigation.navigate('Matchbook', { screen: 'ShowBook', params: { bookID: livroID, match: match, matchID : matchID } })}
                >
                    <H4
                        msg={'Ver Livro'}
                        stl={{color: colors.secondary_2}}
                    />
                    <Feather 
                        name='book-open'
                        size={30} 
                        color= {colors.secondary_2}
                    />                       
                </TouchableOpacity>
            </View>
        </View>

    );
}




const windowHeight = Dimensions.get('window').height ;
const windowWidth = Dimensions.get('window').width ;

const styles = StyleSheet.create({
    Book:{
        height:windowHeight * 0.125,
        borderWidth:3,
        borderColor: colors.primary_1,
        width: windowWidth * 0.95,
        borderRadius:10,
        marginBottom:20,
        display:'flex',
        flexDirection:'row'
    },
    Img:{
        height:60,
        width:50,
        marginLeft:10,
        marginRight:5
    },
    ContainerImg:{
        justifyContent:'center',
        alignItems:'center'
    },
    Text:{
        width:'50%',
        justifyContent:'center',
        alignItems: 'flex-start',
        paddingLeft:3

    },
    Button:{
        width:'30%',
        justifyContent:'center',
        alignItems:'center'
    }
 
})