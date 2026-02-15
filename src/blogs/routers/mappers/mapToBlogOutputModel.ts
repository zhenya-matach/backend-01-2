import {WithId} from 'mongodb';
import {BlogMongoModel} from '../../types/blogMongoModel';
import {BlogOutputModel} from '../../types/blogOutputModel';

export function mapToBlogOutputModel(blog: WithId<BlogMongoModel>): BlogOutputModel {
    return {
        id: blog._id.toString(),
        name: blog.name,
        description: blog.description,
        websiteUrl: blog.websiteUrl,
        createdAt: blog.createdAt,
        isMembership: blog.isMembership
    }
}