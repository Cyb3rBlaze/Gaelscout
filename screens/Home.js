import React, { Component } from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";

import scale from '../utils/scale';

export default class Home extends Component {
	render() {
		return (
			<View>
				<View style={styles.matter}>
						<View style={{alignItems:'center', width:scale(375, 0), marginLeft:-scale(35, 0)}}>
							<Image
								source={require("../assets/logo.png")}
                style={{width: scale(100, 1), height: scale(100, 1)}}
							/>
						</View>
						<Text style={styles.title}>
							Built on Neural Networks
						</Text>
						<Text style={styles.text}>
							{'\t'}{'\t'}GaelScout mobile uses previous records of teams and
							processes them with cutting edge algorithms to make
							predictions. The model used for its network runs on
							3000 matches from the Tower Takeover season. This
							makes its match prediction results 85% accurate on
							average—effective considering that matches do not
							always have systematic outcomes.
						</Text>
						<Text style={styles.title}>
							Beautiful Data Visualizations
						</Text>
						<Text style={styles.text}>
							{'\t'}{'\t'}GaelScout mobile provides a beautiful statistics
							visualizer that teams can use to quickly and
							efficiently scout different teams. This visualizer
							allows anyone to visualize exactly how a team is
							doing given data from the open source VEX Database.
						</Text>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
  matter: {
    padding: 40,
		marginTop: scale(20, 1)
  },
  text: {
		marginTop: scale(20, 1),
		color: "#474747",
		lineHeight: 20
  },
	title: {
		marginTop: scale(30, 1),
		fontWeight: '700'
	}
});
