import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView  } from "react-native";
import AntDesign  from "react-native-vector-icons/AntDesign";
import FontAwesome5  from "react-native-vector-icons/FontAwesome5";

import { TouchableOpacity } from 'react-native-gesture-handler';
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H2, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/header/header';
import ListMyBooks from "./ListMyBooks";
import { color } from "react-native-reanimated";

export default function ShowBook({ route , navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");
    const { bookID, match, matchID  } = route.params;
    const [ book, setBook] = useState({});
    const [ matchObj, setMatchObj] = useState({});
    

    useEffect(() => {
        getData()
    }, []);


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
                if(!match){
                    getBook(registration_token);
                }else{
                    getMatch(registration_token);
                }
                
            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };

    const getBook = (token) =>{

        fetch(Global.ServerIP + "/book?id="+bookID, {
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
                    setBook(responseText.data);
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

    const getMatch = (token) =>{

        fetch(Global.ServerIP + "/match?id="+matchID, {
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
                    setMatchObj(responseText.data);
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

    const ButtonremoveBook = () => {
        Alert.alert(
            "Remover o Livro",
            "Deseja realmente excluir o Livro.\nEssa ação é irreversivel!",
            [
              {
                text: "Cancel",
              },
              { text: "OK", 
                onPress: () => RemoveBook() 
            }
            ]
          );

    }

    const ButtonremoveMatch = () => {
        Alert.alert(
            "Remover o Match",
            "Deseja realmente excluir o Match.\nEssa ação é irreversivel!",
            [
              {
                text: "Cancel",
              },
              { text: "OK", 
                onPress: () => RemoveMatch() 
            }
            ]
          );

    }

    const RemoveBook = () => {


        fetch(Global.ServerIP + "/book?id="+bookID, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + registrationToken
            }
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {

                    navigation.navigate('Matchbook', { screen: 'MyBooks' })
                    
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

    const RemoveMatch = () => {


        fetch(Global.ServerIP + "/match?id="+matchID, {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + registrationToken
            }
        })
            .then((response) => response.text())
            .then((responseText) => {

                //console.log(responseText)

                responseText = JSON.parse(responseText);
                if (responseText.success) {

                    navigation.navigate('Matchbook', { screen: 'MyMatchs' })
                    
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
                <View
                    style={{position:'absolute',zIndex:5,top:105, right:15}}
                >
                    <FontAwesome5 
                        name='trash'
                        size={30} 
                        color= {'red'}
                        onPress={() => match ? ButtonremoveMatch() : ButtonremoveBook()}
                    /> 
                </View>
            <ScrollView
                style={styles.Container}
                contentContainerStyle={{ alignItems: 'center', paddingBottom:30 }}
            >
                <View
                    style={styles.Title}
                >
                    {
                        match ?

                        <H1
                        msg={'Detalhe do Match'}
                        stl={{color: colors.primary_4}}
                        />

                        :

                        <H1
                        msg={'Detalhe do Livro'}
                        stl={{color: colors.primary_4}}
                    />


                    }
                    
                </View>
                <View
                    style={styles.ContainerImg}
                >
                    <Image
                    style={ styles.Img }
                    source={{ uri: match ? matchObj.photo : book.photo }}
                />
                </View>
                <View
                    style={styles.details}
                >

                    <H3
                        msg={'Sobre o Livro'}
                        stl={{color: colors.primary_4,fontWeight:'bold', marginBottom:10 }}
                    />

                    <View
                        style={{display:'flex', flexDirection:'row'}}
                    >
                        <H5
                            msg={'Título: '}
                            stl={{color: colors.base_1 ,fontSize: 17 }}
                        />
                        <H4
                            msg={match ? matchObj.book : book.name}
                            stl={{color: colors.base_1,fontWeight:'bold' }}
                        />
                    </View>

                    <View
                        style={{display:'flex', flexDirection:'row'}}
                    >
                        <H5
                            msg={'Genêro: '}
                            stl={{color: colors.base_1 ,fontSize: 17 }}
                        />
                        <H4
                            msg={match ? matchObj.category : book.category}
                            stl={{color: colors.base_1,fontWeight:'bold' }}
                        />
                    </View>

                    <View
                        style={{display:'flex', flexDirection:'row'}}
                    >
                        <H5
                            msg={'Autor: '}
                            stl={{color: colors.base_1 ,fontSize: 17 }}
                        />
                        <H4
                            msg={match ? matchObj.author : book.author}
                            stl={{color: colors.base_1,fontWeight:'bold' }}
                        />
                    </View>

                    <View
                        style={{display:'flex', flexDirection:'row'}}
                    >
                        <H5
                            msg={'Localização: '}
                            stl={{color: colors.base_1 ,fontSize: 17 }}
                        />
                        <H4
                            msg={match ? matchObj.city : book.city}
                            stl={{color: colors.base_1,fontWeight:'bold' }}
                        />
                    </View>
                </View>
                
                {
                    match ?


                    <View
                        style={styles.details}
                    >

                        <H3
                            msg={'Sobre quem esta com o livro'}
                            stl={{color: colors.primary_4,fontWeight:'bold', marginBottom:10 }}
                        />

                        <View
                            style={{display:'flex', flexDirection:'row'}}
                        >
                            <H5
                                msg={'Nome: '}
                                stl={{color: colors.base_1 ,fontSize: 17 }}
                            />
                            <H4
                                msg={matchObj.name}
                                stl={{color: colors.base_1,fontWeight:'bold' }}
                            />
                        </View>

                        <View
                            style={{display:'flex', flexDirection:'row'}}
                        >
                            <H5
                                msg={'E-mail: '}
                                stl={{color: colors.base_1 ,fontSize: 17 }}
                            />
                            <H4
                                msg={matchObj.email}
                                stl={{color: colors.base_1,fontWeight:'bold' }}
                            />
                        </View>
                        {

                            matchObj.show_facebook ?

                                <View
                                    style={{display:'flex', flexDirection:'row'}}
                                >
                                    <H5
                                        msg={'Facebook: '}
                                        stl={{color: colors.base_1 ,fontSize: 17 }}
                                    />
                                    <H4
                                        msg={matchObj.facebook}
                                        stl={{color: colors.base_1,fontWeight:'bold' }}
                                    />
                                </View>

                                :
                                <View/>

                        }


                        {

                            matchObj.show_instagram ?

                                <View
                                style={{display:'flex', flexDirection:'row'}}
                                >
                                    <H5
                                        msg={'Instagram: '}
                                        stl={{color: colors.base_1 ,fontSize: 17 }}
                                    />
                                    <H4
                                        msg={matchObj.instagram}
                                        stl={{color: colors.base_1,fontWeight:'bold' }}
                                    />
                                </View>

                                :

                                <View/>


                        }

                        

                       
                    </View>
                    :

                    <View/>
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
        height:windowHeight * 0.45,
        width:windowWidth * 0.55,
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
    },
    details:{
        marginTop:20,
        //backgroundColor:'pink',
        width: '80%',
        
        
    }
 
})