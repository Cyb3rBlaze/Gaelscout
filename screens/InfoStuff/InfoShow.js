import React, { Component } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View, Text, Image, Dimensions, Alert, Keyboard, TouchableWithoutFeedback } from "react-native";
const axios = require("axios");

import scale from '../../utils/scale';

var data = [];

const parentHeight = 667;
const parentWidth =  375;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );

export default class InfoShow extends Component {
	constructor(props) {
		super(props)
		this.state = {
			input:""
        };
	}

	getInfo = async DATASET =>
	{
			let dat_a = await axios(
				`https://api.vexdb.io/v1/get_teams?team=${this.state.input}`
			);
			if(this.state.input == ""){
				Alert.alert("A team has not been inputted", "Please input a team");
			}
			else{
				if(dat_a.data.result.length > 0){
					let teamName = dat_a.data.result[0]["team_name"];
					let organization = dat_a.data.result[0]["organisation"];
					let region = dat_a.data.result[0]["region"];
					let country = dat_a.data.result[0]["country"];
					let city = dat_a.data.result[0]["city"];
					let level = dat_a.data.result[0]["grade"];
					let name = dat_a.data.result[0]["number"];
					this.props.navigation.navigate('TeamInfo', {name:name,teamName:teamName, organization:organization, region:region, country:country, city:city, level:level});
				}
				else{
					Alert.alert(this.state.input + " is not a valid team", "Please choose a valid team to search");
				}
			}
	}

	computeOutput = async DATASET =>
	{
		if(this.state.input == ""){
			Alert.alert("A team has not been inputted", "Please input a team");
		}
		else{
		let dat_a = await axios(
			`https://api.vexdb.io/v1/get_rankings?season=Tower%20Takeover&team=${this.state.input}`
		);
		var ccwm = [];
		var tournaments = [];
		var max_score = [];
		var rank = [];
		let name = this.state.input;

		var lowestRank = 0;
		if(dat_a.data.result.length > 0){
      if(dat_a.data.result.length > 5){
    		for(i = 0; i < dat_a.data.result.length; i++){
    			if(i == 5){
    				break;
    			}
    			if(dat_a.data.result[i]["rank"] > lowestRank){
    				lowestRank = dat_a.data.result[4-i]["rank"];
    			}
    			ccwm.push(dat_a.data.result[4-i]["ccwm"]);
    			tournaments.push("VRC-"+(5-i));
    			max_score.push(dat_a.data.result[4-i]["max_score"]);
    		}
    		for(i = 0; i < dat_a.data.result.length; i++){
    			if(i == 5){
    				break;
    			}
    			rank.push(lowestRank-dat_a.data.result[4-i]["rank"]);
    		}
      }
      else{
        for(i = 0; i < dat_a.data.result.length; i++){
    			if(dat_a.data.result[i]["rank"] > lowestRank){
    				lowestRank = dat_a.data.result[dat_a.data.result.length-1-i]["rank"];
    			}
    			ccwm.push(dat_a.data.result[dat_a.data.result.length-1-i]["ccwm"]);
    			tournaments.push("VRC-"+(dat_a.data.result.length-i));
    			max_score.push(dat_a.data.result[dat_a.data.result.length-1-i]["max_score"]);
    		}
    		for(i = 0; i < dat_a.data.result.length; i++){
    			if(i == 5){
    				break;
    			}
    			rank.push(lowestRank-dat_a.data.result[dat_a.data.result.length-1-i]["rank"]);
    		}
      }
  		this.props.navigation.navigate('Ccwm', {ccwm: ccwm, sku: tournaments, max_score: max_score, rank: rank, name:name});
		}
		else{
			Alert.alert(this.state.input + " is not a valid team", "Please choose a valid team to search");
		}
	}
	}


	render() {
		return (
			<DismissKeyboard>
			<View style={styles.container}>
				<View style={styles.shadow}>
					<View
						style={styles.cardStats}>
							<Image
								source={require("../../assets/logo.png")}
								style={{
									width: scale(100, 0),
									height: scale(100, 1),
									marginLeft:scale(90, 0),
									marginBottom: scale(20, 1)
								}}
							/>
						<View style={styles.contentWrapperBody}>
							<TextInput
							style={styles.input}
							placeholder="Team Name"
							onChangeText={(text) => this.setState({input: text})}
							/>
							<Text style={styles.cardStatsBodyTextRight}>• Search for any team in the world.</Text>
						</View>
						<Text style={styles.cardStatsBodyText}>• Quickly and efficiently get team stats for thorough analysis.</Text>
						<Text style={styles.cardStatsBodyText}>• Beautiful graphs provide an appealing visualization to your eyes.</Text>
						<View style={{flex:1, flexDirection:'row'}}>
							<TouchableOpacity onPress={this.getInfo} style={[styles.button, {marginLeft:-scale(10, 0)}]}>
								<Text style={styles.buttonText}>Personal Info</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.computeOutput} style={styles.button}>
								<Text style={styles.buttonText}>Statistics</Text>
							</TouchableOpacity>
						</View>
					</View>
				</View>
			</View>
			</DismissKeyboard>
        )
	};
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		height: Dimensions.get('window').height
	},
	input: {
		backgroundColor: "#474747",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: scale(10, 1),
		color: "#4c4c4c",
		width: scale(130, 0),
		marginTop: scale(65, 1)
	},
	cardStats: {
		padding: scale(30, 1),
		borderRadius: 15,
		justifyContent: "center",
		margin: scale(10, 1),
		marginTop: scale(70, 1),
		marginBottom: scale(90, 1),
		width: scale(330, 0),
	},
	cardStatsTitle: {
		color: "#e8e8e8",
		fontSize: scale(25, 1),
		fontWeight: '700'
	},
	cardStatsSubTitle: {
		color: "#474747",
		fontSize: scale(17, 1),
		padding: 0,
		marginTop: 0,
		marginBottom: scale(10, 1),
		fontWeight: "700"
	},
	cardStatsBodyTextRight: {
		color: "#474747",
		fontSize: scale(15, 1),
		lineHeight: scale(20, 1),
		padding: 0,
		margin:0,
		marginBottom: scale(15, 1),
		marginLeft: scale(20, 0),
		marginTop: scale(40, 1),
		width: scale(140, 0)
	},
	cardStatsBodyText: {
		color: "#474747",
		lineHeight: scale(20, 1),
		padding: 0,
		margin:0,
		marginBottom: scale(20, 1),
		marginTop: scale(20, 1),
		fontSize: scale(15, 1)
	},
	contentWrapper: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: scale(-20, 1)
	},
	contentWrapperBody: {
		flexDirection: "row",
		alignItems: "center"
	},
	input: {
		backgroundColor: "#efefef",
		borderColor: "#cecece",
		borderWidth: 2,
		borderRadius: 10,
		padding: scale(10, 1),
		color: "#4c4c4c",
		width: scale(130, 0),
		marginTop: scale(30, 1)
	},
	button: {
		borderColor: "#474747",
		borderWidth: 2,
		padding: scale(10, 1),
		borderRadius: 10,
		width: scale(132, 0),
		height: scale(45, 1),
		margin: scale(10, 0),
		marginTop: scale(20, 1),
		alignItems: 'center'
	},
	buttonText: {
		color: "#474747",
		fontSize: scale(16, 1)
	}
});
