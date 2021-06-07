import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, TouchableOpacity  } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/header/header';

export default function Home({ navigation }) {

    const [ registrationId, setRegistrationId] = useState("");
    const [ registrationToken, setRegistrationToken] = useState("");

    useEffect(() => {
        
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
            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };
    getData();


    return (
        <View >
           <Text style={{marginTop:30}}>
               id: {registrationId}
           </Text>
           <Text>
               token: {registrationToken}
           </Text>
        </View>
    );
}

