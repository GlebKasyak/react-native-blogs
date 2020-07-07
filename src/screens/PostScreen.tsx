import React, { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

import { Classes } from "../../assets/styles";

const PostScreen: FC = () => {
    return (
        <View style={ styles.center } >
            <Text>Post</Text>

        </View>
    );
};

const styles = StyleSheet.create({
    center: Classes.CENTER
})

export default PostScreen;