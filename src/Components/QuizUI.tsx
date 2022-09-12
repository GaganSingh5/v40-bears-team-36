import React from "react";
import { getQuizQuestion } from "Services/QuizService";
import Option from "Components/Option/Option";
import QuestionCard from "Components/Question/QuestionCard";
import Loader from "Components/Loader/Loader";
import { useNavigate } from "react-router-dom";
import "Styles/quizUI.css";
// import "Styles/option.css";
import "Styles/timer.css";
// import Timer from "Components/Timer/Timer";

interface QuizOption {
  key: String;
  text: String;
  isSelected: boolean;
  isCorrect: boolean;
}
interface QuizState {
  correctAnswers: Array<boolean>,
  questions: Array<any>,
  cursor: Number,
  resultCount: Number,
  question: String;
  options: Array<QuizOption>;
  isDataLoaded: boolean;
  tags: Array<String>;
  chooseMultiple: boolean;
}

class QuizUI extends React.Component<{ category: string }, QuizState> {
  state = {
    correctAnswers: new Array(10).fill(undefined),
    questions: new Array<any>(0),
    cursor: -1,
    resultCount: 0,
    question: "",
    options: new Array<QuizOption>(0),
    isDataLoaded: false,
    tags: new Array<String>(0),
    chooseMultiple: false,
  };



  componentDidMount() {
    console.log("state", this.state.correctAnswers);

    getQuizQuestion(this.props.category).then((response) => {
      console.log(response);

      const newState = {
        questions: response.data,
        cursor: 0,
        question: response.data[0].question,
        options: this.getOptions(
          response.data[0].answers,
          response.data[0].correct_answers
        ),
        isDataLoaded: true,
        tags: this.getTags(response.data[0]),
        chooseMultiple:
          response.data[0].multiple_correct_answers === "false" ? false : true,
      };

      this.setState(newState);
    });
  }

  getTags(response) {
    const tags = new Array<String>(0);
    if (response.category) {
      tags.push(response.category);
    }

    tags.push(response.difficulty);

    response.tags.forEach((tag) => {
      if (tag.name !== tags[0]) {
        tags.push(tag.name);
      }
    });
    console.log(tags);

    return tags;
  }

  getOptions(answers: Object, correctAnswers: Object): QuizOption[] {
    console.log(answers);
    const options = new Array<QuizOption>(0);
    Object.keys(answers).forEach((optionKey) => {
      if (answers[optionKey]) {
        options.push({
          key: optionKey,
          text: answers[optionKey],
          isSelected: false,
          isCorrect:
            correctAnswers[`${optionKey}_correct`] === "true" ? true : false,
        });
      }
    });
    console.log(options);

    return options;
  }

  setSelectedOption = (key: string) => {
    const newOptionState = this.state.options.map((opt) => {
      if (!this.state.chooseMultiple) {
        opt.isSelected = false;
      }

      if (opt.key === key) {
        if (this.state.chooseMultiple) {
          opt.isSelected = !opt.isSelected;
        } else {
          opt.isSelected = true;
        }
      }
      return opt;
    });

    this.setState({ options: newOptionState });
  };

  submitAnswer = () => {
    const result = this.state.options.filter(
      (opt) => opt.isCorrect !== opt.isSelected
    );

    if (result.length === 0) {
      console.log("Correct");
      this.getNextQuestion(true,1);
    } else {
      console.log("Wrong");
      this.getNextQuestion(false,0);
    }


  };

  getNextQuestion = (prevResult, resultIncrement) => {
    if(this.state.cursor===9) {
      const newCorrectAnsState = this.state.correctAnswers;
      newCorrectAnsState[this.state.cursor] = prevResult;

      const newState = {
        ...this.state,
        correctAnswers: newCorrectAnsState,
        cursor: this.state.cursor + 1,
        resultCount: this.state.resultCount+resultIncrement,
      };
  
      this.setState(newState);
      return;
    }
    this.setState({ isDataLoaded: false });
    const newCorrectAnsState = this.state.correctAnswers;
    newCorrectAnsState[this.state.cursor] = prevResult;
    console.log(newCorrectAnsState);

    const newState = {
      ...this.state,
      correctAnswers: newCorrectAnsState,
      resultCount: this.state.resultCount+resultIncrement,
      cursor: this.state.cursor + 1,
      question: this.state.questions[this.state.cursor + 1].question,
      options: this.getOptions(
        this.state.questions[this.state.cursor + 1].answers,
        this.state.questions[this.state.cursor + 1].correct_answers
      ),
      isDataLoaded: true,
      tags: this.getTags(this.state.questions[this.state.cursor + 1]),
      chooseMultiple:
        this.state.questions[this.state.cursor + 1].multiple_correct_answers === "false" ? false : true,
    };

    this.setState(newState);
  };

  autoSubmit = () => {
    this.submitAnswer();
  };

  render() {
    return (
      <>
        <div className="question--module container px-4">
          {this.state.cursor===10?<ResultPopup count={this.state.resultCount} />:null}
          {this.state.isDataLoaded ? <div className="count--container p-2">
            {
              this.state.correctAnswers.map((ansState, index) => {
                if (ansState === undefined) {
                  return (
                    <div key={index} className="count--blob ">
                    </div>
                  )
                } else if (ansState) {
                  return (
                    <div key={index} className="count--blob-correct ">
                    </div>
                  )
                } else {
                  return (
                    <div key={index} className="count--blob-wrong">
                    </div>
                  )
                }


              })
            }
          </div> : null}
          <div className="question--module__conatiner">
            {this.state.isDataLoaded ? (
              <div className="row p-4 d-flex">
                {/* <Timer autoSubmit={this.autoSubmit} /> */}
                <QuestionCard
                  questionText={this.state.question}
                  tags={this.state.tags}
                  chooseMulti={this.state.chooseMultiple}
                />
                <div className="col-12 d-flex flex-column justify-content-between">
                  {this.state.options.map((option: QuizOption, index) => {
                    return (
                      <Option
                        key={option.key}
                        option={option}
                        toggleOption={this.setSelectedOption}
                      />
                    );
                  })}
                </div>
                <div className="col-12 d-flex justify-content-end">
                  <button
                    className="submit_btn mt-2"
                    onClick={(e) => this.submitAnswer()}
                  >
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </>
    );
  }
}

const ResultPopup = ({ count }) => {
  let navigate = useNavigate();
  const navigateToCategories = () => {
    navigate("../categories");
  };
  return (
    <div className="popup--container">
      <div className="popup--card ">
        <h4>You Scored {count} out of 10!!</h4>
        <button
          className="submit_btn mt-4 "
          onClick={(e) => navigateToCategories()}
        >
          Try another Quiz
        </button></div>

    </div>
  )
}

export default QuizUI;
