import React, { Component } from "react";
import { StyleSheet, TextInput, View, Text, TouchableOpacity, Platform, Dimensions, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback, Alert } from "react-native";
const axios = require("axios");

import scale from '../../utils/scale';

const parentHeight = 667;
const parentWidth =  375;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
);

export default class Choose extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input1:"",
			input2:"",
			input3:"",
			input4:"",
    };
	}

	computeOutput = async DATASET =>
	{
		if(this.state.input1 == "" || this.state.input2 == "" || this.state.input3 == "" || this.state.input4 == ""){
			if(this.state.input1 == ""){
				Alert.alert("Blue Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input2 == ""){
				Alert.alert("Blue Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input3 == ""){
				Alert.alert("Red Alliance does not have a team inputted", "Please input a team");
			}
			else if(this.state.input4 == ""){
				Alert.alert("Red Alliance does not have a team inputted", "Please input a team");
			}
		}
		else{
			let dat_a1 = await axios(
				`https://api.vexdb.io/v1/get_season_rankings?season=Tower%20Takeover&team=${this.state.input1}`
			);
			let dat_a2 = await axios(
				`https://api.vexdb.io/v1/get_season_rankings?season=Tower%20Takeover&team=${this.state.input2}`
			);
			let dat_a3 = await axios(
				`https://api.vexdb.io/v1/get_season_rankings?season=Tower%20Takeover&team=${this.state.input3}`
			);
			let dat_a4 = await axios(
				`https://api.vexdb.io/v1/get_season_rankings?season=Tower%20Takeover&team=${this.state.input4}`
			);
			console.log(dat_a1.data.result.length)
			if(dat_a1.data.result.length == 0){
				Alert.alert(this.state.input1 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a2.data.result.length == 0){
				Alert.alert(this.state.input2 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a3.data.result.length == 0){
				Alert.alert(this.state.input3 + " is not a valid team", "Please choose a valid team to search");
			}
			else if(dat_a4.data.result.length == 0){
				Alert.alert(this.state.input4 + " is not a valid team", "Please choose a valid team to search");
			}
			if(dat_a1 != undefined && dat_a2 != undefined && dat_a3 != undefined && dat_a4 != undefined){
				let red1Rating = dat_a3.data.result[0].vrating;
				let red2Rating = dat_a4.data.result[0].vrating;
				let blue1Rating = dat_a1.data.result[0].vrating;
				let blue2Rating = dat_a2.data.result[0].vrating;

				this.props.navigation.navigate('Display', {
          red1Rating:red1Rating,
          red2Rating:red2Rating,
          blue1Rating:blue1Rating,
          blue2Rating:blue2Rating,
  				red1Name:this.state.input3,
  				red2Name:this.state.input4,
  				blue1Name:this.state.input1,
  				blue2Name:this.state.input2
				});
			}
		}
	}

	render() {
		return (
			<DismissKeyboard style={{height: scale(667, 1), width:scale(375, 0)}}>
  			<View>
					<View style={styles.matter}>
    				<KeyboardAvoidingView enabled behavior={"position"} keyboardVerticalOffset={-scale(170, 1)}  style={styles.container}>
	    				{/*Blue Alliance*/}
	    				<View style={styles.blueView}></View>
	    				<View style={styles.shiftBlue}>
	    					<Text style={styles.subTitleBlue}>Blue A.E</Text>
	    					<TextInput
	    					style={styles.input}
	    					placeholder="Team Name"
	    					onChangeText={(text) => this.setState({input1: text})}
	    					value={this.state.input1}
	    					/>
	    					<TextInput
	    					style={styles.input}
	    					placeholder="Team Name"
	    					onChangeText={(text) => this.setState({input2: text})}
	    					value={this.state.input2}
	    					/>
	    					<View style={styles.shiftRed}>
	    						<Text style={styles.subTitleRed}>Red A.E</Text>
	    						<TextInput
	    						style={styles.input}
	    						placeholder="Team Name"
	    						onChangeText={(text) => this.setState({input3: text})}
	    						value={this.state.input3}
	    						/>
	    						<TextInput
	    						style={styles.input}
	    						placeholder="Team Name"
	    						onChangeText={(text) => this.setState({input4: text})}
	    						value={this.state.input4}
	    						/>
	    					</View>
	    				</View>
	    				{/*Red Alliance*/}
	    				<View style={styles.redView}></View>
		  			  <TouchableOpacity onPress={this.computeOutput} style={styles.button}>
		  					<Text style={styles.buttonText}>Predict</Text>
		  				</TouchableOpacity>
						</KeyboardAvoidingView>
					</View>
  			</View>
			</DismissKeyboard>
    )
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		height: Dimensions.get('window').height,
		width: Dimensions.get("window").width
	},
	matter: {
		marginTop: scale(100, 1)
	},
	blueView: {
		...Platform.select({
			ios: {
				width: scale(270, 0),
				height: 0,
				borderTopColor: "#42b3f4",
				borderTopWidth: scale(350, 1),
				borderLeftWidth: 0,
				borderRightWidth: scale(140, 0),
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				padding: scale(40, 1),
				marginTop:0,
				marginLeft: scale(-5, 0),
				borderRadius: 20
			},
			android: {
				width: 300,
				height: 0,
				borderTopColor: "#42b3f4",
				borderTopWidth: 280,
				borderLeftWidth: 0,
				borderRightWidth: 230,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: Dimensions.get('window').width/12-30,
				marginTop: 20,
				padding: 40,
				borderRadius: 20,
			},
		  }),
	},
	redView: {
		...Platform.select({
			ios: {
				width: scale(270, 0),
				height: 0,
				borderBottomColor: "#ff4971",
				borderBottomWidth: scale(350, 1),
				borderLeftWidth: scale(140, 0),
				borderRightWidth: 0,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: scale(45, 0),
				marginTop: scale(-410, 1),
				padding: scale(40, 1),
				borderRadius: 20
			},
			android: {
				width: 300,
				height: 0,
				borderBottomColor: "#ff4971",
				borderBottomWidth: 280,
				borderLeftWidth: 230,
				borderRightWidth: 0,
				borderRightColor: 'transparent',
				borderLeftColor: 'transparent',
				marginLeft: Dimensions.get('window').width/12-10,
				marginTop: -330,
				padding: 40,
				borderRadius: 20,
			},
		  }),
	},
	input: {
		backgroundColor: "#efefef",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: scale(10, 1),
		color: "#4c4c4c",
		marginTop: scale(25, 1),
		...Platform.select({
			ios: {
				width: scale(100, 0),
			},
			android: {
				width: 100,
			},
		  }),
	},
	subTitleRed: {
		color: "#efefef",
		fontSize: scale(30, 1),
		fontWeight: '300',
		marginLeft: scale(5, 0)
	},
	subTitleBlue: {
		color: "#efefef",
		fontSize: scale(30, 1),
		fontWeight: '300',
		marginLeft: scale(10, 0)
	},
	shiftBlue: {
		...Platform.select({
			ios: {
				marginTop: scale(-410, 1),
				marginLeft: Dimensions.get('window').width/12-10,
				zIndex: 100
			},
			android: {
				marginTop: -340,
				marginLeft: 15,
				zIndex: 100,
			},
		  }),
	},
	shiftRed: {
		...Platform.select({
			ios: {
				marginTop: scale(0, 1),
				marginLeft: scale(160, 0)
			},
			android: {
				marginTop: -70,
				marginLeft: 195,
			},
		  }),
	},
	button: {
		...Platform.select({
			ios: {
				borderColor: "#474747",
				borderWidth: 2,
				padding: 10,
				borderRadius: 10,
				width: scale(117, 0),
				marginTop: scale(40, 1),
				marginBottom: scale(-40, 1),
				marginLeft: scale(100, 0)
			},
			android: {
				borderColor: "#474747",
				borderWidth: 2,
				padding: 10,
				borderRadius: 10,
				width: 117,
				marginTop: scale(30, 1),
				marginLeft: (Dimensions.get('window').width/2)-65
			},
		  }),
	},
	buttonText: {
		color: "#474747",
		textAlign: "center",
		fontSize: 20
	}
});
