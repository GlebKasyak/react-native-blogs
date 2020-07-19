import { FC } from "react";
import { SQLError, SQLTransaction } from "expo-sqlite/src/SQLite.types";
import { NavigationStackOptions, NavigationStackScreenProps } from "react-navigation-stack";
import { NavigationBottomTabOptions, NavigationTabScreenProps } from "react-navigation-tabs";
import { NavigationDrawerOptions, NavigationDrawerScreenProps } from "react-navigation-drawer";


export type NavigationStackProps<P> = FC<P & NavigationStackScreenProps> & { navigationOptions?: NavigationStackOptions | ((props: NavigationStackScreenProps) => NavigationStackOptions) };
export type NavigationTabProps<P> = FC<P & NavigationTabScreenProps> & { navigationOptions?: NavigationBottomTabOptions | ((props: NavigationTabScreenProps) => NavigationBottomTabOptions) };
export type NavigationDrawerProps<P> = FC<P & NavigationDrawerScreenProps> & { navigationOptions?: NavigationDrawerOptions | ((props: NavigationDrawerScreenProps) => NavigationDrawerOptions) };

declare module "expo-sqlite" {
    interface SQLResultSetRowList {
        _array: Array<{ [column: string]: any }>
    }
};
