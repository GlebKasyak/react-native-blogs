import React, { FC } from "react";
import { View, StyleSheet, ImageBackground, TouchableOpacity } from "react-native";

import { AppText } from "../../atoms";

import { PostType } from "../../../interfaces/post";

type Props = {
    post: PostType,
    onOpen: (post: PostType) => void
};

const Post: FC<Props> = ({ post, onOpen }) => (
    <TouchableOpacity activeOpacity={0.7} onPress={ onOpen.bind(null, post) } >
        <View style={ styles.post } >
            <ImageBackground source={{ uri: post.img }} style={ styles.image } >
                <View style={ styles.textWrapper } >
                    <AppText>{ new Date(post.date).toLocaleDateString() }</AppText>
                </View>
            </ImageBackground>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    post: {
        marginBottom: 15,
        overflow: "hidden"
    },
    image: {
        width: "100%",
        height: 200
    },
    textWrapper: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        paddingVertical: 5,
        alignItems: "center",
        width: "100%"
    },
});

export default Post;
