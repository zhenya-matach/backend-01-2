import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {createErrorMessages} from '../../../core/utils/error.utils';

export function getBlogHandler(req: Request, res: Response) {
    const id = req.params.id.toString();
    const blog = blogsRepository.findById(id);
    if (!blog) {
        res
            .status(HttpStatus.NotFound_404)
            .send(
                createErrorMessages([{field: 'ID', message: 'Blog not found'}])
            );
        return;
    }
    res.status(HttpStatus.Ok_200).send(blog);
}


//const id = req.params.id;
//         const blog = db.blogs.find((b) => b.id === id);
//
//         if (!blog) {
//             res
//                 .status(HttpStatus.NotFound_404)
//                 .send(createErrorMessages([{field: 'id', message: 'Блог не найден'}])
//                 );
//             return;
//         }
//         res.status(HttpStatus.Ok_200).send(blog);