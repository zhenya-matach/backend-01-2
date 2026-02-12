import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {postInputDto} from '../../dto/post-input.dto';

export function updatePostHandler(req: Request<{ id: string }, {}, postInputDto>,
                                  res: Response) {
    const id = req.params.id;
    const post = postsRepository.findById(id);

    if (!post) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    postsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}