const questions = [
    "Before a test/exam, I am worried I will fail.",
    "I forget previously known material before taking a test/exam.",
    "Even when I have prepared for a test/exam I feel nervous about it.",
    "Before I take a test/exam my hand trembles.",
    "During tests/exams, I worry about the consequences of failing.",
    "I forget facts I have learnt during tests/exams.",
    "I feel tense before taking a test/exam.",
    "My heart races when I take a test/exam.",
    "After a test/exam, I am worried I have failed.",
    "During tests/exams, I forget things that I have learnt.",
    "Just before I take a test/exam, I feel panicky.",
    "During a test/exam I experience stomach discomfort.",
    "During a test/exam, I worry that I gave the wrong answers.",
    "During tests/exams, I find it hard to concentrate.",
    "Before a test/exam, I feel nervous.",
    "During a test/exam, my muscles are tight."
];

const subscales = {
    worry: [1, 5, 9, 13], // Item numbers are 1-based
    cognitiveInterference: [2, 6, 10, 14],
    tension: [3, 7, 11, 15],
    physiologicalIndicators: [4, 8, 12, 16]
};

const scores = [
    { text: "Strongly Disagree", value: 1 },
    { text: "Disagree", value: 2 },
    { text: "Neither Agree nor Disagree", value: 3 },
    { text: "Agree", value: 4 },
    { text: "Strongly Agree", value: 5 }
];

let currentQuestionIndex = 0;
let userResponses = new Array(questions.length).fill(null);
let userAge = null;
let userGender = null;

// DOM Elements
const instructionPage = document.getElementById('instruction-page');
const agePage = document.getElementById('age-page');
const genderPage = document.getElementById('gender-page');
const questionPage = document.getElementById('question-page');
const resultsPage = document.getElementById('results-page');

const startTestBtn = document.getElementById('start-test');
const ageSelect = document.getElementById('age-select');
const prevAgeBtn = document.getElementById('prev-age');
const nextAgeBtn = document.getElementById('next-age');
const genderRadios = document.querySelectorAll('input[name="gender"]');
const prevGenderBtn = document.getElementById('prev-gender');
const nextGenderBtn = document.getElementById('next-gender');
const questionNumberElement = document.getElementById('question-number');
const questionTextElement = document.getElementById('question-text');
const answerOptionsElement = document.getElementById('answer-options');
const prevQuestionBtn = document.getElementById('prev-question');
const restartTestBtn = document.getElementById('restart-test');

// Populate age dropdown
for (let i = 11; i <= 18; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    ageSelect.appendChild(option);
}

function showPage(pageToShow) {
    [instructionPage, agePage, genderPage, questionPage, resultsPage].forEach(page => {
        page.classList.add('hidden');
    });
    pageToShow.classList.remove('hidden');
}

function renderQuestion() {
    if (currentQuestionIndex < questions.length) {
        showPage(questionPage);
        questionNumberElement.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        questionTextElement.textContent = questions[currentQuestionIndex];
        answerOptionsElement.innerHTML = ''; // Clear previous options

        scores.forEach(scoreOption => {
            const optionDiv = document.createElement('div');
            optionDiv.classList.add('answer-option');
            optionDiv.textContent = scoreOption.text;
            optionDiv.dataset.value = scoreOption.value;

            if (userResponses[currentQuestionIndex] === scoreOption.value) {
                optionDiv.classList.add('selected');
            }

            optionDiv.addEventListener('click', () => {
                userResponses[currentQuestionIndex] = scoreOption.value;
                // Visual feedback
                Array.from(answerOptionsElement.children).forEach(child => {
                    child.classList.remove('selected');
                });
                optionDiv.classList.add('selected');

                // Automatically proceed to next question after a short delay for visual feedback
                setTimeout(() => {
                    currentQuestionIndex++;
                    if (currentQuestionIndex < questions.length) {
                        renderQuestion();
                    } else {
                        showResults();
                    }
                }, 300);
            });
            answerOptionsElement.appendChild(optionDiv);
        });
    } else {
        showResults();
    }
}

