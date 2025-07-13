let QuesNoElem = document.querySelector("#Ques-No");
let QuesCategoryElem = document.querySelector("#Ques-Category");
let QuesTypeElem = document.querySelector("#Ques-type");
let QuesDifficultyElem = document.querySelector("#Ques-Difficulty");
let QuestionBtnElem = document.querySelector("#Ques-Btn");

import { QuizzApi } from "./QuizApi_module.js";
import { Questions } from "./Questions_module.js";

class Quizz extends QuizzApi {
  constructor({ QuesNo, QuesCategory, QuesDifficulty, QuesType }) {
    super({ QuesNo, QuesCategory, QuesDifficulty, QuesType });
  }

  async handleQuestions() {
    const QuestionsData = await this.FetchingApi();
    new Questions(QuestionsData).displayQuestions();
  }
}

QuestionBtnElem.addEventListener("click", () => {
  let QuesApiParams = {
    QuesNo: QuesNoElem.value,
    QuesCategory: QuesCategoryElem.value,
    QuesDifficulty: QuesDifficultyElem.value,
    QuesType: QuesTypeElem.value,
  };

  console.log(QuesApiParams);
  let myQuizz = new Quizz(QuesApiParams);
  myQuizz.handleQuestions();
});
