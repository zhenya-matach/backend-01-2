import {PostMongoModel} from '../types/postMongoModel';
import {PostInputModel} from '../types/postInputModel';
import {ObjectId, WithId} from 'mongodb';
import {postCollection} from '../../db/mongo.db';
import {blogsRepository} from '../../blogs/repositories/blogs.repository';

export const postsRepository = {
    async findAll(): Promise<WithId<PostMongoModel>[]> {
        return postCollection.find().toArray();
    },

    async findById(id: string): Promise<WithId<PostMongoModel> | null> {
        return postCollection.findOne({_id: new ObjectId(id)});
    },

    async create(newPost: PostMongoModel): Promise<WithId<PostMongoModel>> {
        const insertPost = await postCollection.insertOne(newPost);
        return {...newPost, _id: insertPost.insertedId};
    },

    async update(id: string, updateData: PostInputModel): Promise<void> {
        const foundBlog = await blogsRepository.findById(updateData.blogId);

        if (!foundBlog) {
            throw new Error('Blog does not exist');
        }

        const updatePost = await postCollection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    title: updateData.title,
                    shortDescription: updateData.shortDescription,
                    content: updateData.content,
                    blogId: updateData.blogId,
                    blogName: foundBlog.name,
                }
            }
        );

        if (updatePost.matchedCount < 1) {
            throw new Error('Post not found');
        }
        return;
    },

    async delete(id: string): Promise<void> {
        const deletePost = await postCollection.deleteOne({
            _id: new ObjectId(id)
        });

        if (deletePost.deletedCount < 1) {
            throw new Error('Post not exist');
        }
        return;
    }
};