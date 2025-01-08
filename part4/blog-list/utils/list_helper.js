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
// TODO: Solve the problem of use tha map to save the authors and then the result
const mostBlogs = (blogs) => {
  const authors = new Map();
  blogs.forEach((blog) => {
    authors.has(blog.author)
      ? authors.set(blog.author, authors.get(blog.author) + 1)
      : authors.set(blog.author, 1);
  });
  // const author = Array.from(authors.entries()).reduce(
  //   (top, current) => (authors.get(top) > authors.get(current) ? top : current),
  //   authors[0]
  // );
  // console.log("Something is happening");
  // console.log(author);
  console.log(Object.entries(authors));
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs };
