import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {createErrorMessages} from '../../../core/utils/error.utils';

export function deleteBlogHandler(req: Request, res: Response) {
    const id = req.params.id.toString();
    const blog = blogsRepository.findById(id);

    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{field: 'id', message: 'Blog not found'}]),
            );
        return;
    }

    blogsRepository.delete(id);
    res.sendStatus(HttpStatus.NoContent_204);
}

//  const index = db.blogs.findIndex((b) => b.id === req.params.id);
//         if (index === -1) {
//             res.sendStatus(HttpStatus.NotFound_404);
//         }
//         db.blogs.splice(index, 1);
//         res.sendStatus(HttpStatus.NoContent_204);