import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {mapToBlogOutputModel} from '../mappers/mapToBlogOutputModel';
import {BlogOutputModel} from '../../types/blogOutputModel';

export async function getBlogHandler(req: Request<{ id: string }>,
                                     res: Response<BlogOutputModel>) {
    try {
        const id = req.params.id;
        const foundBlog = await blogsRepository.findById(id);
        if (!foundBlog) {
            res.sendStatus(HttpStatus.NotFound_404)
            return;
        }

        const blogOutputModel = mapToBlogOutputModel(foundBlog);
        res.status(HttpStatus.Ok_200).send(blogOutputModel);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}