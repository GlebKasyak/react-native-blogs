import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Classes } from "../../assets/styles";

const AboutScreen: FC = () => {
    return (
        <View style={ styles.center } >
            <Text>About</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    center: Classes.CENTER
})

export default AboutScreen;