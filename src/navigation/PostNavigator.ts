import { createStackNavigator } from "react-navigation-stack";

import { MainScreen, PostScreen } from "../screens";
import { navigationOptions } from "./navigationConfig";

export default createStackNavigator({
    Main: MainScreen,
    Post: PostScreen
}, navigationOptions);

