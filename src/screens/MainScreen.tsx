import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Classes } from "../../assets/styles";

const MainScreen: FC = () => {
    return (
        <View style={ styles.center } >
            <Text>Main</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    center: Classes.CENTER
})

export default MainScreen;