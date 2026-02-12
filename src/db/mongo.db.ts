import {Collection, Db, MongoClient} from 'mongodb';
import {Blog} from '../blogs/types/blog';
import {Post} from '../posts/types/post';
import {SETTINGS} from '../core/settings/settings';

const BLOG_COLLECTION_NAME = 'blogs';
const POST_COLLECTION_NAME = 'posts';

export let client: MongoClient;
export let blogCollection: Collection<Blog>;
export let postCollection: Collection<Post>;

// Подключения к бд
export async function runDB(url: string): Promise<void> {
    client = new MongoClient(url);
    const db: Db = client.db(SETTINGS.DB_NAME);

    //Инициализация коллекций
    blogCollection = db.collection<Blog>(BLOG_COLLECTION_NAME);
    postCollection = db.collection<Post>(POST_COLLECTION_NAME);

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