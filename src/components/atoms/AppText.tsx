import React, { FC  } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";

import { Colors } from "../../../assets/styles";
import { Fonts } from "../../../assets/fonts";

type Props = {
    style?: TextStyle
};

const AppText: FC<Props> = ({ children, style }) => (
  <Text style={{ ...styles.default, ...style }} >{ children }</Text>
);

const styles = StyleSheet.create({
    default: {
        color: Colors.WHITE,
        fontFamily: Fonts.OpenSansRegular
    }
});

export default AppText;

