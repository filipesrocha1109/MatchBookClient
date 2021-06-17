import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../pages/matchBook/Home' 

import MyBooks from "../pages/book/MyBooks";

import MyMatchs from "../pages/book/MyMatchs";

import ShowBook from "../pages/book/ShowBook";

import Preferencia from "../pages/users/Preferencias";


const Stack = createStackNavigator();

export default function RoutesMatchBook() {
    return (
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen
                    name="Home"
                    component={Home}                   
                    options={{
                        title: "Home",
                        headerShown:false,                      
                    }}
                />  
                <Stack.Screen
                    name="MyBooks"
                    component={MyBooks}                   
                    options={{
                        title: "MyBooks",
                        headerShown:false,                      
                    }}
                />  
                <Stack.Screen
                    name="MyMatchs"
                    component={MyMatchs}                   
                    options={{
                        title: "MyMatchs",
                        headerShown:false,                      
                    }}
                />  
                <Stack.Screen
                    name="ShowBook"
                    component={ShowBook}                   
                    options={{
                        title: "ShowBook",
                        headerShown:false,                      
                    }}
                /> 
                <Stack.Screen
                    name="Preferencia"
                    component={Preferencia}                   
                    options={{
                        title: "Preferencia",
                        headerShown:false,                      
                    }}
                />           
            </Stack.Navigator>
    );
}

