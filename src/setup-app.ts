import express, { Express } from "express";
import {HttpStatus} from "./core/types/httpStatutes";
import {blogsRouter} from "./blogs/routers/blogsRouter";

export const setupApp = (app: Express) => {
    app.use(express.json()); // middleware для парсинга JSON в теле запроса

    // основной роут
    app.get('/', (req, res) => {
        res.status(HttpStatus.Ok_200).send("Hello world!");
    });

    app.use('/blogs', blogsRouter);

    // app.use('/posts', postsRouter);

    // app.use('/testing', testingRouter);

    return app;
};