const express = require("express");
const session = require("express-session");
const flash = require("connect-flash");
const axios = require("axios");
const nodemailer = require("nodemailer");
const { text } = require("express");
require("dotenv").config();
const { GoogleSpreadsheet } = require("google-spreadsheet");
var cron = require("node-cron");
const app = express();

app.set("view engine", "ejs");

app.use(
  session({
    secret: "prannay",
    cookie: { maxAge: 60000 },
    saveUninitialized: false,
    resave: false,
  })
);

app.use(flash());
app.use(express.static(__dirname + "/views"));

//Parse URL-encoded bodies
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get("/", (req, res) => {
  res.render("pages/index", { message: req.flash("message") });
});

app.get("/about-me", (req, res) => {
  res.render("pages/about-me");
});

app.get("/aggregate-terminal", (req, res) => {
  res.render("pages/aggregate-terminal");
});

app.get("/contact-me", (req, res) => {
  res.render("pages/contact-me", { message: req.flash("message") });
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
  console.log(blogs);
  res.render("pages/blogs", {
    blogs: blogs,
  });
});

app.get("/blog/:slug", async (req, res) => {
  const slug = req.params.slug;
  const blog = await getBlog(slug);

  res.render("pages/blog", {
    blog: blog,
    message: req.flash("message"),
  });
});

// Function to send Email
async function sendMail(senderName, fromMail, toMail, sub, textBody) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${senderName} <prannaykedia4@gmail.com>`, // sender address
    replyTo: fromMail, // Sender's Email
    to: toMail, // list of receivers
    subject: sub, // Subject line
    text: textBody, // plain text body
  });

  console.log("Message sent: %s", info.messageId);
}

// Register a new subscriber to newsletter
app.post("/register-subscriber", async function (req, res) {
  const toMail = "prannaykedia1@gmail.com";
  await sendMail(
    "",
    "prannaykedia1@gmail.com",
    toMail,
    "New Subscriber to your Newsletter!",
    `${req.body.email} subscribed to your newsletter at ${new Date()}`
  ).catch(console.error);

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const newsletter = doc.sheetsByIndex[1];
  const addRow = await newsletter.addRow({
    "Email ID": req.body.email,
    Timestamp: new Date(),
  });

  console.log("Row Added: ", addRow);

  req.flash("message", "Thank you for Subscribing!");
  res.redirect(req.get("referer"));
});

// Contact Me Page Send Message
app.post("/send-message", async function (req, res) {
  const name = req.body.first_name + " " + req.body.last_name;
  const toMail = "prannaykedia1@gmail.com";
  await sendMail(
    name,
    req.body.email,
    toMail,
    name + " reached out to you through your website",
    req.body.message
  ).catch(console.error);

  const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
  await doc.useServiceAccountAuth({
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY,
  });

  await doc.loadInfo();
  const contactMe = doc.sheetsByIndex[0];
  // const newsletter = doc.sheetsByIndex[1];
  const addRow = await contactMe.addRow({
    Date: new Date(),
    Name: name,
    "Email Address": req.body.email,
    "Phone Number": req.body.phone_number,
    Company: req.body.company,
    Text: req.body.message,
  });

  console.log("Row Added: ", addRow);

  req.flash("message", "Thank you for Reaching Out!");
  res.redirect("contact-me");
});

// Get All Blogs from Ghost
async function getAllBlogs() {
  const apiURL = `https://blogs.prannaykedia.com/ghost/api/content/posts?key=${process.env.GHOST_KEY}&limit=all&include=tags,authors`;
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

// Get Specific Blog Post
async function getBlog(slug) {
  const apiURL = `https://blogs.prannaykedia.com/ghost/api/content/posts/slug/${slug}?key=${process.env.GHOST_KEY}`;

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

// sitemap
app.get("/sitemap.xml", async function (req, res) {
  let data = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  `;

  const urls = [];

  let urlList = [
    {
      loc: "https://www.prannaykedia.com/",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/about-me",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/aggregate-terminal",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/contact-me",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/blogs",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/film-making",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/photography",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/start-up",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/flirtaid",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
    {
      loc: "https://www.prannaykedia.com/projects",
      lastmod: "2023-02-14T19:34:00+01:00",
    },
  ];

  let ghostCall = await axios.get(
    `https://blogs.prannaykedia.com/ghost/api/content/posts?key=${process.env.GHOST_KEY}&limit=all&fields=slug,updated_at`
  );

  ghostCall.data.posts.forEach((blog) => {
    urlList.push({
      loc: "https://www.prannaykedia.com/blog/" + blog.slug,
      lastmod: blog.updated_at,
    });
  });

  urlList.forEach((url) => {
    urls.push(`<url>
              <loc>${url.loc}</loc>
              <lastmod>${url.lastmod}</lastmod>
          </url>`);
  });

  data += urls.join("\n");
  data += `</urlset>`;

  res.header("Content-Type", "application/xml");
  res.status(200).send(data);
});

//Robots
app.get("/robots.txt", function (req, res) {
  res.type("text/plain");
  res.status(200).send(`User-agent: *
Allow:
Disallow:   

Sitemap: https://www.prannaykedia.com/sitemap.xml`);
});

cron.schedule("0 0 * * 0", async () => {
  await axios.get(
    "https://www.google.com/ping?sitemap=https://prannaykedia.com/sitemap.xml"
  );

  sendMail(
    "Prannay Kedia",
    "prannaykedia1@gmail.com",
    "prannaykedia4@gmail.com",
    "Sitemap Submitted for Prannay Kedia",
    "Sitemap updation request submitted to Google at : " + Date.now()
  ).catch(console.error);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening at port ${port}`);
});
