import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, TouchableOpacity  } from "react-native";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'
import Global from '../../public/Global'
import AsyncStorage from "@react-native-async-storage/async-storage";


import Header from '../../components/header/header';

export default function Login({ navigation }) {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [outro, setOutro] = useState("kjdslfjdsklfj");
    const [erros, setErros] = useState("");

    // storeData String
    const StoreData = async (value, name) => {
        try {
            await AsyncStorage.setItem("@" + name, value);
        } catch (e) {
            console.log(e);
        }
    };

    const newBook = (token) => {

        fetch(Global.ServerIP + "/haveBooks", {
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
                        navigation.navigate('Matchbook', { screen: 'Home' })
                    }else{
                        navigation.navigate("Config");
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


    const Login = () => {      
        if (user && password) {
            fetch(Global.ServerIP + "/login", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    //Authorization: Global.Authorization + token
                },
                body: JSON.stringify({
                    user: user,
                    password: password,
                }),
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        StoreData(
                            responseText.data.id.toString(),
                            "registration_id"
                        );
                        StoreData(
                            responseText.data.token,
                            "registration_token"
                        );
                        //console.log(responseText.data.id)
                        //console.log(responseText.data.token)
                        //navigation.navigate("Matchbook");
                        newBook(responseText.data.token)
                    } 
                    else 
                    {
                        setErros(responseText.message);
                        Alert.alert(
                            erros,
                            "Enter a valid username and password!"
                        );
                    }
                
                })
                .catch((error) => {
                    console.error(error);
                });
        } else {
            setErros("Invalid username or password");
            Alert.alert(erros, "Enter a valid username and password!");
        }

    };

    return (
        <View style={styles.ContainerAll}>
            <Header
                navigation = { navigation }
                menu = {false}
            />
            <View style={styles.Container}>
                
                <H3
                    msg={"Faça seu Login:"}    
                    stl = {{
                        marginTop: 40,
                        marginBottom:20
                    }}
                />
                <View
                    style={{textAlign: 'left',width:'100%',paddingStart:'20%',marginBottom:5}}
                >
                    <H5
                    msg={"E-mail ou nome de usuário"}
                />

                </View>

                
                <TextInput
                    style={styles.Input}
                    onChangeText={(text) => setUser(text)}
                    value={user}
                />
                <View
                    style={{textAlign: 'left',width:'100%',paddingStart:'20%',marginBottom:5,marginTop:10}}
                >
                <H5
                    msg={"Senha"}
                />
                </View>
                <TextInput
                    style={styles.Input}
                    onChangeText={(text) => setPassword(text)}
                    value={password}
                    secureTextEntry={true}
                />
                <TouchableOpacity
                    onPress={Login}
                >
                    <ButtonSolidE
                        msg={"Entrar"}
                        stl={{marginTop:20, fontSize:20}}                        
                    />
                </TouchableOpacity>
                
                <H6
                    msg={"Esqueceu sua senha ?"}
                    stl={{color: colors.secondary_2, fontSize:18, marginTop:15}}
                />
                
                <H6
                    msg={"Não tem uma conta ?"}
                    stl={{color: colors.secondary_2, fontSize:18, marginTop:15}}

                />

                <TouchableOpacity
                    onPress={() => navigation.navigate("Create")}
                >
                <ButtonOutlinedE
                    msg={"Cadastrar-se no MatchBook"}
                    stl={{ marginTop:10}}
                />
                </TouchableOpacity>
                

            </View>
            <Footer/>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height * 0.75;

const styles = StyleSheet.create({
    Input: {
        height: 50,
        width: "85%",
        backgroundColor: "#ffff",
        borderRadius: 25,
        color: "#2C3382",
        paddingLeft: 50,
        borderWidth: 1,
        borderColor: "#20232a",
    },
    Titulo: {
        fontSize: 30,
        textAlign: "center",
        
    },
    Button: {
        backgroundColor: "#1F9BE2",
        borderRadius: 5,
        height: 40,
        width: "85%",
        textAlign: "center",
        color: "#FFFFFF",
        fontSize: 20,
        marginTop: 15,
        paddingTop: 6,
        fontWeight: "bold",
        fontFamily: "Roboto",
    },
    Error: {
        backgroundColor: "red",
        color: "white",
        textAlign: "center",
        marginBottom: 20,
        fontSize: 20,
        padding: 5,
    },
    Container: {
        backgroundColor: "#ffff",
        alignItems: "center",
        height:windowHeight,
        
    },
    ForgotPasswor: {
        color: "black",
        textAlign: "center",
        marginTop: 7,
    },
    imageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: "stretch",
        alignItems: "center",
    },
    IconUser: {
        position: "absolute",
        top: 201,
        left: 45,
        zIndex: 3,
    },
    IconLogo: {
        top: 40,
        marginBottom: 50,
        height:120,
        width:190
    },
    IconPassword: {
        position: "absolute",
        top: 266,
        left: 45,
        zIndex: 4,
    },
});
