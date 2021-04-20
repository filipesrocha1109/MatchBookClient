import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Login from '../pages/login/login' 

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
            </Stack.Navigator>
    );
}

