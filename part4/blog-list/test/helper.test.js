const { describe, test, beforeEach, after } = require("node:test");
const assert = require("node:assert");
const listHelper = require("../utils/list_helper");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);
const Blog = require("../models/blog");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  const result = await Blog.insertMany(blogs);
});

test("dummy return one", () => {
  const result = listHelper.dummy(blogs);
  assert.strictEqual(result, 1);
});

describe("total likes", () => {
  test("Count the total number of likes", () => {
    const result = listHelper.totalLikes(blogs);
    assert.strictEqual(result, 36);
  });
});

describe("favorite blog", () => {
  test("Return the blog with the most likes", () => {
    const result = listHelper.favoriteBlog(blogs);
    assert.strictEqual(result.title, "Canonical string reduction");
  });
});

describe("most blogs", () => {
  test("Return the author with the most blogs", () => {
    const result = listHelper.mostBlogs(blogs);
    assert.strictEqual(result.author, "Robert C. Martin");
  });
});

describe("most likes", () => {
  test("Return the author with the most likes", () => {
    const result = listHelper.mostLikes(blogs);
    assert.strictEqual(result.author, "Edsger W. Dijkstra");
  });
});

describe("HTTP GET request /api/blogs", () => {
  test("Return the blogs in the correct format", async () => {
    const response = await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, 4);
  });
});

describe("Verify property id", () => {
  test("Id with valid format", async () => {
    const response = await api.get("/api/blogs");

    response.body.forEach((blog) => {
      assert.ok(blog.hasOwnProperty("id"));
      assert.ok(!blog.hasOwnProperty("_id"));
    });
  });
});

describe("HTTP POST request /api/blogs", () => {
  test("Create a new blog", async () => {
    const response = await api
      .post("/api/blogs")
      .send({
        title: "Django for beginners",
        author: "asx-dev",
        url: "http://somerandom.com",
        likes: 28,
      })
      .expect(201);
    const blogs = await api.get("/api/blogs");
    assert.strictEqual(blogs.body.length, 7);
    assert.strictEqual(blogs.body[6].title, "Django for beginners");
  });
});

describe("Verify if the likes property is missing", () => {
  test("Like default value 0", async () => {
    const response = await api.post("/api/blogs").send({
      title: "New blog",
      author: "new-author",
      url: "http://newblog.com",
    });
    assert.strictEqual(response.body.likes, 0);
  });
});

describe("Verify if the title and url are missing", () => {
  test("Title and url are missing", async () => {
    const response = await api.post("/api/blogs").send({
      author: "author",
      likes: 10,
    });
    assert.strictEqual(response.status, 400);
  });
});
