import React, { useState, useRef, useEffect } from "react";
import "./App.css";

// Google Analytics event helper
const sendGtagEvent = (action, params = {}) => {
  if (window.gtag) {
    window.gtag("event", action, params);
  }
};

// Device/platform info helper
const getDeviceInfo = () => {
  const ua = navigator.userAgent;
  let deviceType = "desktop";
  if (/Mobi|Android/i.test(ua)) deviceType = "mobile";
  else if (/iPad|Tablet/i.test(ua)) deviceType = "tablet";
  return {
    device_type: deviceType,
    user_agent: ua,
    platform: navigator.platform,
  };
};

const LimSimiQuiz = () => {
  const [currentPage, setCurrentPage] = useState("validation"); //'home'
  const [testerCode, setTesterCode] = useState("");
  const [scores, setScores] = useState({
    introvertScore: 0,
    extrovertScore: 0,
    judgingScore: 0,
    perceivingScore: 0,
    sensingScore: 0,
    intuitionScore: 0,
    thinkingScore: 0,
    feelingScore: 0,
  });

  // Track quiz start time
  const quizStartTime = useRef(null);
  // Track question start time for time per question (optional, not sent yet)
  const questionStartTime = useRef(null);
  // Track if landing page event has fired
  const landingPageTracked = useRef(false);
  const longPressTimer = useRef(null);

  // Fire landing page event once per session
  useEffect(() => {
    if (currentPage === "home" && !landingPageTracked.current) {
      sendGtagEvent("landing_page_visit", {
        event_category: "funnel",
        event_label: "Landing Page",
        ...getDeviceInfo(),
      });
      landingPageTracked.current = true;
    }
  }, [currentPage]);

  /*For testing, to remove once done*/
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [titleClickCount, setTitleClickCount] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const validTesterCodes = ["BATOCKS", "KYSUCKS", "HARLOTESTING", "KHISCOOL"];

  const handleTesterCodeSubmit = (e) => {
    e.preventDefault();
    if (validTesterCodes.includes(testerCode.toUpperCase())) {
      setIsValidated(true);
      setCurrentPage("home");
    } else {
      alert("Invalid tester code. Please contact @tyeckh for access.");
      setTesterCode("");
    }
  };

  const handleTitleClick = () => {
    const newCount = titleClickCount + 1;
    setTitleClickCount(newCount);

    if (newCount >= 15) {
      setIsValidated(true);
      setCurrentPage("home");
      setTimeout(() => {
        alert("🎉 Secret access unlocked! Welcome to LimSimi! 🥤");
      }, 100);
    }
  };

  // If not validated, show validation page for all attempts to navigate
  if (!isValidated) {
    return (
      <div className="quiz-app validation-page">
        <div className="wrapper">
          <div className="validation-container">
            <h1
              className="validation-title clickable-title"
              onClick={handleTitleClick}
              style={{ cursor: "pointer" }}
            >
              LimSimi Quiz
            </h1>

            {titleClickCount > 2 && titleClickCount < 5 && (
              <div className="click-hint">Woah are you sure about this? 🤔</div>
            )}
            {titleClickCount > 5 && titleClickCount < 15 && (
              <div className="click-hint">
                🤫 ok, {titleClickCount} clicks... keep going!
              </div>
            )}
            <div className="validation-card">
              <h2 className="validation-subtitle">Beta Testing Access</h2>
              <p className="validation-description">
                This webpage is currently in testing phase. Please enter your
                tester code to continue.
              </p>

              <form
                onSubmit={handleTesterCodeSubmit}
                className="validation-form"
              >
                <input
                  type="text"
                  value={testerCode}
                  onChange={(e) => setTesterCode(e.target.value)}
                  placeholder="Enter tester code"
                  className="tester-input"
                  required
                />
                <button type="submit" className="validate-button">
                  Access Quiz
                </button>
              </form>

              <p className="validation-footer">
                Need access? Contact @tyeckh for a tester code.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  /*---------------------------------------------------*/

  // When quiz starts, set quizStartTime and fire event
  const handleQuizStart = () => {
    quizStartTime.current = Date.now();
    questionStartTime.current = Date.now();
    sendGtagEvent("quiz_start", {
      event_category: "funnel",
      event_label: "Quiz Started",
      ...getDeviceInfo(),
    });
    setCurrentPage("intro");
  };

  // Updated questions with new storyline
  const questions = [
    {
      question:
        'The uncle grins and says, "Young one! Before I can serve you, must first follow your heart lah. You see these two doors behind me?"',
      choices: [
        "I'll go through the busy door where I can hear voices and laughter!",
        "I prefer the quiet door - let me explore at my own pace.",
      ],
      weights: [
        { extrovertScore: 2, perceivingScore: 1 },
        { introvertScore: 2, judgingScore: 1 },
      ],
    },
    {
      question:
        "You emerge in a magical void deck where aunties are playing mahjong with floating tiles, and walls show visions of Singapore's past and future.",
      choices: [
        "I'll sit with the aunties and learn from their stories of old Singapore.",
        "Those visions of future Singapore fascinate me, Let's check it out!",
      ],
      weights: [
        { sensingScore: 2, feelingScore: 1 },
        { intuitionScore: 2, thinkingScore: 1 },
      ],
    },
    {
      question:
        'Following the aunties\' directions, you reach Marina Bay where the Merlion statue glows and speaks: "solve this riddle: A kopitiam uncle has 100 thirsty customers but only 80 cups. How does he handle this?"',
      choices: [
        "Calculate and plan a fair, efficient way to distribute or find alternatives.",
        "Talk to the customers, some may be ok to wait or share if they feel heard.",
      ],
      weights: [
        { thinkingScore: 2, judgingScore: 1 },
        { feelingScore: 2, perceivingScore: 1 },
      ],
    },
    {
      question:
        'You teleported to a magical MRT train. The announcement says: "Next stop, Your Destiny". Two buttons appear: <Express> and <Scenic Route>',
      choices: [
        "Express please! I want to reach my destination efficiently.",
        "Scenic route sounds interesting - let's see where it takes me!",
      ],
      weights: [
        { judgingScore: 2, intuitionScore: 1 },
        { perceivingScore: 2, sensingScore: 1 },
      ],
    },
    {
      question:
        'The MRT drops you at ethereal Gardens by the Bay, where the Supertrees grow magical fruits. A gardenkeeper asks: "How will you harvest your drink ingredients?"',
      choices: [
        "I'll join the group harvest, to share discoveries and learn from others!",
        "I'll harvest alone to focus deeply and make objective choices.",
      ],
      weights: [
        { extrovertScore: 2, thinkingScore: 1 },
        { introvertScore: 2, feelingScore: 1 },
      ],
    },
    {
      question:
        "Drawn by whispers from the Supertrees, you step into Haji Lane where glowing murals pulse with hidden flavors and secret ingredients, waiting for you to choose the one that speaks to you.",
      choices: [
        "Let my intuition lead me from one mural to the next and see what unfolds.",
        "Systematically go through each mural to ensure nothing is missed.",
      ],
      weights: [
        { perceivingScore: 2, intuitionScore: 1 },
        { judgingScore: 2, sensingScore: 1 },
      ],
    },
    {
      question:
        'As you pick your ingredient from the mural, the wall shimmers and you fall through into a mystical kopitiam where an ancient coffee master guards a recipe vault. "Young seeker," he says, "which brewing wisdom calls to you?"',
      choices: [
        "I trust traditional recipes, they've worked for generations and give structure to the process.",
        "Let's try that experimental fusion technique, I'm curious what new flavours we can invent.",
      ],
      weights: [
        { sensingScore: 2, judgingScore: 1 },
        { intuitionScore: 2, perceivingScore: 1 },
      ],
    },
    {
      question:
        'The coffee master hands you a golden recipe scroll that transports you to a mystical lab. A voice echoes: "Your drink needs some calibration. How will you choose to find the perfect taste?"',
      choices: [
        "Precise measurements and scientific analysis to achieve perfect balance!",
        "I'll taste and adjust based on how each sip makes me feel!",
      ],
      weights: [
        { thinkingScore: 2, judgingScore: 1 },
        { feelingScore: 2, perceivingScore: 1 },
      ],
    },
    {
      question:
        "The lab's portal opens to a floating Orchard Road where recipes are ingrained in the golden scroll you have. How do you want to finalize your perfect drink creation?",
      choices: [
        "Give me a structured recipe with clear steps and guaranteed results!",
        "I want a flexible recipe guide that lets people improvise and experiment!",
      ],
      weights: [
        { judgingScore: 2, sensingScore: 1 },
        { perceivingScore: 2, intuitionScore: 1 },
      ],
    },
    {
      question:
        'Emerging from the ceremony, you find yourself in a crystal chamber, where two floating crystals await. A voice echoes: "Choose the crystal that will seal your drink\'s true nature."',
      choices: [
        "The steady crystal — timeless and dependable, with grounded flavour.",
        "The shifting crystal — creative and emotional, always evolving.",
      ],
      weights: [
        { sensingScore: 2, feelingScore: 1 },
        { intuitionScore: 2, thinkingScore: 1 },
      ],
    },
  ];
  

  const questionImages = [
    "mystical_shop.webp",
    "mahjong_aunties.webp",
    "merlion_quiz.webp",
    "mrt_choice.webp",
    "supertrees.webp",
    "haji_lane.webp",
    "ancient_recipes.webp",
    "mystical_lab.webp",
    "orchard_road.webp",
    "floating_crystals.webp",
  ];

  const drinkResults = {
    ENTJ: {
      name: "Teh C Kosong",
      image: "DrinkCards/teh_c_kosong.png",
      thumbnail: "Thumbnails/teh_c_kosong_thumbnail.webp",
    },
    INTJ: {
      name: "Kopi Gao",
      image: "DrinkCards/kopi_gao.png",
      thumbnail: "Thumbnails/kopi_gao_thumbnail.webp",
    },
    ENTP: {
      name: "Soursop Juice",
      image: "DrinkCards/soursop_juice.png",
      thumbnail: "Thumbnails/soursop_juice_thumbnail.webp",
    },
    INTP: {
      name: "Black & White",
      image: "DrinkCards/black_white_drink.png",
      thumbnail: "Thumbnails/black_white_drink_thumbnail.webp",
    },
    ENFJ: {
      name: "Barley Water",
      image: "DrinkCards/barley_water.png",
      thumbnail: "Thumbnails/barley_water_thumbnail.webp",
    },
    INFJ: {
      name: "Chrysanthemum Tea",
      image: "DrinkCards/chrysanthemum_tea.png",
      thumbnail: "Thumbnails/chrysanthemum_tea_thumbnail.webp",
    },
    ENFP: {
      name: "Milo Dinosaur",
      image: "DrinkCards/milo_dinosaur.png",
      thumbnail: "Thumbnails/milo_dinosaur_thumbnail.webp",
    },
    INFP: {
      name: "Bandung",
      image: "DrinkCards/bandung.png",
      thumbnail: "Thumbnails/bandung_thumbnail.webp",
    },
    ESFJ: {
      name: "Honey Lemon",
      image: "DrinkCards/honey_lemon.png",
      thumbnail: "Thumbnails/honey_lemon_thumbnail.webp",
    },
    ISFJ: {
      name: "Soya Milk",
      image: "DrinkCards/soya_milk.png",
      thumbnail: "Thumbnails/soya_milk_thumbnail.webp",
    },
    ESTJ: {
      name: "Lime Juice",
      image: "DrinkCards/lime_juice.png",
      thumbnail: "Thumbnails/lime_juice_thumbnail.webp",
    },
    ISTJ: {
      name: "Kopi O Kosong",
      image: "DrinkCards/kopi_o_kosong.png",
      thumbnail: "Thumbnails/kopi_o_kosong_thumbnail.webp",
    },
    ESTP: {
      name: "Coconut Shake",
      image: "DrinkCards/coconut_shake.png",
      thumbnail: "Thumbnails/coconut_shake_thumbnail.webp",
    },
    ISTP: {
      name: "Sugarcane Juice",
      image: "DrinkCards/sugarcane_juice.png",
      thumbnail: "Thumbnails/sugarcane_juice_thumbnail.webp",
    },
    ESFP: {
      name: "Bubble Tea",
      image: "DrinkCards/bubble_tea.png",
      thumbnail: "Thumbnails/bubble_tea_thumbnail.webp",
    },
    ISFP: {
      name: "Avocado Shake",
      image: "DrinkCards/avocado_shake.png",
      thumbnail: "Thumbnails/avocado_shake_thumbnail.webp",
    },
  };

  const handleChoiceClick = (choiceIndex) => {
    const currentQuestion = questions[currentQuestionIndex];
    const selectedWeight = currentQuestion.weights[choiceIndex];

    // Track question response event
    const now = Date.now();
    let timeSpent = null;
    if (questionStartTime.current) {
      timeSpent = Math.round((now - questionStartTime.current) / 1000); // seconds
    }
    sendGtagEvent("question_answered", {
      event_category: "quiz",
      event_label: `Question ${currentQuestionIndex + 1}`,
      question_index: currentQuestionIndex + 1,
      choice_index: choiceIndex,
      time_spent: timeSpent,
      ...getDeviceInfo(),
    });
    questionStartTime.current = now;

    setScores((prevScores) => {
      const newScores = { ...prevScores };
      Object.keys(selectedWeight).forEach((key) => {
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
    const introextro =
      scores.introvertScore > scores.extrovertScore ? "I" : "E";
    const sensint = scores.sensingScore > scores.intuitionScore ? "S" : "N";
    const thinkfeel = scores.thinkingScore > scores.feelingScore ? "T" : "F";
    const judgeper = scores.judgingScore > scores.perceivingScore ? "J" : "P";

    const mbtiType = introextro + sensint + thinkfeel + judgeper;
    setCurrentPage("ending");
    window.currentResult = {
      mbtiType,
      drink: drinkResults[mbtiType],
    };
    // Fire quiz complete event
    const endTime = Date.now();
    let duration = null;
    if (quizStartTime.current) {
      duration = Math.round((endTime - quizStartTime.current) / 1000); // seconds
    }
    sendGtagEvent("quiz_complete", {
      event_category: "funnel",
      event_label: "Quiz Completed",
      mbti_type: mbtiType,
      drink_name: drinkResults[mbtiType]?.name,
      completion_time: duration,
      ...getDeviceInfo(),
    });
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
      feelingScore: 0,
    });
    setCurrentPage("home");
    // Fire try again event
    sendGtagEvent("quiz_try_again", {
      event_category: "engagement",
      event_label: "Try Again",
      ...getDeviceInfo(),
    });
    // Reset quiz start time for next attempt
    quizStartTime.current = null;
    questionStartTime.current = null;
  };

  const shareQuiz = async () => {
    const result = window.currentResult;
    sendGtagEvent("share_quest", {
      event_category: "engagement",
      event_label: "Share Quest Button",
      mbti_type: result?.mbtiType,
      drink_name: result?.drink?.name,
    });
    const drinkName = result?.drink.name || "my drink";

    const customMessage = `✨Wah! I'm ${drinkName} in the LimSimi Quiz!🥤 Come and find out your Singapore drink match! 🇸🇬 ${window.location.href}`;

    // Check if native share with files is supported
    if (navigator.share && navigator.canShare) {
      try {
        // Fetch the image as a blob
        const response = await fetch(result.drink.image);
        const blob = await response.blob();

        // Create a file from the blob
        const file = new File([blob], `${drinkName.replace(/\s+/g, "_")}.png`, {
          type: blob.type,
        });

        // Check if sharing files is supported
        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: "🍵 LimSimi Quiz - My Singapore Drink!",
            text: customMessage,
            files: [file],
          });
          return;
        }
      } catch (error) {
        console.log("File sharing not supported, falling back to text only");
      }
    }

    // Fallback: Text only
    if (navigator.share) {
      navigator.share({
        title: "🍵 LimSimi Quiz - My Singapore Drink!",
        text: customMessage,
      });
    } else {
      navigator.clipboard
        .writeText(customMessage)
        .then(() =>
          alert(
            "Message copied to clipboard! 📋\n\nTip: Long press your drink card above to save the image separately!"
          )
        )
        .catch((err) => console.error("Failed to copy: ", err));
    }
  };

  const showAllDrinks = () => {
    const result = window.currentResult;
    sendGtagEvent("view_all_drinks", {
      event_category: "navigation",
      event_label: "All Drinks Button",
      mbti_type: result?.mbtiType,
      drink_name: result?.drink?.name,
    });
    setCurrentPage("allDrinks");
  };

  const showDrinkDetail = (mbtiType) => {
    window.currentResult = {
      mbtiType,
      drink: drinkResults[mbtiType],
    };
    setCurrentPage("drinkDetail");
  };

  // Copyright component
  const Copyright = () => (
    <div className="copyright-footer">© 2025 LimSimi by @tyeckh</div>
  );

  if (currentPage === "home") {
    return (
      <div className="quiz-app home-page">
        <div className="star-field"></div>
        <div className="wrapper">
          <header className="header">
            <h1 className="title">LimSimi?</h1>
          </header>
          <h2 className="subtitle">Discover your Singaporean Drink!</h2>
          <h3 className="description">
            Embark on a magical journey to uncover your perfect Singaporean
            drink match!
          </h3>
          <button className="main-button" onClick={handleQuizStart}>
            Take the quiz
          </button>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === "intro") {
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question">{`You're walking past your favorite hawker center when you notice an uncle at a mysterious stall you've never seen before. His sign reads "Mystical Drinks - Find Your True Taste." As you approach, he winks and the world shimmers...`}</div>

            <img
              src="uncle_wink.webp"
              alt="Uncle winking at mysterious stall"
              className="question-image"
            />

            <div className="choices-container">
              <button
                className="whoosh-button"
                onClick={() => setCurrentPage("quiz")}
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

  if (currentPage === "quiz") {
    const currentQuestion = questions[currentQuestionIndex];

    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question-number">
              Q{currentQuestionIndex + 1}/{questions.length}
            </div>

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
  if (currentPage === "ending") {
    return (
      <div className="quiz-app">
        <div className="wrapper">
          <div className="quiz-container">
            <div className="question">
              You find yourself back at the original hawker stall, but now the
              mysterious uncle is holding a steaming cup of your perfectly
              crafted drink. "Wah, you completed the whole quest! Your journey
              through magical Singapore has revealed exactly which drink matches
              your personality."
            </div>

            <img
              src="ending_uncle.webp"
              alt="Uncle preparing your destined drink"
              className="question-image"
            />

            <div className="choices-container">
              <button
                className="whoosh-button"
                onClick={() => setCurrentPage("results")}
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

  if (currentPage === "results") {
    const result = window.currentResult || {
      mbtiType: "ISFP",
      drink: drinkResults["ISFP"],
    };

    return (
      <div className="quiz-app results-page">
        <div className="wrapper">
          <div className="results-container">
            <div className="share-header">
              <div className="share-text">Feel free to share your result!</div>
              <div className="share-hashtag">
                psst... long press to save your drink card
              </div>
            </div>

            <div className="result-card">
              <img
                src={result.drink.image}
                alt={result.drink.name}
                className="drink-result-image"
                onClick={() => {
                  sendGtagEvent("click_drink_image", {
                    event_category: "engagement",
                    event_label: "Drink Image Clicked",
                    mbti_type: result?.mbtiType,
                    drink_name: result?.drink?.name,
                  });
                }}
                onContextMenu={() => {
                  sendGtagEvent("contextmenu_drink_image", {
                    event_category: "engagement",
                    event_label: "Drink Image Right-Click",
                    mbti_type: result?.mbtiType,
                    drink_name: result?.drink?.name,
                  });
                }}
                onTouchStart={() => {
                  longPressTimer.current = setTimeout(() => {
                    sendGtagEvent("longpress_drink_image", {
                      event_category: "engagement",
                      event_label: "Drink Image Long-Press",
                      mbti_type: result?.mbtiType,
                      drink_name: result?.drink?.name,
                    });
                  }, 600); // 600ms = long press
                }}
                onTouchEnd={() => {
                  clearTimeout(longPressTimer.current);
                }}
                onTouchMove={() => {
                  clearTimeout(longPressTimer.current);
                }}
              />
            </div>

            <div className="button-container">
              <button className="small-button" onClick={shareQuiz}>
                Share Quest
              </button>
              <button className="small-button" onClick={showAllDrinks}>
                All Drinks
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === "allDrinks") {
    const allMBTITypes = Object.keys(drinkResults);

    return (
      <div className="quiz-app all-drinks-page">
        <div className="wrapper">
          <div className="all-drinks-container">
            <h1 className="page-title">Kopitiam Menu</h1>
            <p className="page-subtitle">
              Discover every personality drink match!
            </p>

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
                onClick={() => setCurrentPage("results")}
              >
                ← Back to Results
              </button>
              <button className="try-again-button" onClick={resetQuiz}>
                Try Again
              </button>
            </div>
          </div>
        </div>
        <Copyright />
      </div>
    );
  }

  if (currentPage === "drinkDetail") {
    const result = window.currentResult || {
      mbtiType: "ISFP",
      drink: drinkResults["ISFP"],
    };

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
                onContextMenu={() => {
                  sendGtagEvent("contextmenu_drink_image", {
                    event_category: "engagement",
                    event_label: "Drink Image Right-Click",
                    mbti_type: result?.mbtiType,
                    drink_name: result?.drink?.name,
                  });
                }}
              />
            </div>

            <div className="button-container">
              <button
                className="small-button"
                onClick={() => setCurrentPage("allDrinks")}
              >
                ← All Drinks
              </button>
              <button className="small-button" onClick={resetQuiz}>
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
