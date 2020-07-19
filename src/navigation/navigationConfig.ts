import { Platform } from "react-native";
import { Colors } from "../../assets/styles";

export const navigationOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === "android" ? Colors.MAIN : Colors.WHITE
        },
        headerTintColor: Platform.OS === "android" ? Colors.WHITE : Colors.MAIN
    }
};

export enum NavigationConstants {
    MAIN = "Main",
    POST = "Post",
    BOOKED = "Booked",
    CREATE = "Create",
};
