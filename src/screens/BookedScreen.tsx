import React, { FC } from "react";
import { observer, inject } from "mobx-react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { PostList } from "../components/moleculs";
import { AppHeaderIcon } from "../components/atoms";

import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";
import { PostType } from "../interfaces/post";

import { StoreType } from "../store";

type Props = {
    bookedPosts: Array<PostType>
};

const BookedScreen: NavigationStackProps<Props> = ({ navigation, bookedPosts }) => {
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

export default inject<StoreType, {}, Props, {}>(({ rootStore }) => ({
    bookedPosts: rootStore.bookedPosts,
}))(observer(BookedScreen) as unknown as FC);
