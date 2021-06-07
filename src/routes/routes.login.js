import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../pages/login/login' 
import Create from '../pages/users/create'
import Config from '../pages/users/createConfig'

const Stack = createStackNavigator();

export default function RoutesUser() {
    return (
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen
                    name="Login"
                    component={Login}                   
                    options={{
                        title: "Login",
                        headerShown:false,                      
                    }}
                />  
                <Stack.Screen
                    name="Create"
                    component={Create}                   
                    options={{
                        title: "Create",
                        headerShown:false,                      
                    }}
                />   
                <Stack.Screen
                    name="Config"
                    component={Config}                   
                    options={{
                        title: "Create",
                        headerShown:false,                      
                    }}
                />          
            </Stack.Navigator>
    );
}

