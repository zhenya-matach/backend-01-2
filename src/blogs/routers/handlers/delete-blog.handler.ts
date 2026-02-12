import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';

export function deleteBlogHandler(req: Request<{id:string}>,
                                  res: Response) {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);

    if (!blog) {
        res.sendStatus(HttpStatus.NotFound_404)
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