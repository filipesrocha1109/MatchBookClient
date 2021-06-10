import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";
import Feather from "react-native-vector-icons/Feather";
import { useIsDrawerOpen } from '@react-navigation/drawer';
import { DrawerActions   } from '@react-navigation/native';


import colors from '../../public/globalColors'
import { H1 } from "../componentText/text";
 
export default function Header( props ) {

    const isDrawerOpen = useIsDrawerOpen();

    var navigation = props.navigation;   
    var menu = props.menu;

    return (
        <View style={styles.Container}>
            <H1 
                msg="MatchBook" 
                stl={{
                    color: colors.background_2,
                    fontSize:25,
                }}             
            />
            { menu ?
                <Feather
                    name="menu"
                    size={30}
                    color={colors.background_2}
                    style={styles.menu}
                    onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                    
                />
            :
            <Text style={[{position: 'absolute'}]}></Text>
            }
        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
        backgroundColor: colors.primary_2,
        alignItems: "center",
        justifyContent: "center",
        height : 70,
        marginTop: 25
        
    },
    menu:{
        position: 'absolute',
        right: 10
    }
});
