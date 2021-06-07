import React, { useState } from "react";
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { useFonts } from 'expo-font';

import Routes from './src/routes/routes'


//const fetchFont = () => {
//    return Font.loadAsync({
//        'Lexend_Bold': require('./assets/fonts/Lexend Bold.ttf'),
//        'Lexend_ExtraBold': require('./assets/fonts/Lexend ExtraBold.ttf'),
//        'Lexend_Light': require('./assets/fonts/Lexend Light.ttf'),  
//        'Lexend_Medium': require('./assets/fonts/Lexend Medium.ttf'),
//        'Lexend_Regular': require('./assets/fonts/Lexend Regular.ttf'),
//        'Lexend_SemiBold': require('./assets/fonts/Lexend SemiBold.ttf'),
//        'Lexend_Thin': require('./assets/fonts/Lexend Thin.ttf'),
//        'font_test': require('./assets/fonts/KdamThmor-Regular.ttf'),
//
//    });
//};

export default function App() {

    let [fontsLoaded] = useFonts({

        'Lexend_Bold': require('./assets/fonts/Lexend_Bold.ttf'),
        'Lexend_ExtraBold': require('./assets/fonts/Lexend_ExtraBold.ttf'),
        'Lexend_Light': require('./assets/fonts/Lexend_Light.ttf'),  
        'Lexend_Medium': require('./assets/fonts/Lexend_Medium.ttf'),
        'Lexend_Regular': require('./assets/fonts/Lexend_Regular.ttf'),
        'Lexend_SemiBold': require('./assets/fonts/Lexend_SemiBold.ttf'),
        'Lexend_Thin': require('./assets/fonts/Lexend_Thin.ttf'),
        'font_test': require('./assets/fonts/KdamThmor-Regular.ttf'),

    });

    if (!fontsLoaded) {
        return <AppLoading />;
    } 
    else {

        return (
            <Routes/>
        );
    }
}


