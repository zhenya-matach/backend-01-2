import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';

export function deletePostHandler(req: Request<{id:string}>,
                                  res: Response) {
    const id = req.params.id;
    const post = postsRepository.findById(id);

    if (!post) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    postsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent_204);
}