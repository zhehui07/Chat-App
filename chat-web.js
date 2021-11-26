const chatWeb = {
  loginPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="appearance.css">
        </head>
        <body>
          <form action="/" method="post">
            <div>
              <label for="username"> username </input>
              <input type="text" name="username" required></input>
            </div>
            <div>
              <label type="password"> password </input>
              <input type="password" name="password" required></input>
            </div>
            <input type="submit" value="Submit">
          </form>
        </body>
      </html>
  `;
  },
  
  chatPage: function(chat) {
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="appearance.css">
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
          <form action="/logout" method="get">
            <input type="submit" value="Logout">
          </form>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    return `<ol class="messages">` +

    Object.values(chat.messages).map( (message, index) => `
    <li>
      <div class="message">
      <div class="messageSender${index % 2}">${message.sender}</div>
      <div class="messageText${index % 2}">${message.text}</div>
      </div>
    </li>
  `).join('') +
      `</ol>`;
  },
  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( (user, index) => `
      <li>
        <div class="user">
          <span class="username${index % 2}">${user}</span>
        </div>
      </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in!
    return `
    <form action = "/chat" method = "post">
      <input type= "hidden" name = "sender">Zhehui
      </input>
      <input class= "textArea" type= "text" name= "text">
      </input>
      <button class="button" > Submit
      </button>
    </form>
    `;
  }
};
module.exports = chatWeb;
