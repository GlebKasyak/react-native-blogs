import React, { FC } from "react";
import { View, StyleSheet, FlatList, Text } from "react-native";

import Post from "./Post";

import { PostType } from "../../../interfaces/post";
import { Fonts } from "../../../../assets/fonts";

type Props = {
    data: Array<PostType>,
    onOpen: (post: PostType) => void
};

const PostList: FC<Props> = ({ data, onOpen }) => (
   <>
       { !!data.length
            ? (
               <View style={ styles.wrapper } >
                   <FlatList
                       data={ data }
                       renderItem={ ({ item }) => <Post post={ item } onOpen={ onOpen } />  }
                       keyExtractor={ (item: PostType) => item.id!.toString() }
                   />
               </View>)
           : (
               <View style={ styles.wrapper } >
                   <Text style={ styles.noItems } >Постов пока нет</Text>
               </View>
           )
       }
   </>
);

const styles = StyleSheet.create({
    wrapper: {
        padding: 10
    },
    noItems: {
        fontFamily: Fonts.OpenSansRegular,
        textAlign: "center",
        marginVertical: 10,
        fontSize: 18
    }
});

export default PostList;
