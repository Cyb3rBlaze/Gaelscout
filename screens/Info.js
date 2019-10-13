import {createStackNavigator} from 'react-navigation-stack';
import InfoShow from './InfoStuff/InfoShow';
import TeamInfo from './InfoStuff/TeamInfo';
import Ccwm from './InfoStuff/StatsPages/CCWM';
import MaxScore from './InfoStuff/StatsPages/MaxScore';
import Rank from './InfoStuff/StatsPages/Rank';

export default createStackNavigator({
  InfoShow: { screen: InfoShow,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	TeamInfo: { screen: TeamInfo,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Ccwm: { screen: Ccwm,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	MaxScore: { screen: MaxScore,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
	Rank: { screen: Rank,
		navigationOptions: ({ navigation }) => ({
			header: null
		})
	},
});
