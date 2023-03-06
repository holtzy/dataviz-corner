import Head from "next/head";
import { PostOverview } from "components/PostOverview";
import { Post } from "utils/types";
import fsPromises from "fs/promises";
import path from "path";
import { HeaderSection } from "components/HeaderSection";
import Contact from "components/Contact";
import { TopicPills } from "components/TopicPills";
import { SideBarTitle } from "components/SideBarTitle";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import Link from "next/link";
import { slugify } from "utils/slugify";
import { HeadSeo } from "components/HeadSeo";
import { VoronoiBackground } from "components/VoronoiBackground";

export default function About() {
  return (
    <>
      <HeadSeo title={"Dataviz blogs"} seoDescription={"An aggregator of dataviz blogs"} />

      <div className="rounded-full overflow-hidden" style={{ width: 500, height: 500 }}>
        <VoronoiBackground width={500} height={500} />
      </div>
      <Contact />
      <div className="wrapper">
        <Footer />
      </div>
    </>
  );
}
