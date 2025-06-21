import React, { useState } from 'react';
import './App.css';

const LimSimiQuiz = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState({
    introvertScore: 0,
    extrovertScore: 0,
    judgingScore: 0,
    perceivingScore: 0,
    sensingScore: 0,
    intuitionScore: 0,
    thinkingScore: 0,
    feelingScore: 0
  });

  // Shortened questions - more concise and direct
  const questions = [
    {
      question: "You tumble through a magical portal and land in an enchanted realm. What's your first instinct?",
      choices: ["Call out 'Hello?' and explore", "Take a quiet moment to observe"],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "In a magical garden, two types of flowers catch your eye. Which draws you in?",
      choices: ["Familiar flowers that remind you of home", "Impossible rainbow blossoms that shift colors"],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    },
    {
      question: "A crystal bridge hums with two different melodies. Which resonates with your soul?",
      choices: ["Warm harmony of friendship and connection", "Clear, precise notes of mathematical beauty"],
      weights: [
        {feelingScore: 3, thinkingScore: 0},
        {thinkingScore: 3, feelingScore: 0}
      ]
    },
    {
      question: "Two streams flow before you - one steady, one playful. Which feels right for your journey?",
      choices: ["The steady stream with clear direction", "The playful stream that curves freely"],
      weights: [
        {judgingScore: 3, perceivingScore: 0},
        {perceivingScore: 3, judgingScore: 0}
      ]
    },
    {
      question: "In a moonlit clearing, two ancient trees call to you. Which one speaks to your heart?",
      choices: ["Memory Tree with golden leaves of tradition", "Dream Tree with silver branches of possibility"],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    },
    {
      question: "Stars begin to fall like gentle rain, carrying magical energy. How do you embrace it?",
      choices: ["Share the magic with other souls", "Cup it close to illuminate your inner world"],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "Ancient stones sing in harmony. Two glow brighter, offering their gifts. Which calls to you?",
      choices: ["Heart Stone of love and empathy", "Mind Stone of truth and logic"],
      weights: [
        {feelingScore: 3, thinkingScore: 0},
        {thinkingScore: 3, feelingScore: 0}
      ]
    },
    {
      question: "A rainbow path splits in two directions. Which feels true to your nature?",
      choices: ["Golden Path with clear markers to proven destinations", "Silver Path winding mysteriously to unknown discoveries"],
      weights: [
        {judgingScore: 3, perceivingScore: 0},
        {perceivingScore: 3, judgingScore: 0}
      ]
    },
    {
      question: "Twin towers rise into the clouds. Which feels like home to your spirit?",
      choices: ["Community Tower of magical celebration", "Solitude Tower of peaceful, deep magic"],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "The Oracle offers to reveal your destiny. How do you wish to learn about yourself?",
      choices: ["Through stories of others' journeys", "Through visions of magical futures"],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    },
    {
      question: "Two glowing chalices contain different wisdoms. Which resonates with your truest self?",
      choices: ["Heart-Wisdom of emotional understanding", "Mind-Wisdom of logic and hidden truths"],
      weights: [
        {feelingScore: 3, thinkingScore: 0},
        {thinkingScore: 3, feelingScore: 0}
      ]
    },
    {
      question: "Two final gateways appear before you. Which represents your magical essence?",
      choices: ["Steady Gateway of mastery and tradition", "Flowing Gateway of adventure and discovery"],
      weights: [
        {judgingScore: 3, perceivingScore: 0},
        {perceivingScore: 3, judgingScore: 0}
      ]
    }
  ];

  const questionImages = [
    "portal_fall.png",
    "magical_garden.png", 
    "crystal_bridge.png",
    "flowing_river.png",
    "moonlit_clearing.png",
    "starfall_moment.png",
    "singing_stones.png",
    "rainbow_path.png",
    "twin_towers.png",
    "oracle_chamber.png",
    "wisdom_chalices.png",
    "final_gateway.png"
  ];

  const drinkResults = {
    "ENTJ": {
      name: "Teh C Kosong",
      image: "teh_c_kosong.png",
      percentage: "3%"
    },
    "INTJ": {
      name: "Kopi Gao",
      image: "kopi_gao.png",
      percentage: "2%"
    },
    "ENTP": {
      name: "Soursop Juice",
      image: "soursop_juice.png",
      percentage: "2%"
    },
    "INTP": {
      name: "Black & White Drink",
      image: "black_white_drink.png",
      percentage: "3%"
    },
    "ENFJ": {
      name: "Barley Water",
      image: "barley_water.png",
      percentage: "2%"
    },
    "INFJ": {
      name: "Chrysanthemum Tea",
      image: "chrysanthemum_tea.png",
      percentage: "1%"
    },
    "ENFP": {
      name: "Milo Dinosaur",
      image: "milo_dinosaur.png",
      percentage: "8%"
    },
    "INFP": {
      name: "Bandung",
      image: "bandung.png",
      percentage: "4%"
    },
    "ESFJ": {
      name: "Honey Lemon Tea",
      image: "honey_lemon_tea.png",
      percentage: "12%"
    },
    "ISFJ": {
      name: "Soy Milk",
      image: "soy_milk.png",
      percentage: "13%"
    },
    "ESTJ": {
      name: "Lime Juice",
      image: "lime_juice.png",
      percentage: "9%"
    },
    "ISTJ": {
      name: "Kopi O Kosong",
      image: "kopi_o_kosong.png",
      percentage: "12%"
    },
    "ESTP": {
      name: "Coconut Shake",
      image: "coconut_shake.png",
      percentage: "4%"
    },
    "ISTP": {
      name: "Sugarcane Juice",
      image: "sugarcane_juice.png",
      percentage: "5%"
    },
    "ESFP": {
      name: "Bubble Tea",
      image: "bubble_tea.png",
      percentage: "8%"
    },
    "ISFP": {
      name: "Avocado Shake",
      image: "avocado_shake.png",
      percentage: "9%"
    }
  };

  const handleChoiceClick = (choiceIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedWeight = currentQuestion.weights[choiceIndex];
    
    setScores(prevScores => {
      const newScores = { ...prevScores };
      Object.keys(selectedWeight).forEach(key => {
        if (selectedWeight[key] !== 0) {
          newScores[key] += selectedWeight[key];
        }
      });
      return newScores;
    });

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      calculateResults();
    }
  };

  const calculateResults = () => {
    const introextro = scores.introvertScore > scores.extrovertScore ? "I" : "E";
    const sensint = scores.sensingScore > scores.intuitionScore ? "S" : "N";
    const thinkfeel = scores.thinkingScore > scores.feelingScore ? "T" : "F";
    const judgeper = scores.judgingScore > scores.perceivingScore ? "J" : "P";
    
    const mbtiType = introextro + sensint + thinkfeel + judgeper;
    setCurrentPage('results');
    window.currentResult = {
      mbtiType,
      drink: drinkResults[mbtiType]
    };
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores({
      introvertScore: 0,
      extrovertScore: 0,
      judgingScore: 0,
      perceivingScore: 0,
      sensingScore: 0,
      intuitionScore: 0,
      thinkingScore: 0,
      feelingScore: 0
    });
    setCurrentPage('home');
  };

  const shareQuiz = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => alert('Quiz URL copied to clipboard!'))
      .catch(err => console.error('Failed to copy URL: ', err));
  };

  const ProgressBar = ({ current, total }) => {
    const progressPercentage = ((current + 1) / total) * 100;
    
    return (
      <div className="progress-bar-container">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <div className="progress-text">
          {current + 1}/{total}
        </div>
      </div>
    );
  };

  if (currentPage === 'home') {
    return (
      <div className="quiz-app home-page">
        <div className="star-field"></div>
        <div className="wrapper">
          <header className="header">
            <h1 className="title">LimSimi</h1>
          </header>
          <h2 className="subtitle">Discover your Singaporean Drink Companion</h2>
          <h3 className="description">
            Embark on a magical journey through the MulTEHverse to uncover your perfect Singaporean drink match
          </h3>
          <button 
            className="main-button"
            onClick={() => setCurrentPage('quiz')}
          >
            Take the quiz
          </button>
        </div>
      </div>
    );
  }

  if (currentPage === 'quiz') {
    const currentQuestion = questions[currentQuestionIndex];
    
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question-number">Q{currentQuestionIndex + 1}/{questions.length}</div>
            
            <div className="question-container">
              <div className="question">{currentQuestion.question}</div>
              <img 
                src={questionImages[currentQuestionIndex]} 
                alt="Question Scene" 
                className="question-image"
              />
            </div>
            
            <div className="choices-container">
              {currentQuestion.choices.map((choice, index) => (
                <button
                  key={index}
                  className="choice"
                  onClick={() => handleChoiceClick(index)}
                >
                  {choice}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentPage === 'results') {
    const result = window.currentResult || { mbtiType: 'ISFP', drink: drinkResults['ISFP'] };
    
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="results-container">
            <h1 className="result-title">Your Drink Spirit Companion</h1>
            <div className="drink-card">
              <img 
                src={result.drink.image} 
                alt={result.drink.name}
                className="drink-image"
              />
              <h2 className="drink-name">{result.drink.name}</h2>
              <p className="mbti-type">{result.mbtiType}</p>
              <p className="percentage">
                {result.drink.percentage} of people share this drink spirit!
              </p>
              <div className="result-message">
                "Hello, dear friend! I've been waiting so long to meet you. 
                Your magical journey has revealed that we are perfect companions."
              </div>
            </div>
            <div className="button-container">
              <button 
                className="small-button"
                onClick={shareQuiz}
              >
                Share Quest
              </button>
              <button 
                className="small-button"
                onClick={resetQuiz}
              >
                Try Again
              </button>
            </div>
            <footer className="footer">
              Made for mystical drink spirit discovery
            </footer>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

function App() {
  return <LimSimiQuiz />;
}

export default App;