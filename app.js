//happy coding
const express = require("express");
const session = require("express-session");
const app = express();
const port = 3000;
const expiryDate = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

app.set("trust proxy", 1);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: "S3Cur3",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, sameSite: true },
  })
);
app.use(require("./routes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
