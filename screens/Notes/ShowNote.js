import React from "react";
import { StyleSheet, View, Text, Animated, Platform, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback, AsyncStorage, Dimensions } from "react-native";

import scale from '../../utils/scale';

var note;

const parentHeight = 667;
const parentWidth =  375;

const DismissKeyboard = ({ children }) => (
	<TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
	  {children}
	</TouchableWithoutFeedback>
  );

export default class Display extends React.Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        this.state = {
            text: navigation.getParam('note', "nodata"),
            name: navigation.getParam('name', "nodata"),
            key: navigation.getParam('key', "nodata")
        };
    }

	render() {
		const { navigation } = this.props;

        const name = navigation.getParam('name', "nodata");

		return (
            <DismissKeyboard>
			<View style={styles.container}>
                <TouchableOpacity
                onPress={() => {
                    this.props.navigation.navigate('Choose', {name:this.state.name, note:this.state.text, key:this.state.key});
                  }} style={[{marginTop:scale(50, 1)}, styles.button]}>
                    <Text>
                        Back
                    </Text>
                </TouchableOpacity>
                <TextInput
                style={styles.title}
                onChangeText={(name) =>{
                    (name) = this.setState({name});
                }}
                value={this.state.name}
                />
                <TextInput
                style={styles.input}
                onChangeText={(text) =>{
                    (text) = this.setState({text});
                }}
                value={this.state.text}
                numberOfLines = {4}
                multiline = {true}
                />
            </View>
            </DismissKeyboard>
		);
	}
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems:"center",
				backgroundColor: "#ededed"
    },
    button: {
		marginLeft:scale(-230, 0),
		marginRight: 10,
		borderWidth: 1,
		padding: 15,
        borderColor: "#474747",
        width: 65,
        marginTop: 60,
    },
    title:{
        fontSize: 20,
        padding: 10,
				marginTop: scale(40, 1),
				backgroundColor: "white"
    },
    input:{
        height: 40,
        width: 300,
        height: 200,
        padding: 10,
				backgroundColor: "white",
				marginTop: scale(60, 1)
    }
});
