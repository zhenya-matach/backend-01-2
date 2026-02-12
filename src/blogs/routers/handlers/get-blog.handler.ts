import {Request, Response} from 'express';
import {blogsRepository} from '../../repositories/blogs.repository';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {Blog} from '../../types/blog';

export function getBlogHandler(req: Request<{id:string}>,
                               res: Response<Blog>) {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);
    if (!blog) {
        res.sendStatus(HttpStatus.NotFound_404)
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