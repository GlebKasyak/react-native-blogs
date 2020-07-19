import * as SQLite from "expo-sqlite";

import { PostType } from "./interfaces/post";

const db = SQLite.openDatabase("post.db");

export default class DB {
    static init = () => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "CREATE TABLE IF NOT EXISTS posts (id INTEGER PRIMARY KEY NOT NULL, text TEXT NOT NULL, img TEXT NOT NULL, date TEXT NOT NULL, booked INT)",
                    [],
                    resolve,
                    //@ts-ignore
                    (_, error) => reject(error)
                )
            });
        })
    };

    static getPosts = (): Promise<Array<PostType>> => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "SELECT * FROM posts",
                    [],
                    (_, result) => resolve(result.rows._array as Array<PostType>),
                    //@ts-ignore
                    (_, error) => reject(error)
                )
            });
        })
    };

    static createPosts = ({ text, date, img }: PostType): Promise<number> => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `INSERT INTO posts (text, date, booked, img) VALUES (?, ?, ?, ?)`,
                    [text, date, 0, img],
                    (_, result) => resolve(result.insertId),
                    //@ts-ignore
                    (_, error) => reject(error)
                )
            });
        })
    };

    static updatePost = (post: PostType): Promise<PostType> => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    "UPDATE posts SET booked = ? WHERE id = ?",
                    [post.booked ? 0 : 1, post.id],
                    //@ts-ignore
                    resolve,
                    (_, error) => reject(error)
                )
            });
        })
    };

    static removePost = (id: string) => {
        return new Promise((resolve, reject) => {
            db.transaction(tx => {
                tx.executeSql(
                    `DELETE FROM posts WHERE id = ?`,
                    [id],
                    resolve,
                    //@ts-ignore
                    (_, error) => reject(error)
                )
            });
        })
    };
};
