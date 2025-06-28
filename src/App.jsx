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

  // Updated questions with new storyline
  const questions = [
    {
      question: "The uncle grins and says, \"Young one! Before I can serve you, must first follow your heart lah. You see these two doors behind me?\"",
      choices: ["I'll go through the busy door where I can hear voices and laughter!", "I prefer the quiet door - let me explore at my own pace."],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "You emerge in a magical void deck where aunties are playing mahjong with floating tiles, and walls show visions of Singapore's past and future.",
      choices: ["I'll sit with the aunties and learn from their stories of old Singapore.", "Those visions of future Singapore fascinate me, Let's check it out!"],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    },
    {
      question: "Following the aunties' directions, you reach Marina Bay where the Merlion statue glows and speaks: \"solve this riddle: A kopitiam uncle has 100 thirsty customers but only 80 cups. How does he handle this?\"",
      choices: ["Calculate the most efficient way - share cups or find alternatives.", "Talk to customers about their needs - some might share or wait happily!"],
      weights: [
        {thinkingScore: 3, feelingScore: 0},
        {feelingScore: 3, thinkingScore: 0}
      ]
    },
    {
      question: "You teleported to a magical MRT train. The announcement says: \"Next stop, Your Destiny.\" Two buttons appear: \"Express\" and \"Scenic Route.\"",
      choices: ["Express please! I want to reach my destination efficiently.", "Scenic route sounds interesting - let's see where it takes me!"],
      weights: [
        {judgingScore: 3, perceivingScore: 0},
        {perceivingScore: 3, judgingScore: 0}
      ]
    },
    {
      question: "The MRT drops you at ethereal Gardens by the Bay, where the Supertrees grow magical fruits. A gardenkeeper asks: \"How will you harvest your drink ingredients?\"",
      choices: ["I'll join the group harvest - to share discoveries and learn from others!", "I'll harvest alone to connect deeply with each flavor before choosing."],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "Following the trail, you discover a mystical kopitiam where an ancient coffee master guards a recipe vault. \"Young seeker,\" he says, \"which brewing wisdom calls to you?\"",
      choices: ["I trust the traditional method passed down through generations.", "Let's try that experimental fusion technique - what new flavors await?"],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    },
    {
      question: "The coffee master hands you a golden recipe scroll that transports you to a mystical lab. A voice echoes: \"Your drink needs some calibration. How will you choose to find the perfect taste?\"",
      choices: ["Precise measurements and scientific analysis to achieve perfect balance!", "I'll taste and adjust based on how each sip makes me feel!"],
      weights: [
        {thinkingScore: 3, feelingScore: 0},
        {feelingScore: 3, thinkingScore: 0}
      ]
    },
    {
      question: "The lab's portal opens to a floating Orchard Road where recipes are ingrained in the golden scroll you have. How do you want to finalize your perfect drink creation?",
      choices: ["Give me a structured recipe with clear steps and guaranteed results!", "I want a flexible recipe guide that lets people improvise and experiment!"],
      weights: [
        {judgingScore: 3, perceivingScore: 0},
        {perceivingScore: 3, judgingScore: 0}
      ]
    },
    {
      question: "A portal brings you to a mystical Chinatown where ancient tea masters conducts a ceremony for your golden scroll. How do you wish to receive their blessing?",
      choices: ["I'll join the circle and receive the blessing together with other seekers!", "I'd prefer a private blessing to focus deeply on the ceremony's meaning."],
      weights: [
        {extrovertScore: 3, introvertScore: 0},
        {introvertScore: 3, extrovertScore: 0}
      ]
    },
    {
      question: "Emerging from the tea ceremony, you find yourself in a crystal chamber, where two floating crystals await. A voice echoes: \"Choose the crystal that will seal your drink's true nature.\"",
      choices: ["The steady crystal that represents reliability and timeless flavor.", "The changing crystal that represents innovation and endless possibilities."],
      weights: [
        {sensingScore: 3, intuitionScore: 0},
        {intuitionScore: 3, sensingScore: 0}
      ]
    }
  ];

  const questionImages = [
    "mystical_shop.png",
    "mahjong_aunties.png", 
    "merlion_quiz.png",
    "mrt_choice.png",
    "supertrees.png",
    "ancient_recipes.png",
    "mystical_lab.png",
    "orchard_road.png",
    "tea_masters.png",
    "floating_crystals.png"
  ];

  const drinkResults = {
    "ENTJ": {
      name: "Teh C Kosong",
      image: "DrinkCards/teh_c_kosong.png",
      thumbnail: "Thumbnails/teh_c_kosong_thumbnail.png"
    },
    "INTJ": {
      name: "Kopi Gao",
      image: "DrinkCards/kopi_gao.png",
      thumbnail: "Thumbnails/kopi_gao_thumbnail.png"
    },
    "ENTP": {
      name: "Soursop Juice",
      image: "DrinkCards/soursop_juice.png", 
      thumbnail: "Thumbnails/soursop_juice_thumbnail.png"
    },
    "INTP": {
      name: "Black & White",
      image: "DrinkCards/black_white_drink.png",
      thumbnail: "Thumbnails/black_white_drink_thumbnail.png"
    },
    "ENFJ": {
      name: "Barley Water",
      image: "DrinkCards/barley_water.png",
      thumbnail: "Thumbnails/barley_water_thumbnail.png"
    },
    "INFJ": {
      name: "Chrysanthemum Tea",
      image: "DrinkCards/chrysanthemum_tea.png",
      thumbnail: "Thumbnails/chrysanthemum_tea_thumbnail.png"
    },
    "ENFP": {
      name: "Milo Dinosaur",
      image: "DrinkCards/milo_dinosaur.png",
      thumbnail: "Thumbnails/milo_dinosaur_thumbnail.png"
    },
    "INFP": {
      name: "Bandung",
      image: "DrinkCards/bandung.png",
      thumbnail: "Thumbnails/bandung_thumbnail.png"
    },
    "ESFJ": {
      name: "Honey Lemon",
      image: "DrinkCards/honey_lemon.png", 
      thumbnail: "Thumbnails/honey_lemon_thumbnail.png"
    },
    "ISFJ": {
      name: "Soya Milk",
      image: "DrinkCards/soya_milk.png",
      thumbnail: "Thumbnails/soya_milk_thumbnail.png"
    },
    "ESTJ": {
      name: "Lime Juice",
      image: "DrinkCards/lime_juice.png",  
      thumbnail: "Thumbnails/lime_juice_thumbnail.png"
    },
    "ISTJ": {
      name: "Kopi O Kosong",
      image: "DrinkCards/kopi_o_kosong.png",
      thumbnail: "Thumbnails/kopi_o_kosong_thumbnail.png"
    },
    "ESTP": {
      name: "Coconut Shake",
      image: "DrinkCards/coconut_shake.png",
      thumbnail: "Thumbnails/coconut_shake_thumbnail.png"
    },
    "ISTP": {
      name: "Sugarcane Juice",
      image: "DrinkCards/sugarcane_juice.png",
      thumbnail: "Thumbnails/sugarcane_juice_thumbnail.png"
    },
    "ESFP": {
      name: "Bubble Tea",
      image: "DrinkCards/bubble_tea.png",
      thumbnail: "Thumbnails/bubble_tea_thumbnail.png"
    },
    "ISFP": {
      name: "Avocado Shake",
      image: "DrinkCards/avocado_shake.png",
      thumbnail: "Thumbnails/avocado_shake_thumbnail.png" 
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
    setCurrentPage('ending');
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
    if (navigator.share) {
      navigator.share({
        title: 'LimSimi Quiz - Find Your Singapore Drink!',
        text: `I got ${window.currentResult?.drink.name || 'a drink'}! Find out your Singapore drink match!`,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href)
        .then(() => alert('Quiz URL copied to clipboard!'))
        .catch(err => console.error('Failed to copy URL: ', err));
    }
  };

  const showAllDrinks = () => {
    setCurrentPage('allDrinks');
  };

  const showDrinkDetail = (mbtiType) => {
    window.currentResult = {
      mbtiType,
      drink: drinkResults[mbtiType]
    };
    setCurrentPage('drinkDetail');
  };

  // Copyright component
  const Copyright = () => (
    <div className="copyright-footer">
      © 2025 LimSimi by @tyeckh
    </div>
  );

  if (currentPage === 'home') {
    return (
      <div className="quiz-app home-page">
        <div className="star-field"></div>
        <div className="wrapper">
          <header className="header">
            <h1 className="title">LimSimi?</h1>
          </header>
          <h2 className="subtitle">Discover your Singaporean Drink!</h2>
          <h3 className="description">
            Embark on a magical journey to uncover your perfect Singaporean drink match!
          </h3>
          <button 
            className="main-button"
            onClick={() => setCurrentPage('intro')}
          >
            Take the quiz
          </button>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === 'intro') {
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question">{`You're walking past your favorite hawker center when you notice an uncle at a mysterious stall you've never seen before. His sign reads "Mystical Drinks - Find Your True Taste." As you approach, he winks and the world shimmers...`}</div>
            
            <img 
              src="uncle_wink.png" 
              alt="Uncle winking at mysterious stall" 
              className="question-image"
            />
            
            <div className="choices-container">
              <button 
                className="whoosh-button"
                onClick={() => setCurrentPage('quiz')}
              >
                Begin Journey!
              </button>
            </div>
          </div>
        </div>
        <Copyright />
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
        <Copyright />
      </div>
    );
  }
  if (currentPage === 'ending') {
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question">You find yourself back at the original hawker stall, but now the mysterious uncle is holding a steaming cup of your perfectly crafted drink. "Wah, you completed the whole quest! Your journey through magical Singapore has revealed exactly which drink matches your personality."</div>
            
            <img 
              src="ending_uncle.png" 
              alt="Uncle preparing your destined drink" 
              className="question-image"
            />
            
            <div className="choices-container">
              <button 
                className="whoosh-button"
                onClick={() => setCurrentPage('results')}
              >
                Reveal My Drink!
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }
    
  if (currentPage === 'results') {
    const result = window.currentResult || { mbtiType: 'ISFP', drink: drinkResults['ISFP'] };
    
    return (
      <div className="quiz-app results-page">
        <div className="wrapper">
          <div className="results-container">
            <div className="share-header">
              <div className="share-text">Feel free to share your result!</div>
              <div className="share-hashtag">psst... long press to save your drink card</div>
            </div>

            <div className="result-card">
              <img 
                src={result.drink.image} 
                alt={result.drink.name}
                className="drink-result-image"
              />
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
                onClick={showAllDrinks}
              >
                All Drinks
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === 'allDrinks') {
    const allMBTITypes = Object.keys(drinkResults);
    
    return (
      <div className="quiz-app all-drinks-page">
        <div className="wrapper">
          <div className="all-drinks-container">
            <h1 className="page-title">Kopitiam Menu</h1>
            <p className="page-subtitle">Discover every personality drink match!</p>
            
            <div className="drinks-grid">
              {allMBTITypes.map((mbtiType) => {
                const drink = drinkResults[mbtiType];
                return (
                  <div 
                    key={mbtiType}
                    className="drink-item"
                    onClick={() => showDrinkDetail(mbtiType)}
                  >
                    <img 
                      src={drink.thumbnail} 
                      alt={drink.name}
                      className="drink-thumbnail"
                    />
                    <h3 className="drink-item-name">{drink.name}</h3>
                  </div>
                );
              })}
            </div>
            
            <div className="bottom-buttons">
              <button 
                className="back-button"
                onClick={() => setCurrentPage('results')}
              >
                ← Back to Results
              </button>
              <button 
                className="try-again-button"
                onClick={resetQuiz}
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === 'drinkDetail') {
    const result = window.currentResult || { mbtiType: 'ISFP', drink: drinkResults['ISFP'] };
    
    return (
      <div className="quiz-app results-page">
        <div className="wrapper">
          <div className="results-container">
            <div className="share-header">
              <div className="share-text">Drink Details</div>
            </div>

            <div className="result-card">
              <img 
                src={result.drink.image} 
                alt={result.drink.name}
                className="drink-result-image"
              />
            </div>

            <div className="button-container">
              <button 
                className="small-button"
                onClick={() => setCurrentPage('allDrinks')}
              >
                ← All Drinks
              </button>
              <button 
                className="small-button"
                onClick={resetQuiz}
              >
                Take Quiz
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }

  return null;
};

function App() {
  return <LimSimiQuiz />;
}

export default App;