import {Request, Response} from 'express';
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from '../../../core/types/httpStatutes';
import {mapToBlogListOutputModel} from '../mappers/mapToBlogListOutputModel';
import {BlogOutputModel} from '../../types/blogOutputModel';

export async function getBlogListHandler(req: Request,
                                         res: Response<BlogOutputModel[]>) {
    try {
        const blogs = await blogsRepository.findAll();
        const blogsOutputModel = mapToBlogListOutputModel(blogs)
        res.status(HttpStatus.Ok_200).send(blogsOutputModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}