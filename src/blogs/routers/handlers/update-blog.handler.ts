import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {blogsRepository} from '../../repositories/blogs.repository';
import {blogInputDto} from '../../dto/blog-input.dto';

export function updateBlogHandler(req: Request<{id:string},{},blogInputDto>,
                                  res: Response) {
    const id = req.params.id;
    const blog = blogsRepository.findById(id);

    if (!blog) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    blogsRepository.update(id, req.body);
    res.sendStatus(HttpStatus.NoContent_204);


    // const index = db.blogs.findIndex((b) => b.id === req.params.id)
//         if (index === -1) {
//             res.status(HttpStatus.NotFound_404);
//         }
//
//         const blog = db.blogs[index];
//         const updatedBlog: Blog = {
//             id: blog.id,
//             name: req.body.name || blog.name,
//             description: req.body.description || blog.description,
//             websiteUrl: req.body.websiteUrl || blog.websiteUrl,
//         };
//
//         Object.assign(blog, updatedBlog);
//         res.status(HttpStatus.NoContent_204)
}