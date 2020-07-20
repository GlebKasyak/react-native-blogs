import { observable, decorate, action, runInAction } from "mobx";
import * as FileSystem from "expo-file-system";

import { PostType } from "../interfaces/post";
import DB from "../db";

class PostsStore {
    allPosts: Array<PostType> = [];
    bookedPosts: Array<PostType> = [];
    isLoading = true;

    loadPosts = async () => {
        try {
           const posts = await DB.getPosts();
            runInAction(() => {
                this.allPosts = posts;
                this.allPosts.filter(post => post.booked)
            });
        } catch (err) {
            console.log(err);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    };

    getBookedPost = (postId: string) => {
        return this.bookedPosts.some(post => post.id === postId)
    };

    getPost = (postId: string) => {
        return this.allPosts.find(post => post.id === postId);
    };

    addPost = async (post: PostType) => {
        const newPath = FileSystem.documentDirectory + post.img.split("/").pop()!;

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

        this.allPosts.unshift(payload);
    };

    removePost = async (postId: string) => {
        await DB.removePost(postId);

        this.allPosts = this.allPosts.filter(post => post.id !== postId);
        this.bookedPosts = this.bookedPosts.filter(post => post.id !== postId);
    };

    togglePost = async (post: PostType) => {
        await DB.updatePost(post);

        const allPosts = this.allPosts.map(p => {
            if(p.id === post.id) {
                p.booked = !post.booked
            };

            return p;
        });

        this.allPosts = allPosts;
        this.bookedPosts = allPosts.filter(post => post.booked);
    };
};

decorate(PostsStore, {
    allPosts: observable,
    bookedPosts: observable,
    isLoading: observable,

    loadPosts: action,
    removePost: action,
    togglePost: action,
    addPost: action,
});

export type StoreType = {
    rootStore: {
        allPosts: Array<PostType>,
        bookedPosts: Array<PostType>,
        isLoading: boolean,

        loadPosts: () => Promise<void>,
        removePost: (postId: string) => Promise<void>,
        addPost: (post: PostType) => Promise<void>,
        togglePost: (post: PostType) => Promise<void>,
        getPost: (postId: string) => PostType,
        getBookedPost: (postId: string) => PostType,
    }
};

export default new PostsStore();


