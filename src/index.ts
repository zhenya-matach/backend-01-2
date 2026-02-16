import express from "express";
import {setupApp} from "./setup-app";
import {runDB} from './db/mongo.db';
import dotenv from 'dotenv'
dotenv.config()

const bootstrap = async () => {

    const app = express(); // создание приложения
    setupApp(app);

    if (!process.env.MONGO_URL || !process.env.PORT) {
        throw new Error("❌ MONGO_URL or PORT environment variable is not set");
    }

    await runDB(process.env.MONGO_URL);

    app.listen(process.env.PORT, () => {
        console.log(`Example app listening on port ${process.env.PORT}`) // запуск приложения
    });

    return app;
};

bootstrap();