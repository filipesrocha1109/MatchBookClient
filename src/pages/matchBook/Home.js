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
import Modal from 'react-native-modal'

import Header from '../../components/header/header';
import { set } from "react-native-reanimated";

export default function Home({ navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");
    const [ cardIndex, setcardIndex] = useState("");
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [ visible, setVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
          getData();
        });
        return unsubscribe;
      }, [navigation]);

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
                getBooks(registration_token)




            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };


    const getBooks = (token) =>{
        
        fetch(Global.ServerIP + "/home", {
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
                    if(responseText.data){

                        setBooks(responseText.data)
                        //console.log(responseText.data)

                        var arr = responseText.data;

                        if(arr.length != 0){
                            setLoading(false)
                        }

                    }else{
                        Alert.alert(
                            "Deu chabu", "error"                      
                        );
                    }
                } 
                else 
                {
                    setErros(responseText.message);
                    Alert.alert(
                        "Deu chabu1", "error"                      
                    );
                }
                
            })
            .catch((error) => {
                console.error(error);
            });


    }
    const matchOn = (value) =>{

        fetch(Global.ServerIP + "/home", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + registrationToken
            },
            body: JSON.stringify({
                book_id : books[value].id,
                liked : true,
                user_id : books[value].user_id

            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {                

                    if(responseText.data.Match){
                        setVisible(true);

                        setTimeout(function() {
                            setVisible(false);
                        }, 2000)
                    }
                    
                    if(value == books.length-1){
                        setLoading(true)
                    }
                    
                } 
                else 
                {
                    setErros(responseText.message);
                    Alert.alert(
                        "Deu chabu1", "error"                      
                    );
                }
                
            })
            .catch((error) => {
                console.error(error);
            });
        

    };
    const matchOff = (value) =>{

        console.log(books[value])
        
        fetch(Global.ServerIP + "/home", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + registrationToken
            },
            body: JSON.stringify({
                book_id : books[value].id,
                liked : false,
                user_id : books[value].user_id

            }),
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText)
                if(responseText.success){

                    if(value == books.length-1){
                        setLoading(true)
                    }

                }
                
            })
            .catch((error) => {
                console.error(error);
            });
        

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
            <View >
                <Modal
                    isVisible={visible}
                    animationType ='slide'
                    
                >
                    <View
                        style={styles.containerModal}
                    >                  
                        <Image
                            source={require('../../assets/check.png')}
                            style={{width:155,height:160}}
                        />
                        <Text
                            style={styles.textMatchModal}
                        >
                            Match
                        </Text>
                    </View>
                </Modal>             
            </View>






            {
                loading 
                
                ? 
                
                    <View style={styles.notFound}>
                        <Text style={styles.notFoundText}>

                            SEM LIVROS
                        
                        </Text>


                    </View>
                :

                <Swiper
                    ref={deck}
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
                                        source={{ uri: card.photo }}
                                    />
                                </View>
                                <View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Título: </Text>
                                        <Text style={styles.h4} >{card.book}</Text>
                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Genêro: </Text>
                                        <Text style={styles.h4} >{card.category}</Text>
                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Autor: </Text>
                                        <Text style={styles.h4} >{card.author}</Text>

                                    </View>
                                    <View style={{display:'flex',flexDirection:'row',alignItems:'center', marginTop:2}}>
                                        <Text style={styles.h6} >Localização: </Text>
                                        <Text style={styles.h4} >{card.city}</Text>                                       
                                    </View>                                                                           
                                </View>                                                            
                            </View>
                        )
                    }}
                    
                />  

            }
            

            </View>
            
            
            {

                loading ?

                <View/>

                :
                <>

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
                </>
            }

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
        //backgroundColor:'red',
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
    },
    notFound:{
        justifyContent:'center',
        alignContent:'center',
        alignItems:'center',
        //backgroundColor: 'red',
        height: '100%'
    },
    notFoundText:{
        color:'#9E0E0E',
        fontSize:40
    },
    containerModal:{
        backgroundColor:'#CECECE', 
        height:250,
        marginBottom:60,
        borderRadius:20,
        padding:20,
        alignItems:'center',
        justifyContent:'center'

    },
    textMatchModal:{
        fontSize:35,
        fontWeight:'bold',
        color:'white',
        marginLeft:-5

    }

})