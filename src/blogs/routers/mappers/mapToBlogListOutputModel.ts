import {WithId} from 'mongodb';
import {BlogMongoModel} from '../../types/blogMongoModel';
import {BlogOutputModel} from '../../types/blogOutputModel';

export function mapToBlogListOutputModel(blogs: WithId<BlogMongoModel>[]): BlogOutputModel[] {
    return blogs.map(blog => ({
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        })
    )
}