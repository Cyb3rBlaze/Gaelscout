import Home from "./screens/Home";
import MatchPredictor from "./screens/MatchPredictor";
import Notes from "./screens/Notes";
import Info from "./screens/Info";
import React from 'react';
import { createAppContainer } from "react-navigation"
import { createBottomTabNavigator } from 'react-navigation-tabs';
import tabBarIcon from "./utils/tabBarIcon";

console.disableYellowBox = true;

const TabNavigator = createBottomTabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: tabBarIcon("home")
    }
  },
  Predictor: {
    screen: MatchPredictor,
    navigationOptions: {
      tabBarLabel: "Predictor",
      tabBarIcon: tabBarIcon("tablet")
    }
  },
  Info: {
    screen: Info,
    navigationOptions: {
      tabBarLabel: "Stats",
      tabBarIcon: tabBarIcon("pie-chart")
    }
  },
  Notes: {
    screen: Notes,
    navigationOptions: {
      tabBarLabel: "Notes",
      tabBarIcon: tabBarIcon("note")
    }
  },
},
{
  initialRouteName: "Home",
  activeColor: "#0d0123",
  inactiveColor: "#595959",
  order: ["Home", "Predictor", "Info", "Notes"],
  shifting: true,
  barStyle: { backgroundColor: "#f3f3f3" }
});

export default createAppContainer(TabNavigator);
