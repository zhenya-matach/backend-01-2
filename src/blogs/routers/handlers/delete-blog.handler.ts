import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';

export async function deleteBlogHandler(req: Request<{ id: string }>,
                                        res: Response) {
    try {
        const id = req.params.id;
        const deleteBlog = await blogsRepository.findById(id);

        if (!deleteBlog) {
            res.sendStatus(HttpStatus.NotFound_404)
            return;
        }

        await blogsRepository.delete(id);
        res.sendStatus(HttpStatus.NoContent_204);
    } catch (e: unknown) {
        res.sendStatus(HttpStatus.InternalServerError_500);
    }
}