import {Request, Response} from 'express';
import {blogsRepository} from "../../repositories/blogs.repository";
import {HttpStatus} from '../../../core/types/httpStatutes';

export function getBlogListHandler(req: Request, res: Response) {
    const blogs = blogsRepository.findAll();
    res.status(HttpStatus.Ok_200).send(blogs);
}

// res.status(HttpStatus.Ok_200).send(db.blogs)