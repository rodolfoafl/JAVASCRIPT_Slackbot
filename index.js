const SlackBot = require("slackbots");
const axios = require("axios");

require("dotenv").config();

const bot = new SlackBot({
  token: process.env.TOKEN,
  name: "jokebot"
});

//Start handler
bot.on("start", () => {
  const params = {
    icon_emoji: ":joker:"
  };

  bot.postMessageToChannel(
    "geral",
    "Get Ready To Laugh With @Jokebot!",
    params
  );
});

//Erro handler
bot.on("error", err => {
  console.log(err);
});

//Message handler
bot.on("message", data => {
  if (data.type !== "message") {
    return;
  }

  handleMessage(data.text);
});

function handleMessage(message) {
  if (message.includes(" chucknorris")) {
    chuckJoke();
  } else if (message.includes(" help")) {
    runHelp();
  }
}

function chuckJoke() {
  axios.get("http://api.icndb.com/jokes/random").then(res => {
    const joke = res.data.value.joke;

    const params = {
      icon_emoji: ":laughing:"
    };

    bot.postMessageToChannel("geral", `Chuck Norris: ${joke}`, params);
  });
}

function runHelp() {
  const params = {
    icon_emoji: ":question:"
  };

  bot.postMessageToChannel(
    "geral",
    `Type @jokebot with 'chucknorris' to get a random joke`,
    params
  );
}
