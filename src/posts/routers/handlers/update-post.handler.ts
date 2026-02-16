import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {PostInputModel} from '../../types/postInputModel';

export async function updatePostHandler(req: Request<{ id: string }, {}, PostInputModel>,
                                        res: Response) {
    const id = req.params.id;
    const foundPost = await postsRepository.findById(id);

    if (!foundPost) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    await postsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}