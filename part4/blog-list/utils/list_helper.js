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

module.exports = { dummy, totalLikes, favoriteBlog };
