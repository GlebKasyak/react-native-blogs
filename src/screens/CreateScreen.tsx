import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { View, Text, StyleSheet, TextInput, Image, Button, ScrollView, TouchableWithoutFeedback, Keyboard } from "react-native";

import { AppHeaderIcon } from "../components/atoms";
import { PhotoPicker } from "../components/moleculs";

import { Colors } from "../../assets/styles";
import { Fonts } from "../../assets/fonts";
import { NavigationStackProps } from "../interfaces/common";
import { NavigationConstants } from "../navigation/navigationConfig";

import { addPost } from "../store/actions/post.action";

type Props = NavigationStackScreenProps;

const CreateScreen: NavigationStackProps<Props> = ({ navigation }) => {
    const dispatch = useDispatch();
    const imgRef = useRef<string>();

    const [text, setText] = useState("");

    const saveHandler = () => {
        const post = {
            date: new Date().toJSON(),
            text,
            img: imgRef.current!,
            booked: false
        };

        dispatch(addPost(post));
        navigation.navigate(NavigationConstants.MAIN);
    };

    const photoPickHandler = (uri: string) => {
        imgRef.current = uri;
    };

    return (
        <ScrollView>
            <TouchableWithoutFeedback onPress={ Keyboard.dismiss } >
                <View style={ styles.wrapper } >
                    <Text style={ styles.title } >Создай новый пост</Text>
                    <TextInput
                        value={ text }
                        onChangeText={ setText }
                        multiline
                        placeholder="Введите текс поста"
                        style={ styles.textArea }
                    />
                    <PhotoPicker onPick={ photoPickHandler } />
                    <Button
                        title="Создать пост"
                        color={ Colors.MAIN }
                        onPress={ saveHandler }
                        disabled={ !text }
                    />
                </View>
            </TouchableWithoutFeedback>
        </ScrollView>
    );
};

CreateScreen.navigationOptions = ({ navigation }) => ({
    headerTitle: "Создать пост",
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

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    title: {
        fontSize: 20,
        textAlign: "center",
        fontFamily: Fonts.OpenSansRegular,
        marginVertical: 10
    },
    textArea: {
        padding: 10,
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10
    }
});

export default CreateScreen;
