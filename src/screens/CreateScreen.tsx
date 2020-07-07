import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Classes } from "../../assets/styles";

const CreateScreen: FC = () => {
    return (
        <View style={ styles.center } >
            <Text>Create</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    center: Classes.CENTER
})

export default CreateScreen;