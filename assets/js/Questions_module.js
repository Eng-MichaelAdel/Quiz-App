
let QuestionsContainerElem = document.querySelector("#QuestionsContainer");

export class Questions {

  constructor(QuizzData) {
    this.Index = 0;
    this.Score = 0;
    this.isAnswered = false;
    this.QuestionsData = QuizzData;
  }


  displayQuestions() {
      
      let Question = this.QuestionsData[this.Index].question;
      let Answers = [this.QuestionsData[this.Index].correct_answer,...this.QuestionsData[this.Index].incorrect_answers,].sort();
      let RandomAnswers = this.ShuffleSort(Answers);
      this.CorrectAnswer = this.QuestionsData[this.Index].correct_answer;
      
      console.log(Question);
      console.log(this.CorrectAnswer);
      console.log(Answers);

    QuestionsContainerElem.innerHTML = `
                            <div id="Ques-Card" class="p-4 bg-white rounded-3 ">
                        <div class="mb-3 pb-2 border-bottom">
                            <p class="fs-6 mb-1">${Question}</p>
                            <span class="badge text-bg-info fs-12">Question Number:</span>
                            <span class="badge text-bg-info fs-12">${this.Index + 1} of ${this.QuestionsData.length}</span>
                        </div>
                        <div class="mb-3 pb-2 border-bottom">
                            <ul class="list-unstyled row g-3 text-center">
                                ${this.handleAnswersList(RandomAnswers)}
                            </ul>
                        </div>

                        <div class="card-footer">
                            <div>
                                score:
                                <span class="badge text-bg-warning fs-12">${this.Score} of ${
                                  this.QuestionsData.length
                                }</span>
                            </div>

                        <div>
                            <progress value="${this.Index + 1}" max="${this.QuestionsData.length}"></progress>
                        </div>
                        </div>

                    </div>
        `;
    this.handleChosenAnswer();
  }

  ShuffleSort(Answers){
    let RandomSortAns = Answers.sort(() => Math.random - 0.5 )
    return RandomSortAns
  }
  
  handleChosenAnswer() {
    let AnswerBtnElems = document.querySelectorAll(".AnswerBtn");
    let AnswerBtnsArray = Array.from(AnswerBtnElems);
    

    AnswerBtnsArray.forEach((elemnt) => {
      elemnt.addEventListener("click", (eInfo) => {
            if (this.isAnswered) return;

            this.isAnswered = true;

              eInfo.target.classList.remove("btn-darkblue");
            if (eInfo.target.innerText === this.CorrectAnswer) {
              eInfo.target.classList.add("bg-correctAns","animate__animated","animate__shakeY");
              this.Score++;
            } else {
              eInfo.target.classList.add("bg-wrongAns","animate__animated","animate__shakeX");
              console.log("Wrong");
            }


          this.handleEndOfQues();
      });
    });
  }


  handleEndOfQues(){
          setTimeout(()=>{
            try{
                this.Index++;
                this.isAnswered = false;
                this.displayQuestions()
            }catch{
                this.fireWors();
                QuestionsContainerElem.innerHTML = `
                    <div id="Ques-Card" class="p-4 bg-white rounded-3 ">
                        <div class="card-footer">
                            Congratulations your Score is:
                            <span class="badge text-bg-warning fs-12">${this.Score}
                            </span> 🎉🎉🎉

                            <div class="my-3 text-center">
                            <button onclick="window.location.reload()" class="btn btn-primary">Retry Quiz</button>
                            </div>
                        </div>
                    </div>
        `;
            }
            } , 500 )
  }


  handleAnswersList(Answers) {
    let ListAswers = Answers.map(
      (answer) =>
        `<li class="AnswerBtn rounded-2 col-6">
             <button class="btn btn-darkblue w-100">${answer}</button>
             </li>`
    );
    return ListAswers.join("");
  }

  fireWors(){
    var count = 200;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
  }
}
