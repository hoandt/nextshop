import { readFile, readdir } from "fs/promises";
import marked from "marked";
import matter from "gray-matter";
export const getPost = async (slug) => {
  try {
    const source = await readFile(`content/${slug}.md`, "utf-8");

    const {
      data: { title, date },
      content,
    } = matter(source);
    const body = marked(content);
    const data = {
      title,
      date,
      body,
    };
    return data;
  } catch (error) {
    console.log("****", error);
  }
};
export const getPosts = async () => {
  const slugs = await getSlugs();
  const posts = [];
  for (const slug of slugs) {
    posts.push({ slug, ...(await getPost(slug)) });
  }
  return posts;
};
export const getSlugs = async () => {
  const suffix = ".md";
  const slugs = await readdir("content/", "utf-8");

  return slugs
    .filter((s) => s.endsWith(suffix))
    .map((slug) => slug.slice(0, -suffix.length));
};
