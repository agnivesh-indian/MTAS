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
    const prevButton = document.getElementById('prev-button'); // General prev button reference
    const nextButton = document.getElementById('next-button'); // General next button reference
    const takeAgainButton = document.getElementById('take-again-button');
    const startButton = document.getElementById('start-button');
    const ageNextButton = document.getElementById('age-next-button');
    const genderNextButton = document.getElementById('gender-next-button');
    const genderPrevButton = document.getElementById('gender-prev-button');
    const questionPrevButton = document.getElementById('prev-button'); // Specific button for question navigation
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

    // --- MTAS Data (defined globally above) ---
    // const MTAS_DATA = { ... };
    // const mtasQuestions = [ ... ];
    const subscaleItems = { 
        worry: [0, 4, 8, 12],
        cognitiveInterference: [1, 5, 9, 13],
        tension: [2, 6, 10, 14],
        physiologicalIndicators: [3, 7, 11, 15],
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
        const pageToShow = document.getElementById(pageId);
        if (pageToShow) {
            pageToShow.classList.add('active');
            currentStep = pageId.replace('-page', ''); // Update current step state
            updateUIForStep(currentStep);
        } else {
            console.error("Page element not found:", pageId);
            // As a fallback, try to log error to user if intro page is specifically missing
            if (pageId === 'intro') {
                alert("Error: Introduction page could not be loaded. Please check the console for details.");
            }
        }
    };

    const updateUIForStep = (step) => {
        const isQuestionPage = step === 'questions';
        const isResultsPage = step === 'results';
        const isIntroPage = step === 'intro';
        const isAgePage = step === 'age-selection';
        const isGenderPage = step === 'gender-selection';

        // Control visibility of progress bar
        if (progressBar) progressBar.style.display = isQuestionPage ? 'block' : 'none';
        
        // Navigation buttons visibility logic
        if (startButton) startButton.style.display = isIntroPage ? 'block' : 'none';
        if (ageNextButton) ageNextButton.style.display = isAgePage ? 'block' : 'none';
        if (genderPrevButton) genderPrevButton.style.display = isGenderPage ? 'block' : 'none';
        if (genderNextButton) genderNextButton.style.display = isGenderPage ? 'block' : 'none';
        if (questionPrevButton) questionPrevButton.style.display = isQuestionPage ? 'block' : 'none';
        if (takeAgainButton) takeAgainButton.style.display = isResultsPage ? 'block' : 'none';
        
        // Hide generic next button as specific ones are used
        if (nextButton) nextButton.style.display = 'none'; 

        // Specific element updates per step
        if (step === 'intro') {
            // Title and instructions are already set in HTML
        } else if (step === 'age') {
            if (ageSelect) ageSelect.value = selectedAge; // Ensure dropdown reflects current state
        } else if (step === 'gender') {
            const currentGenderRadio = document.querySelector(`input[name="gender"][value="${selectedGender}"]`);
            if (currentGenderRadio) {
                currentGenderRadio.checked = true;
            }
        } else if (step === 'questions') {
            updateProgressBar();
            updateNavigationButtons();
        } else if (step === 'results') {
            renderResults();
        }
    };

    // --- Question Handling ---
    const renderQuestion = () => {
        if (currentQuestionIndex < mtasQuestions.length) {
            if (!questionHeader || !questionText || !optionsContainer) return; // Safety check for elements
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
        if (!progress) return;
        const progressPercentage = ((currentQuestionIndex + 1) / mtasQuestions.length) * 100;
        progress.style.width = `${progressPercentage}%`;
    };

    const updateNavigationButtons = () => {
        // For question page, prev button is always shown if not first question
        if (questionPrevButton) questionPrevButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    };

    const calculateSubscaleScores = () => { // This function is kept for its current subscale logic but scoreMTAS is the main one used for reporting
        const subscaleScores = {
            worry: 0,
            cognitiveInterference: 0,
            tension: 0,
            physiologicalIndicators: 0,
        };

        subscaleItems.worry.forEach(index => {
            subscaleScores.worry += scores[index] || 0; // Ensure score is number, default to 0 if undefined
        });
        subscaleItems.cognitiveInterference.forEach(index => {
            subscaleScores.cognitiveInterference += scores[index] || 0;
        });
        subscaleItems.tension.forEach(index => {
            subscaleScores.tension += scores[index] || 0;
        });
        subscaleItems.physiologicalIndicators.forEach(index => {
            subscaleScores.physiologicalIndicators += scores[index] || 0;
        });

        return subscaleScores;
    };

    const renderResults = () => {
        // Call the provided scoreMTAS function
        const scoringResult = scoreMTAS(selectedAge, selectedGender, scores);
        
        if (scoringResult.error) {
            subscaleScoresContainer.innerHTML = `<p style="color: red;">Error calculating scores: ${scoringResult.error}</p>`;
            console.error("Scoring Error:", scoringResult.error);
            return;
        }

        const { total, subscales, percentile, zScore, status } = scoringResult;

        // Format the output as requested
        subscaleScoresContainer.innerHTML = `
            <p>Worry: <strong>${subscales.worry}</strong></p>
            <p>Cognitive Interference: <strong>${subscales.interference}</strong></p>
            <p>Tension: <strong>${subscales.tension}</strong></p>
            <p>Physiological Indicators: <strong>${subscales.physiologicalIndicators}</strong></p>
            
            <p class="profile-data">Student Profile: ${selectedAge} Year Old ${selectedGender.charAt(0).toUpperCase() + selectedGender.slice(1)}</p>
            
            <p>Raw Total: <strong>${total}</strong> / 80</p>

            <p>Normative Metrics: Percentile: <strong>${percentile}%</strong> | z-Score: <strong>${zScore}</strong></p>

            <p id="interpretation-text">Interpretation: <strong id="interpretation-value">${status}</strong></p>
        `;
        showPage('results');
    };

    const advanceToNextQuestionOrResult = () => {
        if (currentStep === 'questions') {
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
        } else {
            // If not on question page, this function shouldn't be called directly,
            // but as a safeguard, we can just move to next step if available.
            goToNextStep();
        }
    };

    const goToPrevStep = () => {
        switch(currentStep) {
            case 'questions':
                if (currentQuestionIndex > 0) {
                    currentQuestionIndex--;
                    renderQuestion();
                    updateProgressBar();
                    updateNavigationButtons();
                    // Reset visual feedback and ensure options are visible again
                    optionsContainer.querySelectorAll('.option-label').forEach(lbl => {
                        lbl.style.backgroundColor = '#f8f9fa'; 
                    });
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
                selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male'; // Capture gender
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
        scores = Array(mtasQuestions.length).fill(0); // Reset scores
        currentQuestionIndex = 0;
        selectedAge = parseInt(ageSelect.value, 10); // Reset to current dropdown value
        selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male'; // Reset gender to current selection
        showResults = false;
        
        // Go back to intro page to restart
        showPage('intro');
    };

    // --- Event Listeners ---
    if (startButton) startButton.addEventListener('click', () => goToNextStep());
    if (ageNextButton) ageNextButton.addEventListener('click', () => goToNextStep());
    if (genderNextButton) genderNextButton.addEventListener('click', () => goToNextStep());
    if (genderPrevButton) genderPrevButton.addEventListener('click', () => goToPrevStep());
    if (questionPrevButton) questionPrevButton.addEventListener('click', () => goToPrevStep());
    if (takeAgainButton) takeAgainButton.addEventListener('click', resetTest);
    
    if (optionsContainer) optionsContainer.addEventListener('change', handleAnswerSelect);
    if (ageSelect) ageSelect.addEventListener('change', handleAgeChange);

    // Add listener for gender radios
    genderRadios.forEach(radio => {
        radio.addEventListener('change', handleGenderChange);
    });

    // --- Initial Setup ---
    // Set initial values for age and gender from HTML elements if they exist
    if (ageSelect) selectedAge = parseInt(ageSelect.value, 10);
    const initialGenderRadio = document.querySelector('input[name="gender"]:checked');
    if (initialGenderRadio) selectedGender = initialGenderRadio.value || 'male';
    else selectedGender = 'male'; // Fallback if no radio is checked
    
    // Show the intro page initially
    showPage('intro');
});