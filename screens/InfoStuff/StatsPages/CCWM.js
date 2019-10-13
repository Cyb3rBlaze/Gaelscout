import React, { Component } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import CustomLineChart from '../StatsUtils/LineChart';

import scale from '../../../utils/scale';

var awayCCWM = 0;
var awayName = 0;
var awaySKU = 0;
var awayRank = 0;
var awayMaxScore = 0;

const parentHeight = 667;
const parentWidth =  375;

export default class Ccwm extends Component {
	constructor(props) {
		super(props)
	}

	CCWM = () => {
		this.props.navigation.navigate('Ccwm', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	score = () => {
		this.props.navigation.navigate('MaxScore', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	ran_k = () => {
		this.props.navigation.navigate('Rank', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}
	back = () => {
		this.props.navigation.navigate('InfoShow', {ccwm: awayCCWM, sku: awaySKU, max_score: awayMaxScore, rank: awayRank, name:awayName});
	}

	render() {
		const { navigation } = this.props;
		const ccwm = navigation.getParam('ccwm', "nodata");
        const name = navigation.getParam('name', "nodata");
		const sku = navigation.getParam('sku', "nodata");
		const rank = navigation.getParam('rank', "nodata");
		const max_score = navigation.getParam('max_score', "nodata");

		console.log(rank);

		awayCCWM = ccwm;
		awayName = name;
		awaySKU = sku;
		awayRank = rank;
		awayMaxScore = max_score;

		return (
            <View style={styles.container}>
				<TouchableOpacity style={[styles.button, {marginTop:scale(50, 1), marginLeft:scale(-250, 0)}]} onPress={this.back}>
					<Text style={{color:"#474747"}}>Back</Text>
				</TouchableOpacity>
                <Text style={styles.title}>{name}</Text>
                <Text style={styles.subtitle}>CCWM for the last five tournaments</Text>
				<CustomLineChart labels={sku} data={ccwm} width={250} height={250}/>
				<View style={[{flexDirection:'row', marginTop:50},styles.container]}>
					<TouchableOpacity style={styles.button} onPress={this.CCWM}>
						<Text style={{color:"#474747"}}>CCWM</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={this.score}>
						<Text style={{color:"#474747"}}>Max Score</Text>
					</TouchableOpacity>

					<TouchableOpacity style={styles.button} onPress={this.ran_k}>
						<Text style={{color:"#474747"}}>Rank</Text>
					</TouchableOpacity>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		padding: 15
	},
	title: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(30, 1),
		fontWeight: "300",
		marginTop:scale(-20, 1)
	},
	subtitle: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(20, 1),
		fontWeight: "200",
		marginTop: scale(30, 1),
		marginBottom: scale(20, 1)
	},
	button: {
		marginLeft: scale(10, 0),
		marginRight: scale(10, 0),
		borderWidth: 1,
		padding: scale(15, 1),
		borderColor: "#474747"
	}
});
