import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [correctQuestion, setCorrectQuestion] = useState(0)
  const [category, setCategory] = useState("music")
  const [difficulties, setDifficulty] = useState("easy")
  const [quizQuestions, setQuizQuestions] = useState([])
  const [isLoading, setLoading] = useState(true)


  useEffect(() => {
    const loadQuestion = async () => {
      try {
        let response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${category}&difficulties=${difficulties}`)
        let data = await response.json()
        setQuizQuestions(data)
        setLoading(false)
      }
      catch (err) {
        console.log(err.message)
      }
    }

    loadQuestion()
    console.log(quizQuestions)
  }, [])



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
        isLoading ? <h1>Loading</h1> : quizQuestions ?
          showScore ? <div>You Scored {correctQuestion} out of {quizQuestions.length} questions</div> :
            <div className="app">
              <div className='question-section'>
                <div className="question-count">
                  <span>Question Number {currentQuestion + 1}</span>
                </div>
                <div className="question-text">
                  {quizQuestions[currentQuestion].question.text}
                </div>
              </div>
              <div className="answer-section">
                {
                  quizQuestions[currentQuestion].incorrectAnswers.map((answerOption) => <button>{answerOption}</button>)
                }
              </div>
            </div> : <h1> No Data Available </h1>
      }
    </>
  )
}

export default App
