import React from "react";
import { useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenProps } from "react-navigation-stack";

import { PostList } from "../components/moleculs";
import { AppHeaderIcon } from "../components/atoms";

import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";
import { PostType } from "../interfaces/post";

import { PostSelectors } from "../store/selectors"
import { AppStateType } from "../store/reducers"

type Props = NavigationStackScreenProps;

const BookedScreen: NavigationStackProps<Props> = ({ navigation }) => {
    const bookedPosts = useSelector((state: AppStateType) => PostSelectors.getBookedPosts(state));

    const openPostHandler = ({ id, date, booked }: PostType) => {
        navigation.navigate(NavigationConstants.POST, { postId: id, date, booked });
    };

    return <PostList data={ bookedPosts } onOpen={ openPostHandler } />
};

BookedScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: "Избранное",
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

export default BookedScreen;
