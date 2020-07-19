import { ThunkAction } from "redux-thunk";
import * as FileSystem from "expo-file-system";

import { PostType } from "../../interfaces/post";
import * as postTypes from "../types/postTypes";
import { AppStateType, InferActionsTypes } from "../reducers";
import DB from "../../db";

export const postActions = {
    loadPostsAC: (payload: Array<PostType>) => ({ type: postTypes.LOAD_POSTS, payload } as const),
    toggleBookedAC: (payload: string) => ({ type: postTypes.TOGGLE_BOOKED, payload } as const),
    removePostAC: (payload: string) => ({ type: postTypes.REMOVE_POST, payload } as const),
    addPostAC: (payload: PostType) => ({ type: postTypes.ADD_POST, payload } as const),
};

type ThunkActionType<T> = ThunkAction<Promise<T>, AppStateType, unknown, InferActionsTypes<typeof postActions>>;

export const loadPosts = (): ThunkActionType<void> => async dispatch => {
    const posts = await DB.getPosts() as Array<PostType>;

    dispatch(postActions.loadPostsAC(posts));
};

export const addPost = (post: PostType): ThunkActionType<void> => async dispatch => {
    const fileName = post.img.split("/").pop();
    const newPath = FileSystem.documentDirectory + fileName!;

    try {
        await FileSystem.moveAsync({
            to: newPath,
            from: post.img
        });
    } catch (err) {
        console.log("Error", err)
    };

    const payload = { ...post, img: newPath };
    const id = await DB.createPosts(payload);
    payload.id = id.toString();

    dispatch(postActions.addPostAC(payload));
};

export const removePost = (id: string): ThunkActionType<void> => async dispatch => {
    await DB.removePost(id);

    dispatch(postActions.removePostAC(id));
};

export const togglePost = (post: PostType): ThunkActionType<void> => async dispatch => {
    await DB.updatePost(post);

    dispatch(postActions.toggleBookedAC(post.id!));
};
