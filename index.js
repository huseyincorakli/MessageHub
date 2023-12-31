const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
const fs = require("fs");
const getGithubDatas = require("./getGithubData");
const checkForAllow = require("./checkForAllow");
require("dotenv").config();

const port = process.env.PORT || 8888;

const id = process.env.AC_ID;
const token = process.env.TOKEN;
const num = process.env.NUM;
const text = process.env.TEXT;
const accountSid = `AC${id}`;
const authToken = token;

const client = new twilio(accountSid, authToken);
const app = express();

app.use(cors());

//wp message send
app.get(`/${text}/:id`, (req, res) => {
  const message = `${req.params.id}`;
  const ClientUrl = req.headers.origin;

  if (checkForAllow(ClientUrl)) {
    client.messages
      .create({
        body: `${message}`,
        from: "whatsapp:+14155238886",
        to: num,
      })
      .then()
      .done();
    res.send("ok");
  } else {
    res.send("false");
  }
});

//get github repo
app.get("/githubdata", (req, res) => {
  const ClientUrl = req.headers.origin;
  console.log(`client url:${ClientUrl}`);

  if (checkForAllow(ClientUrl)) {
    getGithubDatas()
      .then(() => {
        const jsonfile = require("./githubdata.json");
        const jsonData = fs.readFileSync("./githubdata.json", "utf-8");
        res.send(jsonData);
        console.log("Success!");
      })
      .catch((error) => {
        console.error("Hata oluştu:", error);
        res.send("Hata oluştu");
      });
  } else {
    res.send("Not allowed");
    console.log("Not ok!!!!");
  }
});

app.listen(port, () => {
  console.log(`${port} aktif`);
});
