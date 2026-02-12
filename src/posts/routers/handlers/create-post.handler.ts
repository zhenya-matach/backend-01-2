import {Request, Response} from 'express';
import {db} from '../../../db/db';
import {createErrorMessages} from '../../../core/utils/error.utils';
import {postsRepository} from '../../repositories/posts.repository';
import {blogsRepository} from '../../../blogs/repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {Post} from '../../types/post';
import {postInputDto} from '../../dto/post-input.dto';
import {ValidationErrorDto} from '../../../core/types/validationError.dto';

export function createPostHandler(req: Request<{},{},postInputDto>,
                                  res: Response<ValidationErrorDto | Post>) {

    const blogId = req.body.blogId;
    const blog = blogsRepository.findById(blogId);

    if (!blog) {
        return res
            .status(HttpStatus.BadRequest_400)
            .send(
                createErrorMessages([{field: 'blogId', message: 'Blog not exist'}]),
            );
    }

    const newPost: Post = {
        id: db.posts.length ? (db.posts[db.posts.length - 1].id + 1).toString() : '1',
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: blog.name,
        createdAt: new Date().toISOString()
    };

    postsRepository.create(newPost);

    res
        .status(HttpStatus.Created_201)
        .send(newPost);
}