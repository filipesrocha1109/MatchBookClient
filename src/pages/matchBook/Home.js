import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView, Button  } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListBook from '../matchBook/ListBook';
import Swiper from "react-native-deck-swiper";

import Header from '../../components/header/header';

export default function Home({ navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");
    const [ cardIndex, setcardIndex] = useState("");

    useEffect(() => {
        
    }, []);

    const scrollviewRef = useRef()


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
            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };
    getData();

    // stackSize => número de cards
    // infinite => não ter fim os cards

    


    const books =[
        {
            titulo : "Alex Rider",
            genero: "Ação",
            autor: "Anthony Horowitz",
            localizacao: "Porto Alegre"
        },
        {
            titulo : "Menino do pijama listrado",
            genero: "trajédia",
            autor: "Anthony Horowitz",
            localizacao: "Porto Alegre"
        },
        {
            titulo : "A bela e a fera",
            genero: "trajédia",
            autor: "Anthony Horowitz",
            localizacao: "Porto Alegre"
        },
        {
            titulo : "Dracula",
            genero: "trajédia",
            autor: "Anthony Horowitz",
            localizacao: "Porto Alegre"
        }
    ];

    const matchOn = (value) =>{
        console.log('================================================')
        console.log('ON:' + value )
        console.log(books[value])
        console.log('================================================')
    };
    const matchOff = (value) =>{
        console.log('================================================')
        console.log('OFF:' + value )
        console.log(books[value])
        console.log('================================================')
    };

    const deck = useRef();

    const windowHeight = Dimensions.get('window').height ;
    const windowWidth = Dimensions.get('window').width ;
    

    return (
        <View style={styles.container} >

            <Header
                navigation = { navigation }
                menu = {true}
            />
            <View
                style={styles.swiper}
            >
            
                <Swiper
                    ref={deck}
                    infinite
                    swipeBackCard
                    stackSize={1}
                    cards={books}
                    //onSwiped={(cardIndex) => { setcardIndex(cardIndex) }}
                    onSwipedLeft={(cardIndex) => { matchOn(cardIndex) }}
                    onSwipedRight={(cardIndex) => { matchOff(cardIndex) }}

                    backgroundColor={colors.background_2}
                    
                    renderCard={(card)=>{
                        return(
                            <View style={styles.containerSwiper}>

                                <View style={styles.containerImg} >
                                    <Image
                                        style={ styles.Img }
                                        source={require("../../assets/livro.png")}
                                    />
                                </View>
                                <View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Título: </Text>
                                        <Text style={styles.h4} >{card.titulo}</Text>
                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Genêro: </Text>
                                        <Text style={styles.h4} >{card.genero}</Text>
                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Autor: </Text>
                                        <Text style={styles.h4} >{card.autor}</Text>

                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Localização: </Text>
                                        <Text style={styles.h4} >{card.localizacao}</Text>                                       
                                    </View>                                                                           
                                </View>                                                            
                            </View>
                        )
                    }}
                    
                />    

            </View>
            
            
            
            <View style={styles.PreviusPage}>
                <Feather
                    name={'arrow-left-circle'}
                    color={'red'}
                    size={35}
                    onPress={()=> {deck.current.swipeRight()}}                    
                   />
            </View>
            <View style={styles.NextPage}>
                <Feather
                    name={'arrow-right-circle'}
                    color={'green'}
                    size={35}
                    onPress={()=> { deck.current.swipeLeft()}}
                />
            </View>

            <Footer/>  

            

        </View>
    );
}



const windowHeight = Dimensions.get('window').height ;
const windowWidth = Dimensions.get('window').width ;

const styles = StyleSheet.create({
    container:{
        width:windowWidth,
        height: windowHeight

    },
    NextPage:{
        flexDirection:'row',
        position:'absolute',
        top:300,
        right:20
    },
    PreviusPage:{
        flexDirection:'row',
        position:'absolute',
        top:300,
        left:20
    },
    swiper:{
        //backgroundColor: colors.background_2,
        backgroundColor:'red',
        height: windowHeight* 0.75,
        width:windowWidth,               
    },
    containerSwiper:{
        //borderWidth:3,
        backgroundColor:'white', 
        height:windowHeight*0.7, 
        width:windowWidth*0.90, 
        marginTop:-40,
        padding:30
    },
    containerImg:{
        width:'100%',
        height:'80%',
        //backgroundColor:'pink'
        //justifyContent:'center',
        alignItems:'center'
    }
    
    ,Img:{
        height:'95%',
        width:'80%',
        marginLeft:10,
        marginRight:5
    },
    h4:{
        fontFamily: 'Lexend_Bold',
        fontWeight: '700',
        fontSize: 17,
        color: colors.base_2
    },
    h6:{
        fontFamily: 'Lexend_Regular',
        fontWeight: '400',
        fontSize: 13,
        color: '#000000',
        color: colors.base_2
    }
})