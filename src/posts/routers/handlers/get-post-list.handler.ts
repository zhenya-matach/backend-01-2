import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {postsRepository} from '../../repositories/posts.repository';
import {PostOutputModel} from '../../types/postOutputModel';
import {mapToPostListOutputModel} from '../mappers/mapToListPostOutputModel';

export async function getPostListHandler(req: Request,
                                         res: Response<PostOutputModel[]>) {
    try {
        const posts = await postsRepository.findAll();
        const postsOutputArray = mapToPostListOutputModel(posts)
        res.status(HttpStatus.Ok_200).send(postsOutputArray);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}