import {Request, Response} from 'express';
import {Blog} from '../../types/blog';
import {db} from '../../../db/db';
import {HttpStatus} from '../../../core/types/httpStatutes';
import {blogsRepository} from '../../repositories/blogs.repository';
import {blogInputDto} from '../../dto/blog-input.dto';

export function createBlogHandler(req: Request<{},{},blogInputDto>,
                                  res: Response<Blog>) {
    const newBlog: Blog = {
        id: db.blogs.length ? (parseInt(db.blogs[db.blogs.length - 1].id) + 1).toString() : '1',
        name: req.body.name,
        description: req.body.description,
        websiteUrl: req.body.websiteUrl,
        isMembership: false
    };

    blogsRepository.create(newBlog);

    res
        .status(HttpStatus.Created_201)
        .send(newBlog);
}

//  const newBlog: Blog = {
//             id: db.blogs.length ? (db.blogs[db.blogs.length - 1].id + 1).toString() : '1',
//             name: req.body.name,
//             description: req.body.description,
//             websiteUrl: req.body.websiteUrl,
//         };
//         db.blogs.push(newBlog);
//         res.status(HttpStatus.Created_201).send(newBlog);