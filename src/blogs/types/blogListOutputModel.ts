export type BlogListOutputModel = {
    data: {
        id: string,
        name: string;
        description: string;
        websiteUrl: string;
        createdAt: string;
        isMembership: boolean;
    }[]
};