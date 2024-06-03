"use client"

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import './App.css'

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [showScore, setShowScore] = useState(false)
  const [correctQuestion, setCorrectQuestion] = useState(0)
  const [categories, setCategory] = useState(" ")
  const [difficulties, setDifficulty] = useState(" ")
  const [quizQuestions, setQuizQuestions] = useState([])
  const [isLoading, setLoading] = useState(true)


  const form = useForm({
    category: 'music',
    difficulty: 'easy'
  })

  const { register, handleSubmit } = form

  const display = (data) => {
    console.log(data)
    setCategory(data.categories)
    setDifficulty(data.difficulty)
  }

  useEffect(() => {
    const loadQuestion = async () => {
      try {
        let response = await fetch(`https://the-trivia-api.com/v2/questions?categories=${categories}&difficulties=${difficulties}`)
        let data = await response.json();
        setQuizQuestions(data)
        setLoading(false)
      }
      catch (err) {
        console.log(err.message)
      }
    }

    loadQuestion()
  }, [categories, difficulties])


  const handleNextQuestion = (isCorrect) => {
    if (isCorrect === quizQuestions[currentQuestion].correctAnswer) {
      alert("The answer is Correct")
      setCorrectQuestion(prevState => prevState + 1)
    }
    else
      alert("You are wrong")

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) { setCurrentQuestion(nextQuestion) }
    else {
      setShowScore(true)
    }
  }

  const randomizeArray = (object) => {
    const { incorrectAnswers, correctAnswer } = object;
    const len = incorrectAnswers.length;
    const randomIndex = Math.floor(Math.random(0, len) * len);
    const randomizedArray = [...incorrectAnswers.slice(0, randomIndex), correctAnswer, ...incorrectAnswers.slice(randomIndex, len)];
    return randomizedArray;
  }

  return (
    <>
      <h1>React Quiz App</h1>
      <div>
        <h3>Form Input</h3>
        <form onSubmit={handleSubmit(display)}>
          <div>
            <label htmlFor='category'>Type Category</label>
            <input id="category" type="text" {...register("category")} />
          </div>
          <div>
            <label htmlFor='difficulty'>Type Difficulty</label>
            <input id="difficulty" type="text" {...register("difficulty")} />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
      {
        isLoading ? <h1>Loading</h1> :
          quizQuestions ?
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
                    randomizeArray(quizQuestions[currentQuestion]).map(item =>
                      <button key={item} onClick={() => handleNextQuestion(item)}>{item}</button>
                    )
                  }
                </div>
              </div > : <h1> No Data Available </h1>
      }
    </>
  )
}

export default App
