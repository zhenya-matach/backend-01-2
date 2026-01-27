import {Router, Request, Response} from "express";
import {HttpStatus} from "../../core/types/httpStatutes";
import {db} from "../../db/inMemory.db";
import {
    createErrorMessages,
    inputValidationResultMiddleware
} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog-input.dto-validation.middlewares";
import {Blog} from "../types/blog";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";


export const blogsRouter = Router();

blogsRouter
    .get('', (req: Request, res: Response) => {
        res.status(HttpStatus.Ok_200).send(db.blogs);
    })

    .get('/:id', idValidation, inputValidationResultMiddleware, (req: Request, res: Response) => {
        const id = req.params.id;
        const blog = db.blogs.find((b) => b.id === id);

        if (!blog) {
            res
                .status(HttpStatus.NotFound_404)
                .send(createErrorMessages([{field: 'id', message: 'Блог не найден'}])
                );
            return;
        }
        res.status(HttpStatus.Ok_200).send(blog);

    })

    .post('', blogInputDtoValidation, inputValidationResultMiddleware, (req: Request, res: Response) => {

        const newBlog: Blog = {
            id: db.blogs.length ? (db.blogs[db.blogs.length - 1].id + 1).toString() : '1',
            name: req.body.name,
            description: req.body.description,
            websiteUrl: req.body.websiteUrl,
        };
        db.blogs.push(newBlog);
        res.status(HttpStatus.Created_201).send(newBlog);
    })

    .put('/:id', idValidation, blogInputDtoValidation, inputValidationResultMiddleware, (req: Request, res: Response) => {

        const index = db.blogs.findIndex((b) => b.id === req.params.id)
        if (index === -1) {
            res.status(HttpStatus.NotFound_404);
        }

        const blog = db.blogs[index];
        const updatedBlog: Blog = {
            id: blog.id,
            name: req.body.name || blog.name,
            description: req.body.description || blog.description,
            websiteUrl: req.body.websiteUrl || blog.websiteUrl,
        };

        Object.assign(blog, updatedBlog);
        res.status(HttpStatus.NoContent_204)
    })

    .delete('/:id', idValidation, inputValidationResultMiddleware, (req: Request, res: Response) => {
        const index = db.blogs.findIndex((b) => b.id === req.params.id);
        if (index === -1) {
            res.sendStatus(HttpStatus.NotFound_404);
        }
        db.blogs.splice(index, 1);
        res.sendStatus(HttpStatus.NoContent_204);
    })
