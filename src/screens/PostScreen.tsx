import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { View, StyleSheet, Image, Button, ScrollView, Alert } from "react-native";

import { AppHeaderIcon, AppText } from "../components/atoms";

import { Colors } from "../../assets/styles";
import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";

import { removePost, togglePost } from "../store/actions/post.action";
import { PostSelectors } from "../store/selectors";
import { AppStateType } from "../store/reducers";

type Props = NavigationStackScreenProps;


const PostScreen: NavigationStackProps<Props> = ({ navigation }) => {
    const dispatch = useDispatch();

    const postId = navigation.getParam("postId");
    const post = useSelector((state: AppStateType) => PostSelectors.getPostById(state, postId))!;

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
                        dispatch(removePost(postId))
                    }
                }
            ],
            { cancelable: false }
        );
    };

    const toggleHandler = useCallback(() => {
        dispatch(togglePost(post));
    }, [dispatch, post]);

    const booked = useSelector((state: AppStateType) =>
        PostSelectors.getBookedPost(state, postId)
    );

    useEffect(() => {
        navigation.setParams({ toggleHandler })
    }, [toggleHandler]);

    useEffect(() => {
        navigation.setParams({ booked })
    }, [booked]);

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

export default PostScreen;
