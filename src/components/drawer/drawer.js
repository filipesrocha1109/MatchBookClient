import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions, Text, TouchableOpacity   } from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';
import colors from '../../public/globalColors'
import { color } from 'react-native-reanimated';

export default function DrawerContent(props) {
	const {navigation} = props;


	return (
		<DrawerContentScrollView  style={styles.drawerContent}>

			<View style={styles.top}>	

				<Text
					style={[styles.item,{marginTop: -5}]}
					onPress={() => navigation.navigate('Matchbook', { screen: 'Home' })}
				>
					Home
				</Text>				
				<Text
					style={styles.item}
					onPress={() => navigation.navigate('Matchbook', { screen: 'MyBooks' })}
				>
					Meus Livros
				</Text>
			
				<Text
					style={styles.item}
					onPress={() => navigation.navigate('Matchbook', { screen: 'MyMatchs' })}
				>
					Meus "Matchs"
				</Text>
				<Text
					style={styles.item}
					onPress={() => navigation.navigate('Matchbook', { screen: 'Preferencia' })}
				>
					Preferências
				</Text>
				<Text
					style={styles.item}
					onPress={() => navigation.navigate('Login', { screen: 'Login' })}
				>
					Logout
				</Text>
			</View>

		</DrawerContentScrollView >
	);
};

let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width; 

const styles = StyleSheet.create({
	drawerContent: {
		//flex: 1,
		backgroundColor: colors.base_2,
		
	},
	item:{
		height:30,
		//backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5,
		paddingLeft:40,
		color: colors.background_2
		
	},top:{
		height:heightScreen  * 0.85,
		
	},
	footer:{
		backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5
	},

});