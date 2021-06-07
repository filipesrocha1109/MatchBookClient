import React, { useState, useEffect } from "react";
import { StyleSheet, TextInput, Text, View, Image } from "react-native";

import colors from '../../public/globalColors'

 
export default function Footer({ navigation }) {

    return (
        <View style={styles.Container}>
        </View>
    );
}

const styles = StyleSheet.create({

    Container: {
        backgroundColor: colors.primary_1,
        height : 70,       
    },
});
