import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, TouchableOpacity, ScrollView  } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H3, H4, H5, H6 } from "../../components/componentText/text";
import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Picker } from '@react-native-picker/picker';
import AntDesign  from "react-native-vector-icons/AntDesign";
import * as ImagePicker from 'expo-image-picker';


import AsyncStorage from "@react-native-async-storage/async-storage";

import Header from '../../components/header/header';
import Global from "../../public/Global";

export default function Login({ navigation }) {
    const [genero, setGenero] = useState("");
    const [name, setName] = useState("");
    const [autor, setAutor] = useState("");
    const [errorGenero, setErrorGenero] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorAutor, setErrorAutor] = useState(false);
    const [registrationId, setRegistrationId] = useState("");
    const [registrationToken, setRegistrationToken] = useState("");
    const [localUri, setLocalUri] = useState("");
    const [filename, setFilename] = useState("");
    const [typeImg, setTypeImg] = useState("");
    const generos = Global.generos;
   

    const [erros, setErros] = useState("");

    useEffect(() => {
        getData();
        (async () => {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }         
        })();            
      }, []);


    const Validate = () =>{
        var resp = false;

        if(name && genero && autor ){

            resp = true

        }else{
            if(!name){setErrorName(true)}else{setErrorName(false)};
            if(!genero){setErrorGenero(true)}else{setErrorGenero(false)};
            if(!autor){setErrorAutor(true)}else{setErrorAutor(false)};
        }

        return resp
        
    }


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
                //newBook(registration_token)
            } else {
                //() => navigation.navigate("Login");
            }
        } catch (e) {
            Alert.alert(e);
        }
    };



    const Create = () => {

        if(Validate()){
            fetch(Global.ServerIP + "/book", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization:  "Bearer " + registrationToken
                },
                body: JSON.stringify({
                    
                    name: name,
                    author: autor,
                    category: genero
                }),
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {

                        var bookID = responseText.data

                        if(localUri && filename && typeImg){
                            
                            SendImage(bookID[0]);
                            //console.log('call sendImage')
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

    };

    const SendImage = ( bookID ) =>{

        var photo = {
            uri: localUri,
            type: 'image/jpeg',
            name: filename,
          };
          
          var formData = new FormData();
          formData.append("file", photo);
        
        fetch(Global.ServerIP + "/photos?book_id=" + bookID, {
            method: "POST",
            headers: {
                'content-type': 'multipart/form-data',
                Authorization:  "Bearer " + registrationToken
            },
            body: formData,
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {

                    //console.log(responseText)
                    navigation.navigate('Matchbook', { screen: 'Home' })
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

    };



    async function takeAndUploadPhotoAsync() {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            //allowsEditing: true,
            //aspect: [1, 1],
            quality: 1,
          });
      
        if (!result.cancelled) {
            // ImagePicker salva a foto tirada no disco e retorna um URI local para ela
            let parseLocalUri = result.uri;
            
            let resFilename = parseLocalUri.split('/');

            let parseFilename = resFilename[resFilename.length -1]
        
            // Inferir o tipo de imagem
            let match = /\.(\w+)$/.exec(filename);
            let parseType = match ? `image/${match[1]}` : `image`;

            setLocalUri(parseLocalUri);
            setFilename(parseFilename);
            setTypeImg(parseType); 

            //console.log("parseLocalUri: " + parseLocalUri)
            //console.log("parseFilename: " + parseFilename)
            //console.log("parseType: " + parseType)
        }
      
    }


    return (
        <View style={styles.ContainerAll}>
            <Header/>
            <KeyboardAwareScrollView keyboardShouldPersistTaps="padding"
            style={{ backgroundColor: 'white' }}
            contentContainerStyle={{
                flexGrow: 1
            }}>
    
                <View style={styles.Container}>

                    <H3
                        msg={"Configure seu perfil para explorar o catálogo de livros."}    
                        stl = {{
                            marginTop: 15,
                            marginBottom:20,
                            width:'80%',
                            textAlign:'center',
                            
                        }}
                    />

                    <ScrollView 
                        style={styles.scroll}
                        keyboardShouldPersistTaps='always'
                    >     

                        <H6
                            msg={"Qual é o titulo do livro?"}
                            stl = {[{
                                marginTop: 10,
                                marginBottom:5,
                                width:'80%',
                                textAlign:'left',
                            },errorName ? {color:'red'} : ""]}
                        />
                        
                        <TextInput
                            style={[styles.Input, errorName ? {borderColor:'red'} : ""]}
                            onChangeText={(text) => setName(text)}
                            value={name}
                            
                        />

                        <H6
                            msg={"Qual é o genêro do livro?"}
                            stl = {[{
                                marginTop: 10,
                                marginBottom:5,
                                width:'80%',
                                textAlign:'left',
                            },errorGenero ? {color:'red'} : ""]}
                        />

                        <TouchableOpacity style={ styles.Input }>
                            <Picker
                                selectedValue={genero}
                                style={styles.Input}
                                onValueChange={(itemValue) => 
                                setGenero(itemValue)}                      
                            >
                                <Picker.Item label={"Selecione o genêro"} value={""} key={""}/>
                                
                                {
                                    generos.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index}/>) 
                                    })
                                }

                                <Picker.Item label={"Outro genero"} value={"NF"} key={"NF"}/> 
                            </Picker>
                        </TouchableOpacity> 

                        <H6
                            msg={"Qual o nome do autor do livro?"}
                            stl = {[{
                                marginTop: 10,
                                marginBottom:5,
                                width:'80%',
                                textAlign:'left',
                            },errorAutor ? {color:'red'} : ""]}
                        />
                        
                        <TextInput
                            style={[styles.Input, errorAutor ? {borderColor:'red'} : ""]}
                            onChangeText={(text) => setAutor(text)}
                            value={autor}

                        />

                        <View style={{flexDirection: "row",}}>
                            <H6
                                msg={"Adicionar a capa do livro."}
                                stl = {[{
                                    marginTop: 40,
                                    marginBottom:5,
                                    width:'80%',
                                    textAlign:'left',
                                }]}
                            />

                            <Feather
                                name="upload"
                                size={30}
                                color={colors.primary_3}
                                style={{marginLeft: -70, marginTop:35}}
                                onPress={() => takeAndUploadPhotoAsync()}
                                
                            />

                        </View>
                        
                        <H6
                            msg={filename}
                            stl = {{
                                marginTop: -10,
                                marginBottom:5,
                                width:'50%',
                                textAlign:'left',
                                color: colors.secondary_2
                            }}
                        />
                        <TouchableOpacity
                            onPress={Create}
                            style={{alignItems:'center', marginLeft:'-10%'}}
                        >
                            <ButtonSolidE
                                msg={"Adicionar Livro"}
                                stl={{marginTop:20, fontSize:20,width: 220,textAlign:'center'}}                        
                            />
                        </TouchableOpacity>

                    </ScrollView>
                </View>
            </KeyboardAwareScrollView>
            <Footer/>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height * 0.75;


const styles = StyleSheet.create({
    scroll:{
        width:'100%',
        paddingLeft:'10%',
        
        
    },
    Input: {
        height: 40,
        width: "85%",
        backgroundColor: "#ffff",
        borderRadius: 25,
        color: "#2C3382",
        paddingLeft: 20,
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
    Input: {
        height: 40,
        width: "85%",
        backgroundColor: "#ffff",
        borderRadius: 25,
        color: "#2C3382",
        paddingLeft: 20,
        borderWidth: 1,
        borderColor: "#20232a",
    },
});
