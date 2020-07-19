import { Reducer } from "redux";

import * as postTypes from "../types/postTypes";
import { postActions } from "../actions/post.action";
import { InferActionsTypes } from "./index";
import { PostType } from "../../interfaces/post";

const initialState = {
    allPosts: [] as Array<PostType>,
    bookedPosts: [] as Array<PostType>,
    isLoading: true
};

type StateType = typeof initialState;
type ActionTypes = InferActionsTypes<typeof postActions>;

const reducer: Reducer<StateType, ActionTypes> = (state = initialState, action: ActionTypes): StateType => {
    switch (action.type) {
        case postTypes.LOAD_POSTS:
            return {
                ...state,
                allPosts: action.payload,
                bookedPosts: action.payload.filter(post => post.booked),
                isLoading: false
            };
        case postTypes.TOGGLE_BOOKED:
            const allPosts = state.allPosts.map(post => {
                if(post.id === action.payload) {
                    post.booked = !post.booked
                };

                return post;
            });

            return {
                ...state,
                allPosts,
                bookedPosts: allPosts.filter(post => post.booked)
            };
        case postTypes.REMOVE_POST:
            return {
                ...state,
                allPosts: state.allPosts.filter(post => post.id !== action.payload),
                bookedPosts: state.bookedPosts.filter(post => post.id !== action.payload)
            };
        case postTypes.ADD_POST:
            return {
                ...state,
                allPosts: [action.payload, ...state.allPosts],
            };
        default:
            return state;
    }
};

export default reducer;
