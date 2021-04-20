import React from 'react';
import { View, StyleSheet, SafeAreaView, Image, Dimensions   } from 'react-native';
import IconAntDesign from "react-native-vector-icons/AntDesign";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { DrawerItem,DrawerContentScrollView } from '@react-navigation/drawer';

export default function DrawerContent(props) {
	const {navigation} = props;


	return (
		<DrawerContentScrollView  style={styles.drawerContent}>

			<View style={styles.top}>	
				<View style={styles.logo}>
				<Image
					style={styles.IconLogo}
					source={require('../../assets/logo.png')}
            	/>
				</View>
				<IconAntDesign
					name="home"
					size={20}
					color="black"
					style={styles.IconHome}
            	/>

				<DrawerItem
					style={styles.item}
					label="Home"
					onPress={() => navigation.navigate('Home')}
				/>
				<IconAntDesign
					name="user"
					size={20}
					color="black"
					style={styles.IconUser}
            	/>
				<DrawerItem
					style={styles.item}
					label="User"
					onPress={() => navigation.navigate('User')}
				/>

				

			</View>
				<MaterialIcons
						name="exit-to-app"
						size={20}
						color="black"
						style={styles.IconBack}
					/>
			
			<View style={styles.footer}>
				
				<DrawerItem
					style={styles.lasItem}
					label="Logout"
					
				/>
			</View>

		</DrawerContentScrollView >
	);
};

let heightScreen = Dimensions.get('window').height;
let widthScreen = Dimensions.get('window').width; 

const styles = StyleSheet.create({
	drawerContent: {
		flex: 1,
		
	},
	logo:{
		height: 200,
		//backgroundColor: 'blue'
	},
	item:{
		height:50,
		backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5,
		paddingLeft:40
	},top:{
		height:heightScreen  * 0.85,
		
	},
	footer:{
		backgroundColor: '#E5E5E5',
		margin:5,
		borderRadius:5
	},
	IconLogo: {
        top: 40,
        marginBottom: 50,
        height:120,
        width:190,
		marginLeft:30
    },
	IconHome: {
        position: "absolute",
        top: 218,
        left: 25,
        zIndex: 3,
    },
	IconUser: {
        position: "absolute",
        top: 274,
        left: 25,
        zIndex: 3,
    },
	IconBack: {
        position: "absolute",
        top: heightScreen * 0.93,
        left: 25,
        zIndex: 99,
    },
	lasItem:{
		paddingLeft:40
	}

});