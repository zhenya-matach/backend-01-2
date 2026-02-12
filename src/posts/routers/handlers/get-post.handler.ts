import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {Post} from '../../types/post';

export function getPostHandler(req: Request<{id:string}>,
                               res: Response<Post>) {
    const id = req.params.id;
    const post = postsRepository.findById(id);
    if (!post) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }
    res.status(HttpStatus.Ok_200).send(post);
}