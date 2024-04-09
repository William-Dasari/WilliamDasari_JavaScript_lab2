function Quiz(listOfQuestions) {
    this.score = 0;
    this.questions = listOfQuestions;
    this.questionIndex = 0
}

function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
Quiz.prototype.isEnded = function() {
return this.questionIndex === this.questions.length
}

Quiz.prototype.checkOptionWithAnswer = function(answer) {
    if(this.getQuestionByIndex().isCorrectAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

Quiz.prototype.getQuestionByIndex = function() {
    return this.questions[this.questionIndex]
}
Question.prototype.isCorrectAnswer = function(choice) {
    return this.answer === choice;
}
function showProgress() {
let elem = document.getElementById("footer")
let questionNum = quiz.questionIndex + 1;
elem.innerHTML = "question " + questionNum + " of "+ quiz.questions.length
}

function showScores() {
    let heading = document.querySelector("h1")
    heading.innerHTML = "Result:"
    let quizElem = document.getElementById("quiz")
    quizElem.innerHTML = `<h2 id='score'>Your scores : ${quiz.score}. and percentage is ${quiz.score/quiz.questions.length*100}%</h2>`
}
function handleBtnClick(id, choice) {
let btn = document.getElementById(id)
btn.onclick = function() {
    quiz.checkOptionWithAnswer(choice);
    loadQuestions();
}
}
function loadQuestions() {
if(quiz.isEnded()) {
    showScores()
}else {
    let elem = document.getElementById("question")
    elem.innerHTML = quiz.getQuestionByIndex().text;

    let choices = quiz.getQuestionByIndex().choices;
    for(let i = 0; i < choices.length; i++) {
        let elem = document.getElementById("button" + i);
        elem.innerHTML = choices[i];
        handleBtnClick("button"+i, choices[i]);
    }
    showProgress();
}
}


let questionsList = [
new Question("Q1.Javascript supports ", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
new Question("Q2.Which Language used for Styling web pages ", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
new Question("Q3.Which is not a JS Framework ", ["Angular", "JQuery", "Django", "NodeJS"], "Django"),
new Question("Q4.Which is used to connect DB ", ["PHP", "HTML", "JS", "All"], "PHP"),
new Question("Q5.Javascript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
]

let quiz = new Quiz(questionsList)


loadQuestions();