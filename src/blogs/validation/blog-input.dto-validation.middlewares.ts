import {body} from "express-validator";


const nameValidation = body('name')
    .isString()
    .withMessage('name should be string')
    .trim().isLength({min: 2, max: 15})
    .withMessage('name length should be from 2 to 15 symbols');

const descriptionValidation = body('description')
    .isString()
    .withMessage('description should be string')
    .trim().isLength({min: 2, max: 500})
    .withMessage('description length should be from 2 to 500 symbols');

const websiteUrlValidation = body('websiteUrl')
    .isString()
    .withMessage('websiteUrl should be string')
    .trim().isLength({min: 6, max: 100})
    .withMessage('websiteUrl length should be from 2 to 500 symbols')
    .isURL()
    .withMessage('websiteUrl should be a valid URL');

export const blogInputDtoValidation = [
    nameValidation,
    descriptionValidation,
    websiteUrlValidation,
]