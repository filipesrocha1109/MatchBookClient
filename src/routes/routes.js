import * as React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer'


import Login from '../screens/login'
import CustomDrawer from '../components/drawer/drawer.js'
import Matchbook from '../screens/matchBook'

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Login"  
                
                drawerStyle={{width: 250 }}
                drawerContent={(props) => <CustomDrawer {...props} />}            
            >               
                
                <Drawer.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Logout',
                        swipeEnabled: true,
                        
                    }}
                    labelStyle={{
                        fontSize:18,
                        fontWeight:'bold'
                    }}
                />       
                <Drawer.Screen
                    name="Matchbook"
                    component={Matchbook}
                    options={{
                        swipeEnabled: true,
                        
                    }}
                    labelStyle={{
                        fontSize:18,
                        fontWeight:'bold'
                    }}
                />                                                  
            </Drawer.Navigator>
        </NavigationContainer>
    );
}