const express = require("express");
const cors = require("cors");
const twilio = require("twilio");
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
    var jsonfile = require("./githubdata");
    res.send(JSON.stringify(jsonfile));
    console.log('success!');
  }
  else{
    res.send('not allowed')
    console.log('not ok!!!!');
  }
});

getGithubDatas();
app.listen(port, () => {
  console.log(`${port} aktif`);
});
