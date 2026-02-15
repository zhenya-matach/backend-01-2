import {Request, Response} from 'express';
import {BlogMongoModel} from '../../types/blogMongoModel';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {blogsRepository} from '../../repositories/blogs.repository';
import {BlogInputModel} from '../../types/blogInputModel';
import {BlogOutputModel} from '../../types/blogOutputModel';
import {mapToBlogOutputModel} from '../mappers/mapToBlogOutputModel';

export async function createBlogHandler(req: Request<{}, {}, BlogInputModel>,
                                        res: Response<BlogOutputModel>) {
    try {
        const newBlog: BlogMongoModel = {
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        };

        const createdBlog = await blogsRepository.create(newBlog);
        const blogOutputModel = mapToBlogOutputModel(createdBlog);
        res
            .status(HttpStatus.Created_201)
            .send(blogOutputModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}