const express = require("express");
// const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const publicPath = path.join("MyT-project/build");

/* routs: */
const accountRouter = require("./routes/user");
const loginRouter = require("./routes/login");
const todoRouter = require("./routes/todosRouters/todoRouter");
const listsRouter = require("./routes/todosRouters/listsRouter");
const postsRouter = require("./routes/postsRouter");
const imgsRouter = require("./routes/imgsRoute");
const config = require("config");
const MONGODB_URI = config.get("MONGODB_URI");
// "mongodb+srv://shysell:shysell1@cluster0.f5bul.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

const app = express();

// app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGODB_URI || "mongodb://localhost/project-rest-api", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connected to mongo");
  })
  .catch((error) => {
    console.error("Connection to mongo Failed");
    console.error(error.message);
  });

app.use(morgan("dev"));
app.use(express.static(publicPath));

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname + "./MyT-project/build/index.html"));
// });

app.use("/api/users", accountRouter);
app.use("/api/login", loginRouter);
app.use("/api/image", imgsRouter);
app.use("/api/todoList/lists", listsRouter);
app.use("/api/todoList/todos", todoRouter);
app.use("/api/posts", postsRouter);

app.get("/MyT-project/build/imgs/uploads/:filename", async (req, res) => {
  await res.sendFile(req.params.filename, {
    root: path.join(publicPath, "users/imgs/uploads"),
  });
});

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(publicPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, publicPath, "index.html"));
  });
  // } else {
  // app.use(express.static(publicPath));
}

const _PORT = process.env.PORT || 5000;
app.listen(_PORT, () => console.log(`connected to port : ${_PORT}`));

// npm run build && git add . && git commit -m "app" && git push -u origin main
// heroku local
// heroku logs --tail
