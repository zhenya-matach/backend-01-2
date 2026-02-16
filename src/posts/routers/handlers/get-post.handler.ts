import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {PostMongoModel} from '../../types/postMongoModel';
import {mapToPostOutputModel} from '../mappers/mapToPostOutputModel';

export async function getPostHandler(req: Request<{ id: string }>,
                                     res: Response<PostMongoModel>) {
    try {
        const id = req.params.id;
        const foundPost = await postsRepository.findById(id);
        if (!foundPost) {
            res.sendStatus(HttpStatus.NotFound_404)
            return;
        }

        const postOutputEntity = mapToPostOutputModel(foundPost);
        res.status(HttpStatus.Ok_200).send(postOutputEntity);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }

}