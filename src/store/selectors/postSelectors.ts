import { AppStateType } from "../reducers";

export default class PostSelectors {
    static getAllPosts = (state: AppStateType) => state.post.allPosts

    static getBookedPosts = (state: AppStateType) => state.post.bookedPosts;

    static getBookedPost = (state: AppStateType, postId: string) => state.post.bookedPosts.some(post => post.id === postId);

    static getPostById = (state: AppStateType, postId: string) => state.post.allPosts.find(post => post.id === postId);

    static getIsLoading = (state: AppStateType) => state.post.isLoading;
}
