document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const introPage = document.getElementById('intro-page');
    const ageSelectionPage = document.getElementById('age-selection-page');
    const genderSelectionPage = document.getElementById('gender-selection-page');
    const questionPage = document.getElementById('question-page');
    const resultsPage = document.getElementById('results-page');

    const testTitle = document.getElementById('test-title');
    const instructions = document.getElementById('instructions');
    const ageSelect = document.getElementById('age-select');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    const questionHeader = document.getElementById('question-header');
    const questionText = document.getElementById('question-text');
    const optionsContainer = document.getElementById('options-container');
    const prevButton = document.getElementById('prev-button'); // Used for questions/gender
    const nextButton = document.getElementById('next-button'); // Used for intro/age/gender
    const takeAgainButton = document.getElementById('take-again-button');
    const startButton = document.getElementById('start-button');
    const ageNextButton = document.getElementById('age-next-button');
    const genderNextButton = document.getElementById('gender-next-button');
    const genderPrevButton = document.getElementById('gender-prev-button');
    const questionPrevButton = document.getElementById('prev-button'); // Renamed for clarity, will use questionPrevButton in logic
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('progress');
    const subscaleScoresContainer = document.getElementById('subscale-scores');


    // --- State Variables ---
    let currentStep = 'intro'; // 'intro', 'age', 'gender', 'questions', 'results'
    let currentQuestionIndex = 0;
    let scores = []; // Stores score for each question (1-5)
    let selectedAge = 11; // Default age
    let selectedGender = 'male'; // Default gender
    
    const AUTO_ADVANCE_DELAY = 800; // milliseconds for auto-advance and flash effect

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

    // --- Page Management ---
    const showPage = (pageId) => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        document.getElementById(pageId).classList.add('active');
        currentStep = pageId.replace('-page', ''); // Update current step state
        updateUIForStep(currentStep);
    };

    const updateUIForStep = (step) => {
        // Hide/show common elements like progress bar, navigation based on step
        const isQuestionPage = step === 'questions';
        const isResultsPage = step === 'results';
        const isIntroPage = step === 'intro';

        // Control visibility of progress bar and specific buttons
        progressBar.style.display = isQuestionPage ? 'block' : 'none';
        // Navigation buttons:
        // Intro: Start button visible
        // Age: Next button visible
        // Gender: Prev, Next buttons visible
        // Questions: Prev button visible, Next button hidden (auto-advance)
        // Results: Take Again button visible

        // Reset specific elements for each step if needed
        if (step === 'intro') {
             // Ensure header/instructions are as expected for intro
        } else if (step === 'age') {
            // Ensure age selection is reset or reflects current state
        } else if (step === 'gender') {
            // Ensure gender selection is reset or reflects current state
        } else if (step === 'questions') {
            // Render question, handle navigation
            updateNavigationButtons();
        } else if (step === 'results') {
            renderResults();
        }
    };

    // --- Question Handling ---
    const renderQuestion = () => {
        if (currentQuestionIndex < mtasQuestions.length) {
            questionHeader.textContent = `Question ${currentQuestionIndex + 1}/${mtasQuestions.length}`;
            questionText.textContent = mtasQuestions[currentQuestionIndex].text;
            optionsContainer.innerHTML = ''; // Clear previous options

            answerOptions.forEach(option => {
                const label = document.createElement('label');
                label.classList.add('option-label');
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
            // Visual feedback for selection
            optionsContainer.querySelectorAll('.option-label').forEach(lbl => {
                lbl.style.backgroundColor = '#f8f9fa'; // Reset background
            });
            event.target.closest('.option-label').style.backgroundColor = '#e8f5e9'; // Highlight selected

            // Auto-advance to the next question after a short delay
            setTimeout(() => {
                advanceToNextQuestionOrResult();
            }, AUTO_ADVANCE_DELAY);
        }
    };

    const handleAgeChange = () => {
        selectedAge = parseInt(ageSelect.value, 10);
    };

    const handleGenderChange = () => {
        selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male';
    };

    const updateProgressBar = () => {
        const progressPercentage = ((currentQuestionIndex + 1) / mtasQuestions.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    };

    const updateNavigationButtons = () => {
        // For question page, prev button is always shown if not first question
        questionPrevButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
        // Next button is hidden on question page as we auto-advance
        nextButton.style.display = 'none'; 
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
        showPage('results');
    };

    const advanceToNextQuestionOrResult = () => {
        if (currentQuestionIndex < mtasQuestions.length - 1) {
            currentQuestionIndex++;
            renderQuestion();
            updateProgressBar();
            updateNavigationButtons();
            // Visual flash effect on question text area
            questionText.style.transition = 'none';
            questionText.style.opacity = '0.7';
            setTimeout(() => {
                questionText.style.transition = 'opacity 0.3s ease';
                questionText.style.opacity = '1';
            }, 50);
        } else {
            // All questions answered, show results
            showResults = true;
            renderResults();
        }
    };

    const goToPrevStep = () => {
        switch(currentStep) {
            case 'questions':
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                    updateProgressBar();
                } else { // If at the first question, go back to gender selection
                    showPage('gender-selection');
                }
                break;
            case 'gender':
                showPage('age-selection');
                break;
            case 'age':
                showPage('intro');
                break;
            // No 'prev' from intro or results
        }
    };

    const goToNextStep = () => {
        switch(currentStep) {
            case 'intro':
                showPage('age-selection');
                break;
            case 'age':
                selectedAge = parseInt(ageSelect.value, 10); // Capture age before moving
                showPage('gender-selection');
                break;
            case 'gender':
                selectedGender = document.querySelector('input[name="gender"]:checked').value; // Capture gender
                // Reset question state before starting questions
                currentQuestionIndex = 0;
                scores = Array(mtasQuestions.length).fill(0); // Reset scores for new test attempt
                renderQuestion();
                updateProgressBar();
                updateNavigationButtons();
                showPage('question');
                break;
            // For question page, advancement is handled by handleAnswerSelect and advanceToNextQuestionOrResult
            // For results page, 'Take Test Again' button is used
        }
    };

    const resetTest = () => {
        // Reset all state variables
        scores = Array(mtasQuestions.length).fill(0);
        currentQuestionIndex = 0;
        selectedAge = parseInt(ageSelect.value, 10); // Reset age to current dropdown value
        selectedGender = document.querySelector('input[name="gender"]:checked').value; // Reset gender to current selection
        showResults = false;
        
        // Go back to intro page to restart
        showPage('intro');
    };

    // --- Event Listeners ---
    startButton.addEventListener('click', () => goToNextStep());
    ageNextButton.addEventListener('click', () => goToNextStep());
    genderNextButton.addEventListener('click', () => goToNextStep());
    genderPrevButton.addEventListener('click', () => goToPrevStep());
    questionPrevButton.addEventListener('click', () => goToPrevStep());
    takeAgainButton.addEventListener('click', resetTest);
    
    optionsContainer.addEventListener('change', handleAnswerSelect);
    ageSelect.addEventListener('change', handleAgeChange);

    // Initial setup: show intro page
    showPage('intro');
});
