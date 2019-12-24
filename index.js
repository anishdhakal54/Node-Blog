const expressEdge = require("express-edge");
const Express = require("express");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const ConnectMongo = require("connect-mongo");
const expressSessions = require("express-session");

const app = new Express();

mongoose.connect("mongodb://localhost/node-js-blog", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const User = require("./database/models/User.js");

const MongoStore = ConnectMongo(expressSessions());

app.use(
  expressSessions({
    secret: "i am batman",
    resave: false,
    saveUninitialized: true,
    store: new MongoStore({
      mongooseConnection: mongoose.connection
    })
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const blogRoutes = require("./routes/blogRoutes");
const userRoutes = require("./routes/userRoutes");

app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

app.use(fileUpload());
app.use(Express.static("public"));
app.use(expressEdge);
app.set("views", `${__dirname}/views`);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(blogRoutes);
app.use(userRoutes);
app.listen(3000, () => {
  console.log("App listening on port 3000");
});
