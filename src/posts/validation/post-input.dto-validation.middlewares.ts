import {body} from "express-validator";


const titleValidation = body('title')
    .isString()
    .withMessage('title should be string')
    .trim().isLength({min: 3, max: 30})
    .withMessage('title length should be from 3 to 30 symbols');

const shortDescriptionValidation = body('shortDescription')
    .isString()
    .withMessage('shortDescription should be string')
    .trim().isLength({min: 3, max: 100})
    .withMessage('shortDescription length should be from 3 to 100 symbols');

const contentValidation = body('content')
    .isString()
    .withMessage('content should be string')
    .trim().isLength({min: 3, max: 1000})
    .withMessage('content length should be from 3 to 1000 symbols');

const blogIdValidation = body('blogId')
    .isString()
    .withMessage('blogId should be string')
    .trim().isLength({min: 1, max: 10})
    .withMessage('blogId length should be from 1 to 10 symbols')
    .isNumeric()
    .withMessage('blogId should be a numeric string');

export const postInputDtoValidation = [
    titleValidation.trim,
    shortDescriptionValidation,
    contentValidation,
    blogIdValidation
]