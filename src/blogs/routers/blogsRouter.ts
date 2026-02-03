import {Router} from "express";
import {inputValidationResultMiddleware} from "../../core/middlewares/validation/input-validtion-result.middleware";
import {blogInputDtoValidation} from "../validation/blog-input.dto-validation.middlewares";
import {idValidation} from "../../core/middlewares/validation/params-id.validation-middleware";
import {getBlogListHandler} from "./handlers/get-blog-list.handler";
import {getBlogHandler} from './handlers/get-blog.handler';
import {createBlogHandler} from './handlers/create-blog.handler';
import {updateBlogHandler} from './handlers/update-blog.handler';
import {deleteBlogHandler} from './handlers/delete-blog.handler';


export const blogsRouter = Router();

blogsRouter
    .get('', getBlogListHandler)

    .get('/:id', idValidation, inputValidationResultMiddleware, getBlogHandler)

    .post('', blogInputDtoValidation, inputValidationResultMiddleware, createBlogHandler)

    .put('/:id', idValidation, blogInputDtoValidation, inputValidationResultMiddleware, updateBlogHandler)

    .delete('/:id', idValidation, inputValidationResultMiddleware, deleteBlogHandler);
