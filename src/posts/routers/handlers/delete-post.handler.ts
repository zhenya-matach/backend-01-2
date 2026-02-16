import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';

export async function deletePostHandler(req: Request<{id:string}>,
                                        res: Response) {
    try {
        const id = req.params.id;
        const deletePost = await postsRepository.findById(id);

        if (!deletePost) {
            res.sendStatus(HttpStatus.NotFound_404)
            return;
        }

        await postsRepository.delete(id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }

}