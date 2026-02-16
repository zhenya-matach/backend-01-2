import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {blogsRepository} from '../../repositories/blogs.repository';
import {BlogInputModel} from '../../types/blogInputModel';

export async function updateBlogHandler(req: Request<{ id: string }, {}, BlogInputModel>,
                                        res: Response) {
    const id = req.params.id;
    const foundBlog = await blogsRepository.findById(id);

    if (!foundBlog) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    await blogsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);
}