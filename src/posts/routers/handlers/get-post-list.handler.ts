import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {Post} from '../../types/post';

export function getPostListHandler(req: Request,
                                   res: Response<Post[]>) {
    const post = postsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(post);
}