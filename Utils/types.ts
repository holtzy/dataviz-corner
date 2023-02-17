export const topics = ['R', 'python', 'd3', 'react', 'julia', 'tableau', 'news'] as const
export type Topic = typeof topics

export type Post = {
    creator: string,
    title: string,
    link: string,
    pubDate: Date,
    ['content:encoded']: string,
    ['content:encodedSnippet']: string,
    isoDate: Date,
    content: string,
    contentSnippet: string
}

export type PostOverview = {
    creator: string,
    title: string,
    link: string,
    pubDate: Date,
    isoDate: Date,
    content: string,
    contentSnippet: string
}

export type Blog = {
    url: string;
    twitter: string;
    topics: Topic[]
}
