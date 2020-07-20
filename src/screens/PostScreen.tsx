import React, { FC, useCallback, useEffect } from "react";
import { observer, inject } from "mobx-react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, StyleSheet, Image, Button, ScrollView, Alert } from "react-native";

import { AppHeaderIcon, AppText } from "../components/atoms";

import { Colors } from "../../assets/styles";
import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";

import { PostType } from "../interfaces/post";
import { StoreType } from "../store";

type Props = {
    getPost: (postId: string) => PostType
    removePost: (postId: string) => Promise<void>,
    togglePost: (post: PostType) => Promise<void>,
    getBookedPost: (postId: string) => PostType
};

const PostScreen: NavigationStackProps<Props> = (
    {
        navigation,
        getPost,
        removePost,
        togglePost,
        getBookedPost
    }) => {
    const postId = navigation.getParam("postId");
    const post = getPost(postId);

    const removeHandler = () => {
        Alert.alert(
            "Удаление поста",
            "Вы точно хотите удалить этот пост?",
            [
                {
                    text: "Отменить",
                    style: "cancel"
                },
                {
                    text: "Удалить", style: "destructive",
                    onPress() {
                        navigation.navigate(NavigationConstants.MAIN);
                        removePost(postId)
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const toggleHandler = useCallback(() => {
        togglePost(post);
    }, [post]);

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler]);

    useEffect(() => {
        navigation.setParams({ booked: getBookedPost(postId) })
    }, [getBookedPost(postId)]);

    if(!post) {
        return null
    }

    return (
        <View>
            <Image source={{ uri: post.img }} style={ styles.image } />
                <ScrollView style={ styles.textWrapper } >
                   <AppText style={ styles.text } >{ post.text }</AppText>
                </ScrollView>
            <Button
                title="Удалить"
                onPress={ removeHandler }
                color={ Colors.RED }
            />
        </View>
    );
};

PostScreen.navigationOptions = ({ navigation }) => {
    const date = navigation.getParam("date");
    const booked = navigation.getParam("booked");
    const toggleHandler = navigation.getParam("toggleHandler");
    console.log(booked)
    const iconName = booked ? "ios-star" : "ios-star-outline";

    return {
        headerTitle: `Пост от ${ new Date(date).toLocaleDateString() }`,
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ AppHeaderIcon } >
                <Item
                    title="Take photo"
                    iconName={ iconName }
                    onPress={ toggleHandler }
                />
            </HeaderButtons>
        ),
    }
};

const styles = StyleSheet.create({
    image: {
        width: "100%",
        height: 200
    },
    textWrapper: {
        padding: 10
    },
    text: {
        color: Colors.BLACK
    }
})

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    getPost: rootStore.getPost,
    removePost: rootStore.removePost,
    togglePost: rootStore.togglePost,
    getBookedPost: rootStore.getBookedPost,
}))(observer(PostScreen) as unknown as FC);
