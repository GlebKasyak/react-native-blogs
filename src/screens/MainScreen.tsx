import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { PostList } from "../components/moleculs";
import { AppHeaderIcon } from "../components/atoms";

import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";
import { PostType } from "../interfaces/post";
import { Classes, Colors } from "../../assets/styles";

import { loadPosts } from "../store/actions/post.action"
import { PostSelectors } from "../store/selectors"
import { AppStateType } from "../store/reducers"


type Props = NavigationStackScreenProps;

const MainScreen: NavigationStackProps<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const allPosts = useSelector((state: AppStateType) => PostSelectors.getAllPosts(state));
    const isLoading = useSelector((state: AppStateType) => PostSelectors.getIsLoading(state));

    const openPostHandler = ({ id, date, booked }: PostType) => {
        navigation.navigate(NavigationConstants.POST, { postId: id, date, booked });
    };

    useEffect(() => {
        dispatch(loadPosts());
    }, [dispatch])

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

export default MainScreen;
