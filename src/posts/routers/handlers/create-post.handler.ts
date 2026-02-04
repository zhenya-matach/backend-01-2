import {Request, Response} from 'express';
import {db} from '../../../db/db';
import {createErrorMessages} from '../../../core/utils/error.utils';
import {postsRepository} from '../../repositories/posts.repository';
import {blogsRepository} from '../../../blogs/repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {Post} from '../../types/post';

export function createPostHandler(req: Request, res: Response) {

    const blogId = req.params.blogId;
    const blog = blogsRepository.findById(blogId);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{field: 'ID', message: 'Blog not found'}]),
            );
    }

    const newPost: Post = {
        id: db.posts.length ? (parseInt(db.posts[db.posts.length - 1].id) + 1).toString() : '1',
        title: req.body.title,
        shortDescription: req.body.shortDescription,
        content: req.body.content,
        blogId: req.body.blogId,
        blogName: blog.name
    };

    postsRepository.create(newPost);

    res
        .status(HttpStatus.Created_201)
        .send(newPost);
}