import * as React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Image} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator, DrawerItems } from '@react-navigation/drawer'
import colors from '../public/globalColors'


import Login from '../screens/login'
import CustomDrawer from '../components/drawer/drawer.js'
import Matchbook from '../screens/matchBook'

const Drawer = createDrawerNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <Drawer.Navigator 
                initialRouteName="Matchbook"  
                
                drawerStyle={{width: 200, height:240, borderRadius:15, borderColor:colors.base_2, borderWidth:5, marginTop:50 }}
                drawerContent={(props) => <CustomDrawer {...props} />}      
                drawerPosition={'right'}      
            >               
                
                <Drawer.Screen
                    name="Login"
                    component={Login}
                    options={{
                        title: 'Logout',
                        swipeEnabled: false,
                        
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