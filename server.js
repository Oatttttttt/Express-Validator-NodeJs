var express = require("express");
var app = express();
const bodyParser = require("body-parser");
const { body, validationResult } = require("express-validator");
const port = 3001;

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Express-Validator!");
});

app.post(
  "/register",
  [
    body("username")
      .isAlphanumeric()
      .isLength({ min: 3, max: 30 })
      .withMessage(
        "Username must be at least 3 and max with 30 characters long"
      ),
    body("password")
      .isAlphanumeric()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6"),
    body("email").isEmail().withMessage("Email must be in format email"),
    body("phonenumber")
      .isMobilePhone()
      .withMessage("Phone number must be in format number"),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    res.send("Validation passed!");
  }
);

app.listen(port, function () {
  console.log("Web server listening on port " + port);
});
