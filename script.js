document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const testTitle = document.getElementById('test-title');
    const instructions = document.getElementById('instructions');
    const ageSelect = document.getElementById('age-select');
    const questionSection = document.getElementById('question-section');
    const questionHeader = document.getElementById('question-header');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');
    const resultsSection = document.getElementById('results-section');
    const subscaleScoresContainer = document.getElementById('subscale-scores');
    const takeAgainButton = document.getElementById('take-again-button');

    // --- State Variables ---
    let currentQuestionIndex = 0;
    let scores = []; // Stores score for each question (1-5)
    let selectedAge = 11; // Default age
    let selectedGender = 'male'; // Default gender
    let showResults = false;

    // --- MTAS Data ---
    const mtasQuestions = [
        { text: "Before a test/exam, I am worried I will fail." },
        { text: "I forget previously known material before taking a test/exam." },
        { text: "Even when I have prepared for a test/exam I feel nervous about it." },
        { text: "Before I take a test/exam my hand trembles." },
        { text: "During tests/exams, I worry about the consequences of failing." },
        { text: "I forget facts I have learnt during tests/exams." },
        { text: "I feel tense before taking a test/exam." },
        { text: "My heart races when I take a test/exam." },
        { text: "After a test/exam, I am worried I have failed." },
        { text: "During tests/exams, I forget things that I have learnt." },
        { text: "Just before I take a test/exam, I feel panicky." },
        { text: "During a test/exam I experience stomach discomfort." },
        { text: "During a test/exam, I worry that I gave the wrong answers." },
        { text: "During tests/exams, I find it hard to concentrate." },
        { text: "Before a test/exam, I feel nervous." },
        { text: "During a test/exam, my muscles are tight." }
    ];

    const subscaleItems = {
        worry: [0, 4, 8, 12], // Questions 1, 5, 9, 13 (0-indexed)
        cognitiveInterference: [1, 5, 9, 13], // Questions 2, 6, 10, 14 (0-indexed)
        tension: [2, 6, 10, 14], // Questions 3, 7, 11, 15 (0-indexed)
        physiologicalIndicators: [3, 7, 11, 15], // Questions 4, 8, 12, 16 (0-indexed)
    };

    const answerOptions = [
        { score: 1, label: "Strongly Disagree" },
        { score: 2, label: "Disagree" },
        { score: 3, label: "Neither agree nor disagree" },
        { score: 4, label: "Agree" },
        { score: 5, label: "Strongly Agree" },
    ];

    // --- Functions ---

    const initializeTest = () => {
        scores = Array(mtasQuestions.length).fill(0); // Default score 0, user selects 1-5
        currentQuestionIndex = 0;
        selectedAge = parseInt(ageSelect.value, 10); // Set initial age
        // Set initial gender from checked radio button
        selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
        showResults = false;
        renderQuestion();
        updateProgressBar();
        updateNavigationButtons();
        questionSection.style.display = 'block';
        resultsSection.style.display = 'none';
    };

    const renderQuestion = () => {
        if (currentQuestionIndex < mtasQuestions.length) {
            questionHeader.textContent = `Question ${currentQuestionIndex + 1}/${mtasQuestions.length}`;
            questionText.textContent = mtasQuestions[currentQuestionIndex].text;
            optionsContainer.innerHTML = ''; // Clear previous options

            answerOptions.forEach(option => {
                const label = document.createElement('label');
                label.innerHTML = `
                    <input type="radio" name="answer" value="${option.score}" ${scores[currentQuestionIndex] === option.score ? 'checked' : ''}>
                    ${option.label}
                `;
                optionsContainer.appendChild(label);
            });
        }
    };

    const handleAnswerSelect = (event) => {
        if (event.target.name === 'answer') {
            scores[currentQuestionIndex] = parseInt(event.target.value, 10);
        }
    };

    const handleAgeChange = () => {
        selectedAge = parseInt(ageSelect.value, 10);
    };

    const handleGenderChange = () => {
        selectedGender = document.querySelector('input[name="gender"]:checked').value;
    };

    const updateProgressBar = () => {
        const progress = document.getElementById('progress');
        const progressPercentage = ((currentQuestionIndex + 1) / mtasQuestions.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    };

    const updateNavigationButtons = () => {
        prevButton.disabled = currentQuestionIndex === 0;
        nextButton.textContent = currentQuestionIndex === mtasQuestions.length - 1 ? 'Finish' : 'Next';
    };

    const calculateSubscaleScores = () => {
        const subscaleScores = {
            worry: 0,
            cognitiveInterference: 0,
            tension: 0,
            physiologicalIndicators: 0,
        };

        subscaleItems.worry.forEach(index => {
            subscaleScores.worry += scores[index];
        });
        subscaleItems.cognitiveInterference.forEach(index => {
            subscaleScores.cognitiveInterference += scores[index];
        });
        subscaleItems.tension.forEach(index => {
            subscaleScores.tension += scores[index];
        });
        subscaleItems.physiologicalIndicators.forEach(index => {
            subscaleScores.physiologicalIndicators += scores[index];
        });

        return subscaleScores;
    };

    const renderResults = () => {
        const calculatedScores = calculateSubscaleScores();
        subscaleScoresContainer.innerHTML = `
            <p>Worry: <strong>${calculatedScores.worry}</strong></p>
            <p>Cognitive Interference: <strong>${calculatedScores.cognitiveInterference}</strong></p>
            <p>Tension: <strong>${calculatedScores.tension}</strong></p>
            <p>Physiological Indicators: <strong>${calculatedScores.physiologicalIndicators}</strong></p>
            <!-- Age: ${selectedAge} -->
            <!-- Gender: ${selectedGender} -->
            <!-- Interpretation will be added here when available -->
        `;
        questionSection.style.display = 'none';
        resultsSection.style.display = 'block';
    };

    const navigateToNextQuestion = () => {
        if (currentQuestionIndex < mtasQuestions.length - 1) {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (!selectedAnswer) {
                alert('Please select an answer before continuing.');
                return;
            }
            currentQuestionIndex++;
            renderQuestion();
            updateProgressBar();
            updateNavigationButtons();
        } else {
            const selectedAnswer = document.querySelector('input[name="answer"]:checked');
            if (!selectedAnswer) {
                alert('Please select an answer before finishing.');
                return;
            }
            showResults = true;
            renderResults();
        }
    };

    const navigateToPrevQuestion = () => {
        if (currentQuestionIndex > 0) {
            currentQuestionIndex--;
            renderQuestion();
            updateProgressBar();
            updateNavigationButtons();
        }
    };

    const resetTest = () => {
        scores = Array(mtasQuestions.length).fill(0); // Reset scores
        currentQuestionIndex = 0;
        selectedAge = parseInt(ageSelect.value, 10); // Reset to current dropdown value
        selectedGender = document.querySelector('input[name="gender"]:checked').value; // Reset to current selected gender
        showResults = false;
        renderQuestion();
        updateProgressBar();
        updateNavigationButtons();
        questionSection.style.display = 'block';
        resultsSection.style.display = 'none';
    };

    // --- Event Listeners ---
    optionsContainer.addEventListener('change', handleAnswerSelect);
    nextButton.addEventListener('click', navigateToNextQuestion);
    prevButton.addEventListener('click', navigateToPrevQuestion);
    ageSelect.addEventListener('change', handleAgeChange);
    takeAgainButton.addEventListener('click', resetTest);

    // Get gender radio buttons and add event listener
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    genderRadios.forEach(radio => {
        radio.addEventListener('change', handleGenderChange);
    });

    // --- Initial Setup ---
    initializeTest();
});