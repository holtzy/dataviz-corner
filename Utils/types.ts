export const topics = ['R', 'python', 'd3', 'react', 'julia', 'tableau', 'news', 'tech', 'theory', 'conference', 'product', 'data journalism', 'scrollytelling'] as const
export type Topic = typeof topics[number]

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
    blogTitle: string;
    img: string;
}

export type PostOverview = {
    creator: string,
    title: string,
    link: string,
    pubDate: Date,
    isoDate: Date,
    content: string,
    contentSnippet: string
    blogTitle: string;
    img: string;

}

export type Blog = {
    feedUrl: string;
    url: string,
    image: string;
    title: string;
    description: string;
    twitter?: string;
    topics: Topic[]
}

