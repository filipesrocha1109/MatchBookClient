import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Alert,Image, Dimensions, TouchableOpacity, ScrollView , CheckBox } from "react-native";
import IconAntDesign from "react-native-vector-icons/AntDesign";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ButtonOutlinedE, ButtonSolidE } from "../../components/componentButtons/button";
import { H1, H2, H3, H4, H5, H6 } from "../../components/componentText/text";
import { Picker } from '@react-native-picker/picker';

import Footer from "../../components/footer/footer";
import colors from '../../public/globalColors'

import Header from '../../components/header/header';
import Global from "../../public/Global";

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [cidade, setCidade] = useState("");
    const [facebook, setFacebook] = useState("");
    const [instagram, setInstagram] = useState("");
    const [checkFacebook, setCheckFacebook] = useState(false);
    const [checkInstagram, setCheckInstagram] = useState(false);
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorName, setErrorName] = useState(false);
    const [errorPassword, setErrorPassword] = useState(false);
    const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
    const [erros, setErros] = useState("");
    const cidades = Global.cidades;
    //const cidades = ["viamão","Porto Alegre"];

    const Create = () => {

        if(Validate()){
            fetch(Global.ServerIP + "/register", {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userName: email,
                    name: name,
                    email: email,
                    password: password,
                    city : "Porto Alegre"
                }),
            })
                .then((response) => response.text())
                .then((responseText) => {
                    responseText = JSON.parse(responseText);
                    if (responseText.success) {
                        CreateConfig(responseText.data.token);
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

    const CreateConfig = (value) => {

        fetch(Global.ServerIP + "/profile", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization:  "Bearer " + value
            },
            body: JSON.stringify({               
                socialMediaI : "instagram",
                userSocialI: instagram,
                visibleI: checkInstagram,
                socialMediaF : "facebook",
                userSocialF: facebook,
                visibleF: checkFacebook
            }),
            
        })
            .then((response) => response.text())
            .then((responseText) => {
                responseText = JSON.parse(responseText);
                if (responseText.success) {

                    console.log(responseText)

                    navigation.navigate("Login");
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
    
    

    const Validate = () =>{
        var resp = false;

        if(name && email && password && confirmPassword){

            if(password == confirmPassword) {
                resp = true;
            }else{
                if(!name){setErrorName(true)}else{setErrorName(false)};
                if(!email){setErrorEmail(true)}else{setErrorEmail(false)};
                if(!password){setErrorPassword(true)}else{setErrorPassword(false)};
                if(!confirmPassword){setErrorConfirmPassword(true)}else{setErrorConfirmPassword(false)};
                setErrorPassword(true);
                setErrorConfirmPassword(true);

            }
            
        }else{
            if(!name){setErrorName(true)}else{setErrorName(false)};
            if(!email){setErrorEmail(true)}else{setErrorEmail(false)};
            if(!password){setErrorPassword(true)}else{setErrorPassword(false)};
            if(!confirmPassword){setErrorConfirmPassword(true)}else{setErrorConfirmPassword(false)};
            if(password != confirmPassword) {
                setErrorPassword(true);
                setErrorConfirmPassword(true);
            }
        }

        return resp
        
    }


    return (
        <View style={styles.ContainerAll}>
            <Header/>
            <View style={styles.Container}>
                <H5
                    msg={"Cadastre-se grátis e comece a curtir muitos livros."}    
                    stl = {{
                        marginTop: 10,
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
                        msg={"Qual o seu Nome?"}
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
                        msg={"Qual o seu e-mail?"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        },errorEmail ? {color:'red'} : ""]}
                    />
                    
                    <TextInput
                        style={[styles.Input, errorEmail ? {borderColor:'red'} : ""]}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />

                    <H6
                        msg={"Qual sua senha?"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        },errorPassword ? {color:'red'} : ""]}
                    />
                    
                    <TextInput
                        style={[styles.Input, errorPassword ? {borderColor:'red'} : ""]}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        secureTextEntry={true}
                    />


                    <H6
                        msg={"Confirme sua senha"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        },errorConfirmPassword ? {color:'red'} : ""]}
                    />
                    
                    <TextInput
                        style={[styles.Input, errorConfirmPassword ? {borderColor:'red'} : ""]}
                        onChangeText={(text) => setConfirmPassword(text)}
                        value={confirmPassword}
                        secureTextEntry={true}
                    />


                    <H6
                        msg={"Em qual cidade você está?"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        }]}
                    />
                    

                    <TouchableOpacity style={ styles.Input }>
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

                    <H6
                        msg={"Informar conta no Facebook"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        }]}
                    />
                    
                    <TextInput
                        style={[styles.Input]}
                        onChangeText={(text) => setFacebook(text)}
                        value={facebook}
                    
                    />

                    <H6
                        msg={"Informar conta no Instagram"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:5,
                            width:'80%',
                            textAlign:'left',
                        }]}
                    />
                    
                    <TextInput
                        style={[styles.Input]}
                        onChangeText={(text) => setInstagram(text)}
                        value={instagram}
                    
                    />

                    <H6
                        msg={"Exibir no meu perfil público:"}
                        stl = {[{
                            marginTop: 10,
                            marginBottom:15,
                            width:'80%',
                            textAlign:'left',
                        }]}
                    />

                    <View>
                        <View style={styles.checkbox}>
                        <CheckBox

                            value={checkFacebook}
                            onValueChange={setCheckFacebook}
                            
                        />
                            
                            <H6
                                msg={"Facebook"}
                                stl = {[{color : colors.base_2,marginTop: 7}]}
                            /> 
                        </View>
                        <View style={styles.checkbox}>
                            <CheckBox
                                value={checkInstagram}
                                onValueChange={setCheckInstagram}
                            />
                            <H6
                                msg={"Instagram"}
                                stl = {[{color : colors.base_2,marginTop: 7}]}
                            /> 
                        </View>
                    </View>
                    

                    <TouchableOpacity
                        onPress={Create}
                        style={{alignItems:'center', marginLeft:'-10%', marginBottom:15}}
                    >
                        <ButtonOutlinedE
                            msg={"Cadastrar-se no MatchBook"}
                            stl={{marginTop:20, fontSize:15,}}                        
                        />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[{display:'flex',flexDirection:'row', paddingLeft:40}]}
                        onPress={()=> navigation.navigate('Login')}
                    >
                        <H4
                            msg={"Já tem uma conta?"}
                            stl={{marginBottom:20, fontSize:15,}}    
                        />
                        <H4
                            msg={" Faça login."}
                            stl={{color: colors.secondary_2, fontSize:15, }}  
                            
                        />

                    </TouchableOpacity>
                    
            
                
            </ScrollView>
            </View>
            <Footer/>
        </View>
    );
}

const windowHeight = Dimensions.get('window').height * 0.75;

const widthScreen = Dimensions.get('window').width;


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
    },checkbox:{
        display:'flex',
        flexDirection:'row',
        marginBottom: 5
        
    },    
    selectCidade: {
        width: widthScreen * 0.83,
        marginLeft:0,
        backgroundColor: "#E5E5E5",
        borderRadius: 5,
        height: 50,
        color: "black",
        paddingLeft: 10
        
    },
});
