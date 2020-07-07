import * as Font from "expo-font";

export enum Fonts {
    OpenSansBold = "Open-Sans-Bold",
    OpenSansRegular = "Open-Sans-Regular",
};

export const loadAppFonts = async () => {
    await Font.loadAsync({
        [Fonts.OpenSansBold]: require("./OpenSans-Bold.ttf"),
        [Fonts.OpenSansRegular]: require("./OpenSans-Regular.ttf")
    })
};