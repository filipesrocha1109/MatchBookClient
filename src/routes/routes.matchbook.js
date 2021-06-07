import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from '../pages/matchBook/Home' 


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
            </Stack.Navigator>
    );
}

