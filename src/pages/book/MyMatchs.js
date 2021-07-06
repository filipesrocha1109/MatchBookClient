import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView  } from "react-native";
import AntDesign  from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/header/header';
import ListMyBooks from "./ListMyBooks";
import { color } from "react-native-reanimated";

export default function MyMatchs({ navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");
    const [ match, setMatch] = useState([]);



    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
        return unsubscribe;
      }, [navigation]);

    const getData = async () => {
        try {
            const registration_id = await AsyncStorage.getItem(
                "@registration_id"
            );
            const registration_token = await AsyncStorage.getItem(
                "@registration_token"
            );
            if (registration_id && registration_token ) {
                setRegistrationId(registration_id);
                setRegistrationToken(registration_token);
                getMatchs(registration_token);
            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const getMatchs = (token) =>{

        fetch(Global.ServerIP + "/match", {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + token
            }
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {
                    //console.log(responseText.data)

                    setMatch(responseText.data)
                } 
                else 
                {
                    Alert.alert(
                        responseText.message, "error"                      
                    );
                }
              
            })
            .catch((error) => {
                console.error(error);
            });
    }

    const goBack = () => {
        navigation.goBack()
    }
 
    return (
        <View >
            <Header
                navigation = { navigation }
                menu = {true}
            />
                <View
                    style={{position:'absolute',zIndex:1,top:102, left:6}}
                >
                    <AntDesign 
                        name='arrowleft'
                        size={30} 
                        color= {colors.secondary_2}
                        onPress={() => goBack()}
                    /> 
                </View>
            <ScrollView
                style={styles.Container}
                contentContainerStyle={{ alignItems: 'center' }}
            >
                <View
                    style={styles.Title}
                >
                    <H1
                        msg={'Meus Matchs'}
                        stl={{color: colors.primary_4}}
                    />
                </View>

                {                  
                    match.length>0 ?
                            
                    match.map(({
                                    book_id,
                                    category,
                                    book,
                                    photo,
                                    id
                                    

                                })=>{
                                        return(
                                            <ListMyBooks
                                                img  = {photo}
                                                key = {id}
                                                title = {book}
                                                livroID = {book_id}
                                                navigation = { navigation }   
                                                match = { true }    
                                                matchID = {id}       
                                            />
                                            )   
                                        })
                                        :                     
                                <Text/>                    
                        }   

            </ScrollView>
            <Footer/>         
        </View>
    );
}




const windowHeight = Dimensions.get('window').height ;
const windowWidth = Dimensions.get('window').width ;

const styles = StyleSheet.create({
    Container:{
        height:windowHeight * 0.75,
    },
    Title:{
        textAlign:'center',
        alignItems:'center',
        marginTop: 20,
        marginBottom: 20
    },
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