import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView , TouchableOpacity } from "react-native";
import AntDesign  from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H2, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from '@react-native-picker/picker';
import Global from "../../public/Global";


import Header from '../../components/header/header';
import { color } from "react-native-reanimated";

export default function Preferencias({ navigation }) {
    
    const [cidade, setCidade] = useState("");
    const [generos, setGeneros] = useState([]);
    const cidades = Global.cidades;
    const generosList = Global.generos;


    const getListGeneros = () => {

    }

    const savePreference = () =>{
        fetch(Global.ServerIP + "/preference", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + registrationToken
            },
            body: JSON.stringify({
                
                cidade : cidade,
                generos : generos
            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {

                    var bookID = responseText.data

                    if(localUri && filename && typeImg){
                        
                        SendImage(bookID[0]);
                        console.log('call sendImage')
                    }else{
                        navigation.navigate('Matchbook', { screen: 'Home' })
                    }

                } 
                else 
                {
                    setErros(responseText.message);
                    Alert.alert(
                        erros, "error"                      
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

    const generoContains = (item) => {

        let value = generos.includes(item)
        if(value){excludeGenero(item)}else{includeGenero(item)}
    }

    const generoContainsStyle = (item) => {

        let value = generos.includes(item)
        if(value){return true}else{return false}
    }

    const includeGenero = (item) => {
       
        setGeneros(generos => [...generos, item])

    } 
    const excludeGenero = (item) => {

        const teste = generos.filter(value => value !== item)
        setGeneros(teste)

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
                        msg={'Preferências'}
                        stl={{color: colors.primary_4}}
                    />
                    <H2
                        msg={'Quais gêneros de livros e em qual localidade você gostaria de ver?'}
                        stl={{color: colors.base_1, textAlign:'center', marginTop:10}}
                    />                   
                </View>             
                   

                <View style={{display:'flex',flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>

                    {
                        
                        generosList.map((item, index) => {
                            return (
                                <TouchableOpacity
                                onPress={() => generoContains(item)}
                                key ={item}
                                
                                >
                                <Text style={
                                    generoContainsStyle(item) ?
                                    styles.generoOn :
                                    styles.generoOff
                                }>
                                    {item}
                                </Text>
    
                                </TouchableOpacity>
                            
                            
                            ) 
                        })
   
                    }

                </View>

                <View>
                    <TouchableOpacity style={ [styles.Input, {marginTop:20, marginBottom:20} ] }>
                        <Picker
                            selectedValue={cidade}
                            style={styles.Input}
                            onValueChange={(itemValue) => 
                            setCidade(itemValue)}                      
                        >
                            <Picker.Item label={"Selecione a Cidade"} value={""} key={""}/>
                            
                            {
                                cidades.map((item, index) => {
                                    return (<Picker.Item label={item} value={item} key={index}/>) 
                                })
                            }

                            <Picker.Item label={"Outra Cidade"} value={"NF"} key={"NF"}/> 
                        </Picker>
                    </TouchableOpacity>                   
                </View> 

                <TouchableOpacity
                    onPress={() => savePreference() }
                >
                    <ButtonSolidE
                        msg={"Salvar Preferências"}
                        stl={{ marginTop:10}}
                    />
                </TouchableOpacity>

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
        marginBottom: 20,
        width:'80%'
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
    },
    selectCidade: {
        width: windowWidth * 0.83,
        marginLeft:0,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        color: "black",
        paddingLeft: 10
        
    },
    Input: {
        height: 40,
        width: windowWidth * 0.8 ,
        backgroundColor: "#ffff",
        borderRadius: 25,
        color: "#2C3382",
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "#20232a",
    },
    generoOn:{
        color: colors.background_2,
        backgroundColor : colors.primary_1,
        padding: 10,
        borderRadius:25,
        fontFamily: 'Lexend_Regular',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center'  ,
        padding:10,
        marginLeft:10,
        margin:5
    },
    generoOff:{
        color: colors.primary_1 ,
        backgroundColor : colors.background_2 ,
        borderColor:colors.primary_1,
        borderWidth:1,
        padding: 10,
        borderRadius:25,
        fontFamily: 'Lexend_Regular',
        fontWeight: '500',
        fontSize: 15,
        textAlign: 'center'  ,
        padding:10,
        marginLeft:10,
        margin:5

    }
 
})