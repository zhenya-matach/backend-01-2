export const SETTINGS = {
    PORT: process.env.PORT || 5003,
    MONGO_URL:
        process.env.MONGO_URL ||
        'mongodb+srv://root:root@cluster0.m3ghtnl.mongodb.net/?appName=Cluster0',
    DB_NAME: process.env.DB_NAME || 'bloggers-platform'
};