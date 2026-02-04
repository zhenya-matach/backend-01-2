import {db} from '../../db/db';
import {Post} from '../types/post';
import {postInputDto} from '../dto/post-input.dto';


export const postsRepository = {
    findAll(): Post[] {
        return db.posts;
    },

    findById(id: string): Post | null {
        return db.posts.find((p) => p.id === id) ?? null;
    },

    create(newPost: Post): Post {
        db.posts.push(newPost);
        return newPost;
    },

    update(id: string, dto: postInputDto): void {
        const post = db.posts.find((p) => p.id === id);

        if (!post) {
            throw new Error(`Post not exist`);
        }

        post.title = dto.title;
        post.shortDescription = dto.shortDescription;
        post.content = dto.content;
        post.blogId = dto.blogId;

        return;
    },

    delete(id: string): void {
        const index = db.posts.findIndex((p) => p.id === id);

        if (index === -1) {
            throw new Error(`Post not exist`);
        }

        db.posts.splice(index, 1);
        return;
    },
};