function calculateScores() {
    const totalScore = userResponses.reduce((sum, response) => sum + response, 0);

    const getSubscaleScore = (itemNumbers) => {
        return itemNumbers.reduce((sum, itemNum) => sum + userResponses[itemNum - 1], 0);
    };

    const worryScore = getSubscaleScore(subscales.worry);
    const cognitiveInterferenceScore = getSubscaleScore(subscales.cognitiveInterference);
    const tensionScore = getSubscaleScore(subscales.tension);
    const physiologicalIndicatorsScore = getSubscaleScore(subscales.physiologicalIndicators);

    return {
        totalScore,
        worryScore,
        cognitiveInterferenceScore,
        tensionScore,
        physiologicalIndicatorsScore
    };
}

function showResults() {
    showPage(resultsPage);

    // Validate if all questions have been answered
    if (userResponses.includes(null)) {
        alert("Please answer all questions before viewing results.");
        // Redirect back to the last unanswered question or the beginning of questions
        const firstNullIndex = userResponses.findIndex(response => response === null);
        currentQuestionIndex = firstNullIndex !== -1 ? firstNullIndex : 0; // Fallback to first question
        renderQuestion();
        return;
    }

    const calculated = calculateScores();

    // Populate table cells with results
    document.getElementById('total-score').textContent = calculated.totalScore;
    document.getElementById('worry-score').textContent = calculated.worryScore;
    document.getElementById('cognitive-interference-score').textContent = calculated.cognitiveInterferenceScore;
    document.getElementById('tension-score').textContent = calculated.tensionScore;
    document.getElementById('physiological-indicators-score').textContent = calculated.physiologicalIndicatorsScore;

    updateAnxietySlider(calculated.totalScore);
}

function updateAnxietySlider(totalScore) {
    const minScore = 16; // 16 questions * 1 (min score per question)
    const maxScore = 80;  // 16 questions * 5 (max score per question)
    const scoreRange = maxScore - minScore;

    const normalizedScore = (totalScore - minScore) / scoreRange; // 0 to 1

    const sliderFill = document.getElementById('slider-fill');
    const sliderThumb = document.getElementById('slider-thumb');
    const anxietyLevelText = document.getElementById('anxiety-level-text');

    // Calculate position for the thumb and fill width
    // We want the slider to visually represent the anxiety level
    const fillPercentage = normalizedScore * 100;
    sliderFill.style.width = `${fillPercentage}%`;
    sliderThumb.style.left = `calc(${fillPercentage}% - 10px)`; // Adjust 10px for half thumb width

    let level = '';
    let colorClass = '';

    if (totalScore <= 32) { // Roughly bottom 25%
        level = 'Very Low Anxiety';
        colorClass = 'level-very-low';
    } else if (totalScore <= 48) { // Roughly 25%-50%
        level = 'Low Anxiety';
        colorClass = 'level-low';
    } else if (totalScore <= 64) { // Roughly 50%-75%
        level = 'Moderate Anxiety';
        colorClass = 'level-moderate';
    } else { // Top 25%
        level = 'High Anxiety';
        colorClass = 'level-high';
    }

    anxietyLevelText.textContent = level;
    // Remove all level classes before adding the new one
    sliderFill.classList.remove('level-very-low', 'level-low', 'level-moderate', 'level-high');
    sliderThumb.classList.remove('level-very-low', 'level-low', 'level-moderate', 'level-high');
    anxietyLevelText.classList.remove('level-very-low', 'level-low', 'level-moderate', 'level-high');

    sliderFill.classList.add(colorClass);
    sliderThumb.classList.add(colorClass);
    anxietyLevelText.classList.add(colorClass);
}

// Event Listeners
startTestBtn.addEventListener('click', () => showPage(agePage));

nextAgeBtn.addEventListener('click', () => {
    userAge = ageSelect.value;
    if (userAge) {
        showPage(genderPage);
    } else {
        alert('Please select your age.');
    }
});

prevAgeBtn.addEventListener('click', () => showPage(instructionPage));

nextGenderBtn.addEventListener('click', () => {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    if (selectedGender) {
        userGender = selectedGender.value;
        renderQuestion();
    } else {
        alert('Please select your gender.');
    }
});

prevGenderBtn.addEventListener('click', () => showPage(agePage));

prevQuestionBtn.addEventListener('click', () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        renderQuestion();
    } else {
        // If on the first question, go back to gender selection
        showPage(genderPage);
    }
});

restartTestBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    userResponses.fill(null);
    userAge = null;
    userGender = null;
    // Uncheck gender radios
    genderRadios.forEach(radio => radio.checked = false);
    // Reset age selection
    ageSelect.value = ageSelect.options[0].value;
    showPage(instructionPage);
});

// Initialize
showPage(instructionPage);