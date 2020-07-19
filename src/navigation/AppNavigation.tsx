import React from "react";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { createAppContainer } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import { createBottomTabNavigator } from "react-navigation-tabs";

import BookedNavigator from "./BookedNavigator";
import PostNavigator from "./PostNavigator";
import AboutNavigator from "./AboutNavigator";
import CreateNavigator from "./CreateNavigator";

import { Colors } from "../../assets/styles";
import { Fonts } from "../../assets/fonts";


type TabBarIconProps = {
    focused: boolean;
    tintColor?: string;
    horizontal?: boolean;
};

const bottomTabsConfig = {
    Post: {
        screen: PostNavigator,
        navigationOptions: {
            tabBarLabel: "Все",
            tabBarIcon: ({ tintColor }: TabBarIconProps) =>
                <Ionicons name="ios-albums" size={25} color={ tintColor }/>
        }
    },
    Booked: {
        screen: BookedNavigator,
        navigationOptions: {
            tabBarLabel: "Избранное",
            tabBarIcon: ({ tintColor }: TabBarIconProps) =>
                <Ionicons name="ios-star" size={25} color={ tintColor }/>
        }
    }
};

const BottomNavigator =
    Platform.OS === "android"
        ? createMaterialBottomTabNavigator(bottomTabsConfig, {
            activeColor: Colors.WHITE,
            shifting: true,
            barStyle: {
                backgroundColor: Colors.MAIN
            }
        })
        : createBottomTabNavigator(bottomTabsConfig, {
            tabBarOptions: {
                activeTintColor: Colors.MAIN
            }
        });


const MainNavigator = createDrawerNavigator({
    PostTabs: {
        screen: BottomNavigator,
        navigationOptions: {
            drawerLabel: "Главная"
        }
    },
    About: {
        screen: AboutNavigator,
        navigationOptions: {
            drawerLabel: "О приложении"
        }
    },
    Create: {
        screen: CreateNavigator,
        navigationOptions: {
            drawerLabel: "Новый пост"
        }
    }
}, {
    contentOptions: {
        activeTintColor: Colors.MAIN,
        labelStyle: {
            fontFamily: Fonts.OpenSansBold
        }
    }
});

export default createAppContainer(MainNavigator);
