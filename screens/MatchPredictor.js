import {createStackNavigator} from 'react-navigation-stack';
import Choose from './MatchPredictor/Choose';
import Display from './MatchPredictor/Display';

export default createStackNavigator({
	Choose: { screen: Choose,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Display: { screen: Display,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	}
});
