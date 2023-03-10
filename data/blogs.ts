// Types are defined in the util/types.ts file
// but I cannot import anything here, so I have to copy paste them
// do not modify the types here. modify them in the util file and paste here
const topics = ['R', 'python', 'd3', 'react', 'julia', 'tableau', 'news', 'tech', 'theory', 'conference', 'product', 'data journalism', 'scrollytelling'] as const
type Topic = typeof topics[number]

type Blog = {
    feedUrl: string;
    url: string,
    image: string;
    title: string;
    description: string;
    twitter?: string;
    topics: Topic[];
    img: string;
}

export const blogs: Blog[] = [
    {
        feedUrl: "https://blog.datawrapper.de/feed/",
        url: "https://blog.datawrapper.de",
        image: "https://blog.datawrapper.de/wp-content/uploads/2021/03/favicon.png",
        title: "Datawrapper Blog",
        description: "Weekly Charts, Data Vis How-To’s and Datawrapper Feature news",
        twitter: 'https://twitter.com/Datawrapper?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
        topics: ['product', 'theory'],
        img: 'dataWrapper.jpeg'
    },
    {
        feedUrl: "https://datavis.blog/feed/",
        url: "https://datavis.blog",
        image: "",
        title: "Datavis.blog",
        description: "Notes on Tableau and Data Visualisation",
        twitter: 'https://twitter.com/datavisblog',
        topics: ['tableau'],
        img: ''
    },
    {
        feedUrl: "https://datajournalism.com/read/rss/longreads.xml",
        url: "datajournalism.com",
        image: "",
        title: "DataJournalism.com",
        description: "Where journalism meets data: http://DataJournalism.com is a space to read, watch, and discuss everything data.",
        twitter: 'https://twitter.com/datajournalism?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
        topics: ['data journalism'],
        img: 'dataJournalism.png'
    },
    {
        feedUrl: "https://flowingdata.com/feed",
        url: "flowingdata.com",
        image: "",
        title: "Flowing Data",
        description: "FlowingData explores how we use analysis and visualization to understand data and ourselves. The blog - a combination of highlighting others' work, my own projects, and visualization guides - is a free resource for everyone.",
        twitter: 'https://twitter.com/flowingdata?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
        topics: ['theory', 'R', 'tech'],
        img: 'flowingData.png'
    },
    {
        feedUrl: "https://www.theplot.media/feed",
        url: "https://www.theplot.media",
        image: "",
        title: "The Plot",
        description: "The Plot is a weekly newsletter that will make you a better data storyteller. Here I explore projects, reflect on ideas and suggest tips that can help you improve your work. With each edition, I aim to both inspire you and provide practical tricks you can implement right away.",
        twitter: 'https://twitter.com/parabolestudio',
        topics: ['theory'],
        img: 'thePlot.jpeg'
    },
    {
        feedUrl: "https://cognitivefeedbackloop.com/feed",
        url: "https://cognitivefeedbackloop.com",
        image: "",
        title: "Cognitive Feedback Loop",
        description: "Science explained. Data illustrated.",
        twitter: 'https://twitter.com/RobLawrencium',
        topics: ['theory'],
        img: ''
    },
    {
        feedUrl: "https://pudding.cool/feed",
        url: "https://pudding.cool",
        image: "",
        title: "The Pudding",
        description: "A digital publication that explains ideas debated in culture with visual essays.",
        twitter: 'https://twitter.com/puddingviz?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor',
        topics: ['data journalism', 'scrollytelling'],
        img: ''
    },
    {
        feedUrl: "http://www.vis4.net/blog/atom.xml",
        url: "http://www.vis4.net/blog/",
        image: "",
        title: "vis4.net",
        description: "Random thoughts on visualization and data journalism by Gregor Aisch.",
        twitter: undefined,
        topics: ['data journalism', 'scrollytelling'],
        img: ''
    },
    {
        feedUrl: "http://www.thefunctionalart.com/feeds/posts/default",
        url: "http://www.thefunctionalart.com",
        image: "",
        title: "The Functional Art",
        description: "an introduction to Information Graphics and Visualization, the communication of facts and data by means of charts, graphs, maps, and diagrams.",
        twitter: 'https://twitter.com/AlbertoCairo',
        topics: ['theory'],
        img: 'cairo.png'
    },
    {
        feedUrl: "https://questionsindataviz.com/feed",
        url: "https://questionsindataviz.com",
        image: "",
        title: "Question in dataviz",
        description: "A blog about data visualisation and visualisations.",
        twitter: 'https://twitter.com/theneilrichards',
        topics: ['tableau', 'theory'],
        img: ''
    }

    // TODO: five thirty height but find a way to filter dataviz articles
    // https://junkcharts.typepad.com/junk_charts/atom.xml

]

