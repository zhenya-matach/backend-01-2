import {Collection, Db, MongoClient} from 'mongodb';
import {BlogMongoModel} from '../blogs/types/blogMongoModel';
import {PostMongoModel} from '../posts/types/postMongoModel';
import dotenv from 'dotenv'
dotenv.config()

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<BlogMongoModel>;
export let postCollection: Collection<PostMongoModel>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(process.env.DB_NAME);

    //Инициализация коллекций
    blogCollection = db.collection<BlogMongoModel>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<PostMongoModel>(POST_COLLECTION_NAME);

    try {
        await client.connect();
        await db.command({ping: 1});
        console.log('✅ Connected to the database');
        console.log('✅ url:', url);
    } catch (e) {
        await client.close();
        throw new Error(`❌ Database not connected: ${e}`);
    }
}
// const uri = "mongodb+srv://root:root@cluster0.m3ghtnl.mongodb.net/?appName=Cluster0";