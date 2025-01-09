const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((sum, blog) => sum + blog.likes, 0)
    : 0;
};

const favoriteBlog = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce(
        (favorite, current) =>
          favorite.likes > current.likes ? favorite : current,
        blogs[0]
      )
    : null;
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;

  const authorBlogCount = new Map();
  blogs.forEach((blog) => {
    authorBlogCount.set(
      blog.author,
      (authorBlogCount.get(blog.author) || 0) + 1
    );
  });

  const topAuthor = { author: null, blogs: 0 };

  for (const [author, count] of authorBlogCount) {
    if (count > topAuthor.blogs) {
      topAuthor.author = author;
      topAuthor.blogs = count;
    }
  }
  return topAuthor;
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;

  let topAuthor = blogs.reduce((top, current) =>
    top.likes > current.likes ? top : current
  );

  return { author: topAuthor.author, likes: topAuthor.likes };
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
