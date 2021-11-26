const express = require('express');
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const {v4: uuidv4} = require('uuid');
const chat = require('./chat'); // "chat" holds all the non-web logic for managing users/messages
const chatWeb = require("./chat-web");

app.use(express.static('./public'));
app.use(cookieParser());

app.get('/', (req, res) => {
  //const sid = req.cookies.sessionId;
  // if (!sessionId || !isValid(sessionId)) {
  //   res.clearCookie('sessionId');
  const uname = req.cookies.username;
  const password = req.cookies.password;
  const sessionId = req.cookies.sessionId;
  if (!sessionId || !chat.lookForSessionId(sessionId)) {
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('sessionId');
    res.send(chatWeb.loginPage());
    return;
  } else {
    res.redirect('/chat');
  }
});

app.post('/chat', express.urlencoded({ extended: false }), (req, res) => {
  const uname = req.cookies.username;
  const password = req.cookies.password;
  const sessionId = req.cookies.sessionId;
  if (!sessionId || !chat.lookForSessionId(sessionId)) {
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('sessionId');
    chat.removeSessionId(sessionId);
    res.send(chatWeb.loginPage());
    return;
  } else {
    const { text } = req.body; // You'll need to add something!
    // Fill in here!
    chat.addMessage({sender: "Zhehui", text: text});
    res.send(chatWeb.chatPage(chat));
  }
});

app.get('/chat', (req, res) => {
  const uname = req.cookies.username;
  const password = req.cookies.password;
  const sessionId = req.cookies.sessionId;
  if (!sessionId || !chat.lookForSessionId(sessionId)) {
    res.clearCookie('username');
    res.clearCookie('password');
    res.clearCookie('sessionId');
    chat.removeSessionId(sessionId);
    res.redirect('/');
    return;
  } else {
    res.send(chatWeb.chatPage(chat));
  }
});

// Below includes an example of pulling fields from a POST request body
app.post('/', express.urlencoded({ extended: false }), (req, res) => {
  const uname = req.body.username;
  const password = req.body.password;
  if (!chat.lookForUser(uname, password)) {
    res.redirect('/');
  } else {
    res.cookie('username', uname);
    res.cookie('password', password);
    const sessionId = uuidv4();
    chat.addSessionId(sessionId, uname);
    res.cookie('sessionId', sessionId);
    res.redirect('/chat');
  }
});

app.get('/logout', (req, res) => {
  res.clearCookie('username');
  res.clearCookie('password');
  res.clearCookie('sessionId');
  const sessionId = req.cookies.sessionId;
  if (!sessionId) {
    chat.removeSessionId(sessionId);
  }
  res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
