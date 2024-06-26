const express = require("express"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  bodyParser = require("body-parser"),
  LocalStrategy = require("passport-local").Strategy,
  passportLocalMongoose = require("passport-local-mongoose");
const User = require("./model/User");
const Post = require("./model/Post");
const Comment = require("./model/Comment");
const bcrypt = require("bcrypt");
const { name } = require("ejs");
const session = require("express-session");
let app = express();
const multer = require("multer");
// Configure Multer storage
const storage = multer.diskStorage({
  // Set the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, "public/uploads/"); // Files will be saved in the 'uploads/' directory
  },
  // Set the filename for uploaded files
  filename: (req, file, cb) => {
    // Prepend the current timestamp to the original filename to ensure uniqueness
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // Accept only image files (jpeg, png)
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG and PNG files are allowed."),
      false
    );
  }
};

// Create a Multer instance with the configured storage settings
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

mongoose.connect(
  "mongodb+srv://trieuduong:mithapnang12@colonthree.4y5dmo3.mongodb.net/?retryWrites=true&w=majority&appName=colonthree"
);

app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs");
app.set("trust proxy", 1);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: "real secret",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 28 },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },

    async (email, password, done) => {
      try {
        // Find the user by email in the database
        const user = await User.findOne({ email });
        console.log("user" + user);
        // If the user does not exist, return an error
        if (!user) {
          return done(null, false, { error: "Incorrect email" });
        }

        // Compare the provided password with the
        // hashed password in the database
        const passwordsMatch = await bcrypt.compare(password, user.password);

        // If the passwords match, return the user object
        if (passwordsMatch) {
          return done(null, user, { message: "Logged In Successfully" });
        } else {
          // If the passwords don't match, return an error
          return done(null, false, { error: "Incorrect password" });
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => {
      done(err, null);
    });
});

//=====================
// ROUTES
//=====================

// Showing home page
app.get("/", function (req, res) {
  res.render("landingPage");
});

// Showing secret page
app.get("/thread", isLoggedIn, async function (req, res) {
  const posts = await Post.find({ archived: false });
  res.render("thread", {
    user: req.user,
    posts
  });
});

// Showing register form
app.get("/register", function (req, res) {
  res.render("signUp");
});

// Handling user signup
app.post("/register", async (req, res) => {
  const user = await User.create({
    username: req.body.username,
    email: req.body.email,
    password: await bcrypt.hash(req.body.password, 10),
  });
  console.log("logged");
  setTimeout(() => {
    res.redirect("/login");
    return res.status(200);
  }, 1000);
});

//Showing login form
// app.get("/login", function (req, res) {
//   if (req.session.email) {
//     return res.redirect("/thread");
//   }
//   return res.render("login");
// });

app.get("/login", function (req, res) {
  res.render("logIn");
});

//Handling user login
app.post("/login", function (req, res, next) {
  console.log("real");
  passport.authenticate("local", async (err, user, info) => {
    console.log(req.body);
    console.log("err:", err);
    console.log("user:", user);
    console.log("info:", info);

    req.login(user, async (error) => {
      return res.redirect("/thread");
    });
  })(req, res, next);
});

// Showing account
app.get("/account", isLoggedIn, function (req, res) {
  res.render("account", {
    user: req.user,
  });
});

// Showing changepass
app.get("/changepass", isLoggedIn, function (req, res) {
  res.render("changePass", {
    user: req.user,
  });
});

// Password change
app.post("/changepass", isLoggedIn, async function (req, res) {
  console.log("ran changepass");
  const user = req.user;
  if (!user) {
    throw new Error("User does not exist");
  }
  if (bcrypt.compare(req.body.password, user.password)) {
    if (req.body.newPassword === req.body.verifyPassword) {
      await User.updateOne(
        { _id: user.id },
        { $set: { password: await bcrypt.hash(req.body.newPassword, 10) } },
        { new: true }
      );
      console.log("Password change successful");
      setTimeout(() => {
        res.redirect("/thread");
      }, 2000);
    } else {
      console.log("Confirm password does not match new password");
      setTimeout(() => {
        res.redirect("/thread");
      }, 2000);
    }
  } else {
    console.log("Password is incorrect");
    setTimeout(() => {
      res.redirect("/thread");
    }, 2000);
  }
});

// Showing security
app.get("/security", isLoggedIn, function (req, res) {
  res.render("security", {
    user: req.user,
  });
});

// Showing settings
app.get("/settings", isLoggedIn, function (req, res) {
  res.render("settings", {
    user: req.user,
  });
});

// Showing support form
app.get("/support", function (req, res) {
  res.render("support", {
    user: req.user,
  });
});

//Handling user logout
app.get("/logout", isLoggedIn, function (req, res) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

//Show admin lock
app.get("/adminlock", isLoggedIn, function (req, res) {
  res.render("adminLock", {
    user: req.user,
  });
});

// Show admin post
app.get("/adminPost", isLoggedIn, function (req, res) {
  res.render("adminPost", {
    user: req.user,
  });
});

// Show admin communities
// app.get("/adminThread", isLoggedIn, function (req, res) {
//   res.render("adminThread");
// });

// user view thread

// app.get("/allthreads", isLoggedIn, (req, res) => {
//   res.render("allThreads");
// });

// user rating recipes

app.get("/recipes", isLoggedIn, (req, res) => {
  res.render("recipePage", {
    user: req.user,
  });
});

// user create post

app.get("/createpost", isLoggedIn, (req, res) => {
  res.render("createpost", {
    user: req.user,
  });
});

// comment
app.get("/comment/:id", isLoggedIn, async (req, res) => {
  const id = req.params.id;

  const posts = await Post.find({ _id: id});
  
  res.render("comment", {
    user: req.user.username,
    posts: posts
  });
});

app.post(
  "/createpost",
  upload.single("photos"),
  async function (req, res, next) {
    const post = await Post.create({
      title: req.body.title,
      description: req.body.content,
      userId: req.user.id,
      username: req.user.username,
      image: req.file.filename,
    });
    setTimeout(() => {
      res.redirect("/profile/" + req.user.id);
    }, 500);
  }
);

// user profile
app.get("/profile/:username", isLoggedIn, async (req, res) => {
  try {
    console.log(req.params.username);
    const username = req.params.username;

    const user = await User.findOne({ username });

    if (user) {
      const posts = await Post.find({ userId: user.id , archived: false});
      res.render("profile", {
        posts,
      });
    }
    const posts = await Post.find({ userId: req.user.id, archived: false });
    res.render("profile", { user: req.user, posts: posts });
  } catch (err) {
    console.log(err);
  }
});

// user search
app.get("/search", isLoggedIn, (req, res) => {
  res.render("searchPage", {
    user: req.user.username,
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

let port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started on port 3000!");
});

// delete post
app.get("/delete", isLoggedIn, async (req, res) => {
  res.render("deletePost", {
    user: req.user,
  });
});
