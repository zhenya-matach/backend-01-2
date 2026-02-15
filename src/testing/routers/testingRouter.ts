import {Request, Response, Router} from "express";
import {HttpStatus} from "../../core/types/httpStatutes";
import {blogCollection, postCollection} from '../../db/mongo.db';


export const testingRouter = Router();

testingRouter.delete('/all-data', async (req:Request, res: Response) => {
    await Promise.all([
        blogCollection.deleteMany(),
        postCollection.deleteMany()
    ]);
    res.sendStatus(HttpStatus.NoContent_204);
});
