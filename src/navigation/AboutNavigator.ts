import { createStackNavigator } from "react-navigation-stack";

import { AboutScreen } from "../screens";
import { navigationOptions } from "./navigationConfig";

export default createStackNavigator({
    About: AboutScreen,
}, navigationOptions);

