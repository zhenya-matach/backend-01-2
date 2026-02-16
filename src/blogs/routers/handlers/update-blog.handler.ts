import {Request, Response} from 'express';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {blogsRepository} from '../../repositories/blogs.repository';
import {BlogInputModel} from '../../types/blogInputModel';

export async function updateBlogHandler(req: Request<{id:string},{},BlogInputModel>,
                                        res: Response) {
    const id = req.params.id;
    const foundBlog = blogsRepository.findById(id);

    if (!foundBlog) {
        res.sendStatus(HttpStatus.NotFound_404)
        return;
    }

    await blogsRepository.update(id, req.body);
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