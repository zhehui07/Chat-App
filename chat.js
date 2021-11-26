const users = {
    "Amit": "Amit",
    "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

function addMessage({ sender, text }) {
  // Fill in!
  messages.push({sender, text});
  return;
}

const userInfo = {
  Amit: {password: "Amit"},
  Bao: {password: "Bao"}
};

const sessionInfo = {
};


function lookForUser(uname, passwd) {
  if (userInfo[uname] == null || userInfo[uname].password != passwd) {
    return false;
  }
  return true;
}

function addSessionId(sessionId, uname) {
  sessionInfo[sessionId] = uname;
}

function removeSessionId(sessionId) {
  delete sessionInfo[sessionId];
}

function lookForSessionId(sessionId) {
  if (sessionInfo[sessionId]) {
    return true;
  }
  return false;
}

const chat = {
  users,
  messages,
  addMessage,
  userInfo,
  sessionInfo,
  lookForUser,
  addSessionId,
  removeSessionId,
  lookForSessionId,
};

module.exports = chat;

