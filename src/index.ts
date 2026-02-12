import express from "express";
import {setupApp} from "./setup-app";
import {runDB} from './db/mongo.db';
import {SETTINGS} from './core/settings/settings';

const bootstrap = async () => {

    const app = express(); // создание приложения
    setupApp(app);

    await runDB(SETTINGS.MONGO_URL);

    app.listen(SETTINGS.PORT, () => {
        console.log(`Example app listening on port ${SETTINGS.PORT}`) // запуск приложения
    });

    return app;
};

bootstrap();