
export class QuizzApi {
  constructor({ QuesNo, QuesCategory, QuesDifficulty, QuesType }) {
    this.QuesNo = QuesNo;
    this.QuesCategory = QuesCategory;
    this.QuesType = QuesType;
    this.QuesDifficulty = QuesDifficulty;
  }

  async FetchingApi() {
    let loaderElem = document.querySelector(".loaderAnimation");
    try {
      loaderElem.classList.remove("d-none");
      const QuestionData = await this.handleApi();
      return QuestionData.results;
    } catch (error) {
      console.error("Error fetching Quez Data:", error);
      console.log("im sorry");
      this.handleTooMAnyReq();
    } finally {
      loaderElem.classList.add("d-none");
    }
  }

  handleTooMAnyReq() {
    let TooManyReqErorrElem = document.querySelector("#TooManyReqErorr");
    QuestionsContainerElem.classList.add("d-none");
    TooManyReqErorrElem.classList.remove("d-none");
  }

  async handleApi() {
    const baseUrl = "https://opentdb.com/api.php?";

    const QuizApiParams = new URLSearchParams();
    QuizApiParams.append("amount", this.QuesNo || "3");
    if (this.QuesCategory !== "any")
      QuizApiParams.append("category", this.QuesCategory);
    if (this.QuesDifficulty !== "any")
      QuizApiParams.append("difficulty", this.QuesDifficulty);
    if (this.QuesType !== "any") QuizApiParams.append("type", this.QuesType);

    const ResposeApi = await fetch(`${baseUrl}${QuizApiParams}`);

    if (!ResposeApi.ok) {
      throw new Error(`HTTP error! Status: ${ResposeApi.status}`);
    }
    const ResposeData = await ResposeApi.json();

    if (ResposeData.response_code !== 0) {
      throw new Error("No questions found");
    }
    return ResposeData;
  }
}