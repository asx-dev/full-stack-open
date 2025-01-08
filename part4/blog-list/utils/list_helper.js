const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.length > 0
    ? blogs.reduce((sum, blog) => sum + blog.likes, 0)
    : 0;
};

// For example this part
module.exports = { dummy, totalLikes };
