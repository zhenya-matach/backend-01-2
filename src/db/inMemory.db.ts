import {Blog} from "../blogs/types/blog";
import {Post} from "../posts/types/post";

export const db = {
    blogs: <Blog[]>[
        {
            id: 1,
            name: 'Yauheni Matach',
            description: 'A blog by a novice Node.js programmer',
            websiteUrl: 'https://www.my-app.com',
        }
    ],
    posts: <Post[]>[
        {
            id: 1,
            title: 'Hello world',
            shortDescription: 'My APP',
            content: 'Application for posts and blogs',
            blogId: '1',
            blogName: 'Yauheni Matach',
        }
    ]
}