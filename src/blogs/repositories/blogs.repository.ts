import {db} from '../../db/db';
import {Blog} from "../types/blog";
import {blogInputDto} from '../dto/blog-input.dto';


export const blogsRepository = {
    findAll(): Blog[] {
        return db.blogs;
    },

    findById(id: string): Blog | null {
        return db.blogs.find((b) => b.id === id) ?? null; // Если результат поиска равно null или undefined, то вернем null.
    },

    create(newBlog: Blog): Blog {
        db.blogs.push(newBlog);
        return newBlog;
    },

    update(id: string, dto: blogInputDto): void {
        const blog = db.blogs.find((b) => b.id === id);

        if (!blog) {
            throw new Error('Blog not exist');
        }

        blog.name = dto.name;
        blog.description = dto.description;
        blog.websiteUrl = dto.websiteUrl;

        return;
    },

    delete(id: string): void {
        const index = db.blogs.findIndex((b) => b.id === id);

        if (index === -1) {
            throw new Error('Blog not exist');
        }

        db.blogs.splice(index, 1);
        return;
    },
};
