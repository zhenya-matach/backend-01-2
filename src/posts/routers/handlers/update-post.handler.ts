import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {createErrorMessages} from '../../../core/utils/error.utils';
import {postsRepository} from '../../repositories/posts.repository';

export function updatePostHandler(req: Request, res: Response) {
    const id = req.params.id.toString();
    const post = postsRepository.findById(id);

    if (!post) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{field: 'ID', message: 'Post not found'}]),
            );
        return;
    }

    postsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}