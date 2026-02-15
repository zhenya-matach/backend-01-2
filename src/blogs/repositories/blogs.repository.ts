import {BlogMongoModel} from "../types/blogMongoModel";
import {BlogInputModel} from '../types/blogInputModel';
import {blogCollection} from '../../db/mongo.db';
import {ObjectId, WithId} from 'mongodb';


export const blogsRepository = {
    async findAll(): Promise<WithId<BlogMongoModel>[]> {
        return blogCollection.find().toArray();
    },

    async findById(id: string): Promise<WithId<BlogMongoModel> | null> {
        return blogCollection.findOne({_id: new ObjectId(id)});
    },

    async create(newBlog: BlogMongoModel): Promise<WithId<BlogMongoModel>> {
        const insertBlog = await blogCollection.insertOne(newBlog);
        return {...newBlog, _id: insertBlog.insertedId};
    },

    async update(id: string, updateData: BlogInputModel): Promise<void> {
        const updateBlog = await blogCollection.updateOne(
            {
                _id: new ObjectId(id)
            },
            {
                $set: {
                    name: updateData.name,
                    description: updateData.description,
                    websiteUrl: updateData.websiteUrl,
                }
            }
        );

        if (updateBlog.matchedCount < 1) {
            throw new Error('Blog not exist');
        }
        return;
    },

    async delete(id: string): Promise<void> {
        const deleteBlog = await blogCollection.deleteOne({
            _id: new ObjectId(id)
        });

        if (deleteBlog.deletedCount < 1) {
            throw new Error('Blog not exist');
        }
        return;
    }
};
