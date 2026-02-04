import express, { Express } from "express";
import {HttpStatus} from "./core/types/httpStatutes";
import {BLOGS_PATH, POSTS_PATH, TESTING_PATH} from './core/paths/paths';
import {blogsRouter} from "./blogs/routers/blogsRouter";
import {testingRouter} from './testing/routers/testingRouter';
import {postsRouter} from './posts/routers/postsRouter';

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get('/', (req, res) => {
        res.status(HttpStatus.Ok_200).send("Hello world!");
    });

    app.use(BLOGS_PATH, blogsRouter);

    app.use(POSTS_PATH, postsRouter);

    app.use(TESTING_PATH, testingRouter);

    return app;
};