const quizData = [
    {
      question: 'What material is commonly used for the outsole of running shoes to provide durability and traction?',
      options: [' Leather', 'Mesh', 'Rubber', 'EVA foam'],
      answer: 'Rubber',
    },
    {
      question: 'Which iconic basketball player has a popular line of signature sneakers with Nike?',
      options: ['Kobe Bryant', ' LeBron James', 'Kevin Durant', 'Michael Jordan'],
      answer: 'Jupiter',
    },
    {
      question: ' What is the purpose of the midsole in a shoe?',
      options: ['Arch support', 'Cushioning and shock absorption', ' Traction', 'Breathability'],
      answer:  'Cushioning and shock absorption',
    },
    {
      question: 'In the context of shoe sizing, what does "D" typically stand for?',
      options: ['Narrow width', 'Wide width', 'Medium width', 'Extra-wide width'],
      answer: 'Medium width',
    },
    {
      question: ' What technology, often associated with Adidas, uses energy-returning properties to enhance running performance?',
      options: [
        'Air Max',
        'Boost technology',
        'Flyknit',
        'React Foam',
      ],
      answer: 'Boost technology',
    },
    {
      question: 'Which type of shoe is specifically designed for activities like hiking and trekking, providing ankle support and durability?',
      options: [' Running shoes', ' Cross-training shoes', 'Hiking boots', ' Skate shoes'],
      answer: 'Hiking boots',
    },
    {
      question: 'What is the term for a shoe that has a completely flat sole without any heel elevation?',
      options: [
        'Platform',
        'Zero-drop',
        'Wedge',
        'Stiletto',
      ],
      answer: ' Zero-drop',
    },
    {
      question: 'Which fastening system eliminates traditional laces and is often found in running shoes for quick and easy adjustments?',
      options: ['Velcro straps', 'Elastic laces', ' Boa Closure System', 'Zipper'],
      answer: 'Boa Closure System',
    },
    {
      question: 'What is the name of the technology developed by Nike that offers responsive cushioning and support for various athletic activities?',
      options: [
        'Air Max',
        'Flyknit',
        'React Foam',
        ' Lunarlon',
      ],
      answer: 'React Foam',
    },
    {
      question: 'Which shoe brand is known for its environmentally friendly approach, using materials like recycled plastic bottles to create their products?',
      options: ['Puma', 'Reebok', 'Allbirds', 'Skechers'],
      answer: 'Allbirds',
    },
  ];
  
  const quizContainer = document.getElementById('quiz');
  const resultContainer = document.getElementById('result');
  const submitButton = document.getElementById('submit');
  const retryButton = document.getElementById('retry');
  const showAnswerButton = document.getElementById('showAnswer');
  
  let currentQuestion = 0;
  let score = 0;
  let incorrectAnswers = [];
  
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  function displayQuestion() {
    const questionData = quizData[currentQuestion];
  
    const questionElement = document.createElement('div');
    questionElement.className = 'question';
    questionElement.innerHTML = questionData.question;
  
    const optionsElement = document.createElement('div');
    optionsElement.className = 'options';
  
    const shuffledOptions = [...questionData.options];
    shuffleArray(shuffledOptions);
  
    for (let i = 0; i < shuffledOptions.length; i++) {
      const option = document.createElement('label');
      option.className = 'option';
  
      const radio = document.createElement('input');
      radio.type = 'radio';
      radio.name = 'quiz';
      radio.value = shuffledOptions[i];
  
      const optionText = document.createTextNode(shuffledOptions[i]);
  
      option.appendChild(radio);
      option.appendChild(optionText);
      optionsElement.appendChild(option);
    }
  
    quizContainer.innerHTML = '';
    quizContainer.appendChild(questionElement);
    quizContainer.appendChild(optionsElement);
  }
  
  function checkAnswer() {
    const selectedOption = document.querySelector('input[name="quiz"]:checked');
    if (selectedOption) {
      const answer = selectedOption.value;
      if (answer === quizData[currentQuestion].answer) {
        score++;
      } else {
        incorrectAnswers.push({
          question: quizData[currentQuestion].question,
          incorrectAnswer: answer,
          correctAnswer: quizData[currentQuestion].answer,
        });
      }
      currentQuestion++;
      selectedOption.checked = false;
      if (currentQuestion < quizData.length) {
        displayQuestion();
      } else {
        displayResult();
      }
    }
  }
  
  function displayResult() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'inline-block';
    resultContainer.innerHTML = `You scored ${score} out of ${quizData.length}!`;
  }
  
  function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    incorrectAnswers = [];
    quizContainer.style.display = 'block';
    submitButton.style.display = 'inline-block';
    retryButton.style.display = 'none';
    showAnswerButton.style.display = 'none';
    resultContainer.innerHTML = '';
    displayQuestion();
  }
  
  function showAnswer() {
    quizContainer.style.display = 'none';
    submitButton.style.display = 'none';
    retryButton.style.display = 'inline-block';
    showAnswerButton.style.display = 'none';
  
    let incorrectAnswersHtml = '';
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p>
          <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
          <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
          <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
  
    resultContainer.innerHTML = `
      <p>You scored ${score} out of ${quizData.length}!</p>
      <p>Incorrect Answers:</p>
      ${incorrectAnswersHtml}
    `;
  }
  
  submitButton.addEventListener('click', checkAnswer);
  retryButton.addEventListener('click', retryQuiz);
  showAnswerButton.addEventListener('click', showAnswer);
  
  displayQuestion();