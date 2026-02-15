import {Request, Response} from 'express';
import {createErrorMessages} from '../../../core/utils/error.utils';
import {postsRepository} from '../../repositories/posts.repository';
import {blogsRepository} from '../../../blogs/repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {PostMongoModel} from '../../types/postMongoModel';
import {PostInputModel} from '../../types/postInputModel';
import {ValidationErrorDto} from '../../../core/types/validationError.dto';
import {PostOutputModel} from '../../types/postOutputModel';
import {mapToPostOutputModel} from '../mappers/mapToPostOutputModel';

export async function createPostHandler(req: Request<{}, {}, PostInputModel>,
                                        res: Response<ValidationErrorDto | PostOutputModel>) {
    try {
        const blogId = req.body.blogId;
        const foundBlog = await blogsRepository.findById(blogId);

        if (!foundBlog) {
            return res
                .status(HttpStatus.BadRequest_400)
                .send(
                    createErrorMessages([{field: 'blogId', message: 'Blog not exist'}]),
                );
        }

        const newPost: PostMongoModel = {
            title: req.body.title,
            shortDescription: req.body.shortDescription,
            content: req.body.content,
            blogId: req.body.blogId,
            blogName: foundBlog.name,
            createdAt: new Date().toISOString()
        };

        const createdPost = await postsRepository.create(newPost);
        const postOutputModel = mapToPostOutputModel(createdPost);
        res
            .status(HttpStatus.Created_201)
            .send(postOutputModel);
    } catch (e: unknown) {
        res.status(HttpStatus.InternalServerError_500);
    }
}