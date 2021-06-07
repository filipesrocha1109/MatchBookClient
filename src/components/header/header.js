import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";

import colors from '../../public/globalColors'
import { H1 } from "../componentText/text";
 
export default function Header({ navigation }) {

    return (
        <View style={styles.Container}>
            <H1 
                msg="MatchBook" 
                stl={{
                    color: colors.background_2,
                    fontSize:25,
                }}             
            />
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
});
