import {WithId} from 'mongodb';
import {PostMongoModel} from '../../types/postMongoModel';
import {PostOutputModel} from '../../types/postOutputModel';

export function mapToPostListOutputModel(posts: WithId<PostMongoModel>[]): PostOutputModel[] {
    return posts.map((post) => ({
        id: post._id.toString(),
        title: post.title,
        shortDescription: post.shortDescription,
        content: post.content,
        blogId: post.blogId,
        blogName: post.blogName,
        createdAt: post.createdAt
    }));
}