import React, { Component } from "react";
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const parentHeight = 667;
const parentWidth =  375;

import scale from '../../utils/scale';

export default class TeamInfo extends Component {
	render() {
		const { navigation } = this.props;
		const name = navigation.getParam('name', "nodata");
		const teamName = navigation.getParam('teamName', "nodata");
		const organization = navigation.getParam('organization', "nodata");
		const region = navigation.getParam('region', "nodata");
		const country = navigation.getParam('country', "nodata");
		const city = navigation.getParam('city', "nodata");
		const level = navigation.getParam('level', "nodata");

		return (
			<ScrollView style={{flex: 1}} contentContainerStyle={styles.container}>
			<TouchableOpacity
			onPress={() => {
					this.props.navigation.navigate('InfoShow');
				}} style={[styles.button]}>
					<Text>
							Back
					</Text>
			</TouchableOpacity>
				<Text style={styles.title}>Results for team {name}</Text>
				<Text style={styles.text}>Official name: {teamName}</Text>
				<Text style={styles.text}>Organization: {organization}</Text>
				<Text style={styles.text}>Country: {country}</Text>
				<Text style={styles.text}>Region: {region}</Text>
				<Text style={styles.text}>City: {city}</Text>
				<Text style={styles.text}>Grade level: {level}</Text>
			</ScrollView> // returns as a tuple?
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: scale(30, 1)
	},
	title: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(30, 1),
		fontWeight: "300",
		marginTop: scale(50, 1)
	},
	text: {
		color: "#474747",
		textAlign: "center",
		fontSize: scale(20, 1),
		fontWeight: "700",
		marginTop: scale(30, 1)
	},
	button: {
	marginLeft:scale(-230, 0),
	marginRight: 10,
	borderWidth: 1,
	padding: 15,
			borderColor: "#474747",
			width: 65,
			marginTop: scale(30, 1),
	},
});
