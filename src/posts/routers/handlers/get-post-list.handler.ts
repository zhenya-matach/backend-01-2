import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';

export function getPostListHandler(req: Request, res: Response) {
    const post = postsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(post);
}