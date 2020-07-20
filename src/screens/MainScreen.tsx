import React, { useEffect, FC } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { observer, inject } from "mobx-react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { PostList } from "../components/moleculs";
import { AppHeaderIcon } from "../components/atoms";

import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";
import { PostType } from "../interfaces/post";
import { Classes, Colors } from "../../assets/styles";
import { StoreType } from "../store";


type Props = {
    isLoading: boolean,
    allPosts: Array<PostType>,
    loadPosts: () => void
};

const MainScreen: NavigationStackProps<Props> = ({ navigation, isLoading, allPosts, loadPosts }) => {
    const openPostHandler = ({ id, date, booked }: PostType) => {
        navigation.navigate(NavigationConstants.POST, { postId: id, date, booked });
    };

    useEffect(() => {
        loadPosts();
    }, [])

    if(isLoading) {
        return (
            <View style={ styles.center } >
                <ActivityIndicator color={ Colors.MAIN } size={75} />
            </View>
        )
    }

    return <PostList data={ allPosts } onOpen={ openPostHandler } />
};

MainScreen.navigationOptions = ({ navigation }) => {
    return {
        headerTitle: "Мой блог!",
        headerRight: () => (
            <HeaderButtons HeaderButtonComponent={ AppHeaderIcon } >
                <Item
                    title="Take photo"
                    iconName="ios-camera"
                    onPress={ () => navigation.push(NavigationConstants.CREATE) }
                />
            </HeaderButtons>
        ),
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
    };
}

const styles = StyleSheet.create({
    center: Classes.CENTER
});

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    isLoading: rootStore.isLoading,
    allPosts: rootStore.allPosts,
    loadPosts: rootStore.loadPosts,
}))(observer(MainScreen) as unknown as FC);
