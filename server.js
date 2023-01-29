const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));

app.get("/", (req, res) => {
  res.render("pages/index");
});

app.get("/about-me", (req, res) => {
  res.render("pages/about-me");
});

app.get("/aggregate-terminal", (req, res) => {
  res.render("pages/aggregate-terminal");
});

app.get("/contact-me", (req, res) => {
  res.render("pages/contact-me");
});

app.get("/film-making", (req, res) => {
  res.render("pages/film-making");
});

app.get("/flirtaid", (req, res) => {
  res.render("pages/flirtaid");
});

app.get("/photography", (req, res) => {
  res.render("pages/photography");
});

app.get("/projects", (req, res) => {
  res.render("pages/projects");
});

app.get("/start-up", (req, res) => {
  res.render("pages/start-up");
});

app.get("/blogs", async (req, res) => {
  blogs = await getAllBlogs();

  res.render("pages/blogs", {
    blogs: blogs,
  });
});

app.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;
  const blog = await getBlog(slug);

  res.render("pages/blog", {
    blog: blog,
  });
});

async function getAllBlogs() {
  const apiURL =
    "https://blogs.prannaykedia.com/ghost/api/content/posts?key=dcf7b4cfd75e371353afd4e888&limit=all";
  let blogs = [];
  await axios
    .get(apiURL)
    .then((response) => {
      blogs = response.data.posts;
    })
    .catch((err) => {
      console.error(err);
    });

  return blogs;
}

async function getBlog(slug) {
  const apiURL = `https://blogs.prannaykedia.com/ghost/api/content/posts/slug/${slug}?key=dcf7b4cfd75e371353afd4e888`;

  let blog = [];
  await axios
    .get(apiURL)
    .then((response) => {
      blog = response.data.posts;
    })
    .catch((err) => {
      console.error(err);
    });

  return blog[0];
}

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
