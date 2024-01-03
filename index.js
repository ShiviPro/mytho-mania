var readlineSync = require("readline-sync");
var chalk = require("chalk");
var gradient = require("gradient-string");

var userScore = 0;
var highScores = [
  {
    name: "Kokila",
    score: 5,
  },
  {
    name: "Satyam",
    score: 4,
  },
  {
    name: "Shivam",
    score: 3,
  },
];
var questionOne = {
  type: "multiple choice",
  question: "Which one of the hindu Trideva is most associated with ॐ(om)? ",
  options: ["Brahma", "Vishnu", "Shiva"],
  answer: "Shiva",
};

var questionTwo = {
  type: "multiple choice",
  question: "Which avatara of Vishnu dev is predicted to appear in Kali Yuga? ",
  options: ["Varaha", "Narasimha", "Matsya", "Kalki"],
  answer: "Kalki",
};

var questionThree = {
  type: "multiple choice",
  question: "Which hindu Trideva is known as Rameshwara? ",
  options: ["Vishnu", "Brahma", "Shiva"],
  answer: "Shiva",
};

var questionFour = {
  type: "multiple choice",
  question: "What does \'hanu\' mean in Hanuman Ji's name? ",
  options: ["Jaw", "Cheek", "Hair", "Arm"],
  answer: "Jaw",
};

var questionFive = {
  type: "multiple choice",
  question:
    "What is the name of the ultimate poison which resulted from Samudra Manthana ? ",
  options: ["Kalahala", "Kalakuta", "Halakuta"],
  answer: "Kalakuta",
};

var questions = [
  questionOne,
  questionTwo,
  questionThree,
  questionFour,
  questionFive,
];

function printCurrentScore() {
  console.log(chalk.hex("#FDFF00")("Your Score: " + userScore));
}

function ask(type, question, correctAnswer, options = null) {
  var userAnswer;
  if (type === "yes/no") {
    userAnswer = readlineSync.keyInYNStrict(["\nQ. " + question]);
  } else if (type === "multiple choice") {
    var userAnswerIndex = readlineSync.keyInSelect(options, "Q. " + question, {
      cancel: false,
    });
    userAnswer = options[userAnswerIndex];
  }

  if (userAnswer === correctAnswer) {
    userScore++;
    console.log(chalk.hex("9CFF2E")("That's right!"));
  } else {
    console.log(chalk.hex("#EF4040")("Wrong!"));
  }
  printCurrentScore();
}

function printHighScores() {
  console.log(
    "\nHere's how the " + gradient.rainbow("high scores") + " look for now: ",
  );
  for (
    var highScoreIndex = 0;
    highScoreIndex < highScores.length;
    highScoreIndex++
  ) {
    var highScorerInfo = highScores[highScoreIndex];
    var highScorer = highScorerInfo.name;
    var highScore = highScorerInfo.score;
    console.log(gradient.rainbow(highScorer + " - " + highScore));
  }
}

console.log(
  chalk.grey.italic(
    "Please know that this quiz is based on Hindu mythology; And is a fair test for anyone who's acquainted with it."
  )
);
console.log("\n" + chalk.underline("Welcome to Mytho Mania!"));
var userName = readlineSync.question("\nMay I have your name please: ");
var firstAlphabetOfUserName = userName.charAt(0);
firstAlphabetOfUserName = firstAlphabetOfUserName.toUpperCase();
var remainingUserName = userName.substring(1);
remainingUserName = remainingUserName.toLowerCase();
userName = firstAlphabetOfUserName + remainingUserName;
console.log("\nWelcome, " + chalk.hex("#2192FF")(userName) + "!");
readlineSync.question("Press the Enter key when you're ready to start...");
console.log();
userScore = 0;
var userIsAHighScorer = false;
for (var questionIndex = 0; questionIndex < questions.length; questionIndex++) {
  var questionType = questions[questionIndex].type;
  var question = questions[questionIndex].question;
  var correctAnswer = questions[questionIndex].answer;
  if (questionType === "multiple choice") {
    var options = questions[questionIndex].options;
    ask(questionType, question, correctAnswer, options);
    continue;
  }
  ask(questionType, question, correctAnswer);
}

console.log(
  "\n" +
    chalk.hex("#FFA500")("You've scored a total of " + userScore + " points."),
);

var lowestHighScore = highScores[highScores.length - 1].score;
if (userScore >= lowestHighScore) {
  userIsAHighScorer = true;
}
printHighScores();
if (userIsAHighScorer) {
  console.log(
    "\n🎊 Great Job on the quiz, " + chalk.hex("#2192FF")(userName) + " 🎊",
  );
  console.log(
    "You've made it to the top! Send me a screenshot of your score at my email: www.shivamtewari@gmail.com to get the list updated.",
  );
}
console.log(
  "\nThank You so much for attempting the quiz.\nHope you enjoyed learning a bit more about Hindu mythology.",
);
