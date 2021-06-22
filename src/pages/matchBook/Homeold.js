import React, { useState, useEffect, useRef, createRef } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, ScrollView  } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";
import ListBook from '../matchBook/ListBook'

import Header from '../../components/header/header';

export default function Home({ navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");

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

    

    
    const width = Dimensions.get('window').width ;
    
    const NextPage = (index) => {
        console.log(scrollviewRef);

        scrollviewRef.current.scrollTo({
            x: index * width,
            animation: false
        })
        
    }

    const PreviusPage = (index) => {
        console.log(scrollviewRef);

        scrollviewRef.current.scrollTo({
            x: index / width,
            animation: false
        })
        
    }

    const position = (event) =>{

        console.log(event)
    };

    /*
    <TouchableOpacity
        onPress={() => NextPage(2)}
    >   
    </TouchableOpacity>
    <TouchableOpacity
    onPress={() => PreviusPage(2)}
    >   
    </TouchableOpacity>
    */

    
    const list = [ 'Page 1', 'Page 2', 'Page 3', 'Page 4', 'Page 5'];

    return (
        <View >
            <Header
                navigation = { navigation }
                menu = {true}
            />
                <TouchableOpacity
                style={styles.PreviusPage} 
                onPress={() => PreviusPage} 
                >
                    <IconAntDesign
                        name={'leftcircleo'}
                        color={'red'}
                        size={30}
                        
                   />
                </TouchableOpacity>


            <TouchableOpacity
                onPress={() => NextPage} 
                style={styles.NextPage} 
            >
                <IconAntDesign
                    name={'rightcircleo'}
                    color={'green'}
                    size={30}
                />
            </TouchableOpacity>
            <ScrollView
                ref={scrollviewRef}
                horizontal={true}
                pagingEnabled={true}
  
                onMomentumScrollBegin={event => { 
                    position(event.nativeEvent.layoutMeasurement)

                  }}
            >
                {
                    list.map((currElement, index) => {
                        return(
                            <ListBook
                                element={currElement}
                                index={index+1}
                                key={index+1}
                            />
                        );
                    })
                
                }

                
            </ScrollView>


            
            <Footer/>         
        </View>
    );
}




const windowHeight = Dimensions.get('window').height ;
const windowWidth = Dimensions.get('window').width ;

const styles = StyleSheet.create({
    Macth:{
        width:windowWidth,
        height: windowHeight * 0.75,
        //backgroundColor: 'red',
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
        position:'absolute' ,
        alignSelf: 'flex-end', 
        marginTop:300, 
        right:15, 
        zIndex:3333

    },
    PreviusPage:{
        position:'absolute',
        alignSelf: 'flex-start', 
        marginTop:70, 
        left:15,
        zIndex:3333
    }
})