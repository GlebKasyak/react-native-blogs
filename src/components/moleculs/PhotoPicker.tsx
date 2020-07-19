import React, { useState, FC } from "react";
import { View, StyleSheet, Image, Button, Alert } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { ImagePickerResult } from "expo-image-picker/src/ImagePicker.types";

type Props = {
    onPick: (uri: string) => void
};

const PhotoPicker: FC<Props> = ({ onPick }) => {
    const [image, setImage] = useState<null | string>(null);

    const getPermissionAsync = async () => {
        const { status } = await Permissions.askAsync(
            Permissions.CAMERA,
            Permissions.CAMERA_ROLL
        );

        if(status !== "granted") {
            Alert.alert("Ошибка", "Вы не дали прав на создание фото");
            return false;
        };

        return true;
    };

    const takePhoto = async () => {
        const hasPermissions = await getPermissionAsync();

        if(!hasPermissions) {
            return;
        };

        const img: ImagePickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: false,
            quality: 0.7,
            aspect: [16, 9]
        });

        if(!img.cancelled) {
            setImage(img.uri);
            onPick(img.uri);
        };
    };

    return (
        <View style={ styles.wrapper } >
            <Button title="Сделать фото" onPress={ takePhoto } />
            { image && <Image source={{ uri: image }} style={ styles.image } />}
        </View>
    );
};

const styles = StyleSheet.create({
    wrapper: {
        marginBottom: 10
    },
    image: {
        width: "100%",
        height: 200,
        marginTop: 10
    }
})

export default PhotoPicker;
