import React, { FC } from "react";
import { HeaderButton } from "react-navigation-header-buttons";
import { Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { Colors } from "../../../assets/styles";

const AppHeaderIcon: FC = props => {
    return <HeaderButton
        { ...props }
        title="Icon"
        IconComponent={Ionicons}
        iconSize={24}
        color={ Platform.OS === "android" ? Colors.WHITE : Colors.MAIN }
    />
};

export default AppHeaderIcon;
