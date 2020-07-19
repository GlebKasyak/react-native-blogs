import { createStackNavigator } from "react-navigation-stack";

import { BookedScreen, PostScreen } from "../screens";
import { navigationOptions } from "./navigationConfig";

export default createStackNavigator({
    Booked: BookedScreen,
    Post: PostScreen
}, navigationOptions);

