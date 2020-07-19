import React from "react";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, Text, StyleSheet } from "react-native";

import { AppHeaderIcon } from "../components/atoms";

import { Classes } from "../../assets/styles";
import { Fonts } from "../../assets/fonts";
import { NavigationStackProps } from "../interfaces/common";


type Props = NavigationStackScreenProps;

const AboutScreen: NavigationStackProps<Props> = () => {
    return (
        <View style={ styles.center } >
            <Text>Приложение для блогов</Text>
            <Text>Версия приложения <Text style={ styles.version } >1.0.0</Text></Text>
        </View>
    );
};

AboutScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: "О приложении",
    headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={ AppHeaderIcon } >
            <Item
                title="Toggle drawer"
                iconName="ios-menu"
                // @ts-ignore
                onPress={ navigation.toggleDrawer }
            />
        </HeaderButtons>
    )
});

const styles = StyleSheet.create({
    center: Classes.CENTER,
    version: {
        fontFamily: Fonts.OpenSansBold
    }
});

export default AboutScreen;
