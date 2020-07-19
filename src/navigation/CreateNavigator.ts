import { createStackNavigator } from "react-navigation-stack";

import { CreateScreen } from "../screens";
import { navigationOptions } from "./navigationConfig";

export default createStackNavigator({
    Create: CreateScreen,
}, navigationOptions);

