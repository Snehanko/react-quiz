import { useState } from 'react'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [correctQuestion, setCorrectQuestion] = useState(0)

  const questions = [
    {
      questionText: 'What is ReactJS?',
      answerText: [
        { answer: "JS Framework", isCorrect: true },
        { answer: "Coding Language", isCorrect: false },
        { answer: "Cursive English", isCorrect: false },
        { answer: "Just a Subject", isCorrect: false },
      ]
    },
    {
      questionText: 'Who is CEO of Teslsa?',
      answerText: [
        { answer: "Sudnar Pichai", isCorrect: false },
        { answer: "Satya Nadella", isCorrect: false },
        { answer: "Elon Musk", isCorrect: true },
        { answer: "Mark Zuckerberg", isCorrect: false },
      ]
    }
  ]

  const handleNextQuestion = (isCorrect) => {
    if (isCorrect === true) {
      alert("The answer is Correct")
      setCorrectQuestion(prevState => prevState + 1)
    }
    else
      alert("You are wrong")

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) { setCurrentQuestion(nextQuestion) }
    else {
      setShowScore(true)
    }
  }

  return (
    <>
      <h1>React Quiz App</h1>
      {
        showScore ? <div>You Scored {correctQuestion} out of {questions.length} questions</div> :
          <div className="app">
            <div className='question-section'>
              <div className="question-count">
                <span>Question {currentQuestion + 1}</span>
              </div>
              <div className="question-text">
                {questions[currentQuestion].questionText}
              </div>
            </div>
            <div className="answer-section">
              {
                questions[currentQuestion].answerText.map((answerOption) => <button onClick={() => handleNextQuestion(answerOption.isCorrect)}>{answerOption.answer}</button>)
              }
            </div>
          </div>
      }

    </>
  )
}

export default App
