const MTAS_DATA = {
    bayesianNorms: [
        { "z": "-3.5", "increment": 0.1, "cumulative": 0.0 }, { "z": "-3", "increment": 0.5, "cumulative": 0.1 }, { "z": "-2.5", "increment": 1.7, "cumulative": 0.6 },
        { "z": "-2", "increment": 4.4, "cumulative": 2.3 }, { "z": "-1.5", "increment": 9.2, "cumulative": 6.7 }, { "z": "-1", "increment": 15.0, "cumulative": 15.9 },
        { "z": "-0.5", "increment": 19.1, "cumulative": 30.9 }, { "z": "0 (Mean)", "increment": null, "cumulative": 50.0 }, { "z": "+0.5", "increment": 19.1, "cumulative": 69.1 },
        { "z": "+1", "increment": 15.0, "cumulative": 84.1 }, { "z": "+1.5", "increment": 9.2, "cumulative": 93.3 }, { "z": "+2", "increment": 4.4, "cumulative": 97.7 },
        { "z": "+2.5", "increment": 1.7, "cumulative": 99.4 }, { "z": "+3", "increment": 0.5, "cumulative": 99.9 }, { "z": "+3.5", "increment": 0.1, "cumulative": 100.0 }
    ],
    percentile_male: [[1,1,1,1,1,1,1,2],[2,2,1,2,2,1,1,2],[2,2,1,2,2,1,2,2],[2,2,2,2,2,2,2,3],[2,2,2,2,2,2,2,4],[2,3,4,3,3,2,2,4],[3,4,4,3,3,3,3,4],[3,6,5,4,3,3,3,5],[5,6,5,5,3,3,4,5],[7,7,5,5,4,4,4,5],[8,7,7,6,4,5,5,6],[8,8,7,6,5,6,5,7],[8,10,7,8,5,6,6,7],[8,10,7,8,5,7,7,7],[11,11,9,9,7,8,7,8],[12,12,10,11,7,9,9,8],[15,14,11,12,9,10,9,9],[15,16,11,12,9,13,12,12],[15,18,13,13,10,14,13,15],[20,18,14,16,10,16,15,16],[23,20,16,17,12,18,16,17],[24,24,20,19,14,20,20,18],[27,26,24,20,16,23,21,20],[30,29,25,23,19,26,22,21],[33,32,28,25,21,29,24,24],[35,35,32,27,24,32,26,25],[36,37,35,32,26,35,28,28],[38,40,41,35,30,37,30,32],[43,44,43,39,34,41,33,33],[45,48,45,41,39,43,37,35],[46,51,46,44,42,47,40,37],[51,55,49,46,46,49,44,40],[52,57,54,49,54,52,49,44],[55,61,59,52,55,56,53,47],[63,64,63,56,60,61,55,52],[64,67,67,58,65,64,58,54],[65,69,71,63,68,66,62,58],[69,73,75,64,71,69,65,62],[75,75,79,69,74,72,69,64],[77,77,82,73,77,75,72,66],[79,79,84,75,79,78,75,67],[85,81,87,78,79,81,77,70],[87,84,88,79,82,83,81,72],[87,85,90,83,86,85,83,76],[88,88,90,86,87,88,85,79],[89,88,91,87,89,89,86,81],[92,89,93,90,90,91,88,85],[95,90,95,93,92,92,90,86],[96,91,95,94,94,93,92,87],[96,92,96,94,94,94,93,88],[96,94,97,95,94,95,94,90],[96,96,97,95,94,96,94,92],[97,97,98,96,95,96,95,92],[97,97,98,96,96,97,96,93],[98,99,99,97,96,97,96,94],[98,99,99,98,96,98,97,94],[99,99,99,99,98,98,98,94],[99,100,100,99,98,98,98,96],[100,100,100,100,99,99,99,97],[100,100,100,100,100,99,99,97],[100,100,100,100,100,100,99,97],[100,100,100,100,100,100,100,98],[100,100,100,100,100,100,100,100],[100,100,100,100,100,100,100,100]],
    percentile_female: [[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1],[1,1,1,2,1,1,1,1],[2,1,1,2,1,1,1,1],[2,3,2,2,1,1,1,1],[2,3,2,2,1,1,1,1],[3,3,2,2,1,1,1,1],[3,3,2,2,1,1,1,1],[4,3,2,2,1,1,1,1],[4,3,2,3,1,1,1,1],[4,4,3,3,2,1,2,1],[4,4,4,3,2,1,2,1],[4,4,4,3,2,1,2,1],[5,4,4,4,2,1,2,1],[5,4,4,4,3,2,2,1],[5,4,5,5,3,3,3,3],[7,5,6,6,3,3,3,4],[8,5,6,6,4,4,3,4],[9,9,7,8,5,4,4,4],[12,10,8,8,6,5,4,5],[15,11,9,10,8,5,5,5],[16,12,12,11,8,7,5,7],[17,14,14,13,9,8,5,8],[22,16,16,14,11,8,6,9],[25,17,18,16,13,10,7,10],[27,21,21,18,15,11,8,12],[32,23,24,20,18,12,9,13],[34,26,27,23,21,14,12,15],[37,30,28,27,24,18,13,18],[42,35,32,32,28,21,16,21],[43,39,36,36,31,23,17,23],[46,40,39,39,32,24,19,24],[47,43,42,41,33,26,21,25],[51,47,45,43,38,29,23,28],[53,50,49,46,40,33,27,31],[55,54,53,49,44,36,31,33],[61,58,57,53,48,42,34,38],[63,61,61,56,52,45,39,41],[65,65,64,60,56,48,43,44],[69,68,67,64,60,53,47,47],[72,72,70,68,61,56,51,51],[75,76,73,71,63,60,54,54],[77,80,77,74,65,64,57,58],[79,82,81,77,69,67,62,61],[82,85,84,81,74,71,67,64],[86,87,86,83,79,74,71,68],[88,89,88,86,82,78,74,71],[90,91,91,89,86,82,78,75],[92,93,93,91,88,85,82,78],[94,94,94,92,90,87,84,81],[95,95,96,93,92,90,86,84],[96,96,96,94,93,92,89,86],[97,97,98,96,94,93,91,89],[98,98,99,97,96,95,93,92],[98,99,99,98,97,96,94,93],[99,99,99,98,98,97,96,94],[99,100,100,99,98,98,97,96],[100,100,100,99,99,98,98,97],[100,100,100,99,99,99,98,98],[100,100,100,100,99,99,99,99],[100,100,100,100,100,99,99,99],[100,100,100,100,100,100,100,100],[100,100,100,100,100,100,100,100]],

    // Z-Scores - Male
    zscore_male: [[-2.5,-2.43,-2.71,-2.62,-2.88,-2.65,-2.56,-2.51],[-2.41,-2.35,-2.62,-2.53,-2.79,-2.56,-2.48,-2.43],[-2.33,-2.27,-2.53,-2.44,-2.71,-2.48,-2.39,-2.36],[-2.25,-2.19,-2.44,-2.35,-2.62,-2.39,-2.31,-2.29],[-2.17,-2.11,-2.35,-2.26,-2.53,-2.31,-2.23,-2.21],[-2.09,-2.03,-2.26,-2.17,-2.44,-2.23,-2.14,-2.07],[-2.01,-1.95,-2.17,-2.09,-2.35,-2.14,-2.06,-1.99],[-1.93,-1.86,-2.08,-2.0,-2.26,-2.06,-1.98,-1.92],[-1.85,-1.78,-1.99,-1.91,-2.18,-1.97,-1.9,-1.85],[-1.77,-1.7,-1.9,-1.82,-2.09,-1.89,-1.81,-1.77],[-1.69,-1.62,-1.81,-1.73,-2.0,-1.8,-1.73,-1.7],[-1.61,-1.54,-1.72,-1.64,-1.92,-1.72,-1.64,-1.63],[-1.53,-1.46,-1.63,-1.56,-1.83,-1.63,-1.56,-1.55],[-1.45,-1.38,-1.54,-1.47,-1.74,-1.55,-1.48,-1.48],[-1.37,-1.3,-1.45,-1.38,-1.65,-1.46,-1.39,-1.41],[-1.29,-1.22,-1.36,-1.29,-1.56,-1.38,-1.31,-1.33],[-1.21,-1.14,-1.27,-1.2,-1.48,-1.29,-1.23,-1.26],[-1.13,-1.06,-1.18,-1.11,-1.39,-1.21,-1.14,-1.19],[-1.05,-0.98,-1.09,-1.03,-1.3,-1.12,-1.06,-1.19],[-0.97,-0.9,-1.0,-0.94,-1.21,-1.04,-0.98,-1.11],[-0.89,-0.81,-0.91,-0.85,-1.13,-0.96,-0.89,-1.04],[-0.81,-0.73,-0.83,-0.76,-1.04,-0.87,-0.81,-0.97],[-0.73,-0.65,-0.74,-0.67,-0.95,-0.79,-0.73,-0.89],[-0.64,-0.57,-0.65,-0.58,-0.86,-0.7,-0.64,-0.82],[-0.55,-0.51,-0.58,-0.66,-0.76,-0.63,-0.72,-0.67],[-0.48,-0.41,-0.47,-0.4,-0.69,-0.53,-0.48,-0.67],[-0.4,-0.33,-0.38,-0.31,-0.6,-0.45,-0.4,-0.52],[-0.32,-0.25,-0.29,-0.23,-0.51,-0.36,-0.31,-0.45],[-0.24,-0.17,-0.2,-0.14,-0.42,-0.28,-0.23,-0.38],[-0.16,-0.09,-0.11,-0.05,-0.34,-0.19,-0.15,-0.3],[-0.08,-0.01,-0.02,0.04,-0.25,-0.11,-0.06,-0.23],[0,-0.07,0.07,0.13,-0.16,-0.02,0.02,-0.15],[0.08,0.15,0.16,0.22,0.02,0.06,0.1,-0.08],[0.16,0.23,0.25,0.31,0.11,0.15,0.19,-0.01],[0.24,0.31,0.34,0.4,0.2,0.23,0.27,0.07],[0.32,0.39,0.43,0.49,0.28,0.32,0.35,0.14],[0.4,0.47,0.52,0.58,0.37,0.4,0.43,0.21],[0.48,0.55,0.61,0.67,0.46,0.49,0.52,0.29],[0.56,0.63,0.7,0.76,0.55,0.57,0.6,0.36],[0.64,0.71,0.79,0.85,0.64,0.65,0.68,0.44],[0.72,0.79,0.88,0.94,0.73,0.74,0.77,0.51],[0.8,0.87,0.97,1.03,0.82,0.82,0.85,0.58],[0.88,0.95,1.06,1.12,0.91,0.91,0.93,0.66],[0.96,1.03,1.15,1.21,1.0,1.0,1.01,0.73],[1.07,1.09,1.19,0.98,1.05,1.05,0.92,0.81],[1.13,1.2,1.33,1.39,1.17,1.17,1.18,0.88],[1.21,1.28,1.42,1.48,1.25,1.25,1.26,0.96],[1.29,1.36,1.51,1.57,1.34,1.34,1.35,1.03],[1.37,1.44,1.6,1.66,1.42,1.42,1.43,1.1],[1.45,1.52,1.69,1.75,1.51,1.51,1.51,1.18],[1.53,1.6,1.78,1.84,1.59,1.59,1.59,1.25],[1.61,1.68,1.87,1.93,1.68,1.68,1.68,1.33],[1.69,1.76,1.96,2.02,1.76,1.76,1.76,1.4],[1.77,1.84,2.05,2.11,1.85,1.85,1.84,1.48],[1.85,1.92,2.14,2.2,1.93,1.93,1.93,1.55],[1.93,2.0,2.23,2.29,2.02,2.02,2.01,1.62],[2.01,2.08,2.32,2.38,2.1,2.1,2.09,1.7],[2.09,2.16,2.41,2.47,2.19,2.19,2.17,1.77],[2.17,2.24,2.5,2.56,2.27,2.27,2.26,1.85],[2.25,2.32,2.59,2.65,2.36,2.36,2.34,1.92],[2.33,2.41,2.68,2.74,2.44,2.44,2.42,1.99],[2.41,2.49,2.77,2.83,2.53,2.53,2.51,2.07],[2.49,2.57,2.86,2.92,2.61,2.61,2.59,2.14],[2.57,2.65,2.95,3.01,2.7,2.7,2.67,2.22]],

    // Z-Scores - Female
    zscore_female: [[-3.1,-3.52,-3.38,-2.94,-2.98,-3.07,-2.99,-2.96],[-3.01,-3.42,-3.29,-2.85,-2.9,-2.99,-2.82,-2.81],[-2.92,-3.32,-3.19,-2.77,-2.81,-2.9,-2.74,-2.73],[-2.84,-3.23,-3.1,-2.69,-2.73,-2.82,-2.65,-2.65],[-2.75,-3.13,-3.01,-2.6,-2.65,-2.74,-2.57,-2.58],[-2.66,-3.03,-2.92,-2.52,-2.57,-2.65,-2.49,-2.5],[-2.57,-2.93,-2.82,-2.44,-2.48,-2.57,-2.4,-2.43],[-2.48,-2.84,-2.73,-2.35,-2.4,-2.49,-2.32,-2.35],[-2.4,-2.74,-2.64,-2.27,-2.31,-2.4,-2.23,-2.28],[-2.31,-2.65,-2.55,-2.19,-2.23,-2.32,-2.15,-2.2],[-2.22,-2.55,-2.45,-2.1,-2.15,-2.23,-2.07,-2.13],[-2.13,-2.45,-2.36,-2.02,-2.06,-2.15,-1.98,-2.05],[-2.04,-2.36,-2.27,-1.93,-1.98,-2.07,-1.9,-1.98],[-1.96,-2.26,-2.17,-1.85,-1.9,-1.98,-1.82,-1.9],[-1.87,-2.16,-2.08,-1.77,-1.81,-1.9,-1.73,-1.82],[-1.78,-2.07,-1.99,-1.68,-1.73,-1.82,-1.65,-1.75],[-1.69,-1.97,-1.9,-1.6,-1.73,-1.82,-1.56,-1.68],[-1.61,-1.88,-1.8,-1.52,-1.82,-1.73,-1.48,-1.6],[-1.52,-1.78,-1.71,-1.43,-1.74,-1.65,-1.4,-1.53],[-1.43,-1.68,-1.62,-1.35,-1.65,-1.56,-1.31,-1.45],[-1.34,-1.59,-1.52,-1.27,-1.56,-1.48,-1.23,-1.38],[-1.25,-1.49,-1.43,-1.18,-1.48,-1.39,-1.15,-1.3],[-1.17,-1.4,-1.34,-1.1,-1.39,-1.31,-1.06,-1.23],[-1.08,-1.3,-1.25,-1.02,-1.31,-1.23,-0.98,-1.15],[-0.99,-1.21,-1.15,-0.93,-1.23,-1.15,-0.89,-1.08],[-0.9,-1.11,-1.06,-0.85,-1.15,-1.06,-0.81,-1],[-0.81,-1.01,-0.97,-0.77,-1.06,-0.98,-0.73,-0.93],[-0.73,-0.92,-0.88,-0.68,-0.98,-0.89,-0.65,-0.85],[-0.64,-0.82,-0.78,-0.6,-0.9,-0.81,-0.56,-0.78],[-0.55,-0.73,-0.69,-0.52,-0.81,-0.73,-0.48,-0.7],[-0.46,-0.63,-0.6,-0.43,-0.73,-0.64,-0.4,-0.63],[-0.37,-0.53,-0.5,-0.35,-0.64,-0.56,-0.31,-0.55],[-0.28,-0.44,-0.41,-0.27,-0.56,-0.48,-0.23,-0.48],[-0.19,-0.34,-0.32,-0.19,-0.48,-0.39,-0.15,-0.4],[-0.1,-0.25,-0.23,-0.1,-0.39,-0.31,-0.06,-0.33],[0,-0.15,-0.13,-0.02,-0.31,-0.23,0.02,-0.25],[0.08,-0.06,-0.04,0.07,-0.23,-0.14,0.1,-0.18],[0.17,0.04,0.05,0.15,-0.15,-0.06,0.19,-0.1],[0.26,0.14,0.14,0.23,-0.06,0.02,0.27,-0.03],[0.35,0.23,0.24,0.32,0.02,0.11,0.35,0.05],[0.44,0.33,0.33,0.4,0.11,0.19,0.43,0.12],[0.52,0.42,0.42,0.49,0.19,0.27,0.52,0.2],[0.61,0.52,0.52,0.57,0.27,0.36,0.6,0.27],[0.7,0.62,0.61,0.66,0.36,0.44,0.68,0.35],[0.79,0.71,0.7,0.74,0.44,0.53,0.77,0.42],[0.88,0.81,0.8,0.82,0.53,0.61,0.85,0.5],[0.97,0.9,0.89,0.91,0.61,0.69,0.93,0.57],[1.06,1.0,0.98,0.99,0.69,0.78,1.02,0.65],[1.14,1.1,1.08,1.08,0.78,0.86,1.1,0.72],[1.23,1.19,1.17,1.16,0.86,0.94,1.18,0.8],[1.32,1.29,1.26,1.25,0.94,1.03,1.27,0.87],[1.41,1.38,1.35,1.33,1.02,1.11,1.35,0.95],[1.5,1.48,1.45,1.41,1.11,1.19,1.43,1.02],[1.59,1.57,1.54,1.5,1.19,1.28,1.52,1.1],[1.68,1.67,1.63,1.58,1.28,1.36,1.6,1.17],[1.77,1.77,1.73,1.67,1.36,1.45,1.68,1.25],[1.86,1.86,1.82,1.75,1.45,1.53,1.77,1.32],[1.94,1.96,1.91,1.83,1.53,1.61,1.85,1.4],[2.03,2.05,2.01,1.92,1.61,1.7,1.93,1.47],[2.12,2.15,2.1,2,1.7,1.78,2.02,1.55],[2.21,2.24,2.19,2.09,1.78,1.87,2.1,1.62],[2.3,2.34,2.29,2.17,1.87,1.95,2.18,1.7],[2.39,2.43,2.38,2.26,1.95,2.03,2.27,1.77],[2.48,2.53,2.47,2.34,2.03,2.12,2.35,1.85],[2.57,2.62,2.57,2.42,2.12,2.2,2.43,1.92]],

    // Helper functions
    getRowIndex: (score) => {
        const minScore = 16; // 16 items * min score 1
        const maxScore = 80; // 16 items * max score 5
        const rowIndex = score - minScore;
        if (score < minScore || score > maxScore) {
            console.error(`Total score ${score} out of expected range [${minScore}-${maxScore}].`);
            return -1; // Indicate error or invalid score
        }
        if (rowIndex < 0 || rowIndex >= MTAS_DATA.percentile_male.length) { 
            console.error(`Calculated row index ${rowIndex} is out of bounds for table of size ${MTAS_DATA.percentile_male.length}.`);
            return -1;
        }
        return rowIndex;
    },
    getAgeIndex: (age) => {
        const index = age - 11;
        if (index < 0 || index > 7) { 
            console.error("Age out of bounds:", age);
            return -1; // Indicate error
        }
        return index;
    }
};

/**
 * SCORING LOGIC
 */
function scoreMTAS(age, gender, responses) {
    if (!Array.isArray(responses) || responses.length !== 16) {
        console.error("Invalid responses array. Expected 16 scores.");
        return { error: "Invalid responses received." };
    }

    // 1. Calculate Raw Scores
    const total = responses.reduce((a, b) => a + b, 0);
    const subscales = {
        worry: responses[0] + responses[4] + responses[8] + responses[12],
        interference: responses[1] + responses[5] + responses[9] + responses[13],
        tension: responses[2] + responses[6] + responses[10] + responses[14],
        physiological: responses[3] + responses[7] + responses[11] + responses[15]
    };

    // 2. Perform Lookup
    const rIdx = MTAS_DATA.getRowIndex(total);
    const aIdx = MTAS_DATA.getAgeIndex(age);
    const isMale = gender.toLowerCase() === 'male';

    if (rIdx === -1 || aIdx === -1) { 
        return { error: "Could not determine normative metrics due to invalid input." };
    }
    
    const percentileTable = isMale ? MTAS_DATA.percentile_male : MTAS_DATA.percentile_female;
    const zScoreTable = isMale ? MTAS_DATA.zscore_male : MTAS_DATA.zscore_female;

    if (!percentileTable[rIdx] || !zScoreTable[rIdx] || !percentileTable[rIdx][aIdx] || !zScoreTable[rIdx][aIdx]) {
        console.error(`Data lookup failed for row index ${rIdx}, age index ${aIdx}.`);
        return { error: "Could not determine normative metrics due to missing data." };
    }

    const percentile = percentileTable[rIdx][aIdx];
    const zScore = zScoreTable[rIdx][aIdx];

    // 3. Bayesian Interpretation (Status)
    let status = "Average";
    if (zScore > 2.0) status = "Extremely High (Priority intervention)";
    else if (zScore > 1.5) status = "Very High";
    else if (zScore > 1.0) status = "High (Threshold for concern)";
    else if (zScore < -1.0) status = "Low Test Anxiety";

    return { total, subscales, percentile, zScore, status };
}

// Global declarations for answer options and subscales
const answerOptions = [
    { label: "Never", score: 1 },
    { label: "Rarely", score: 2 },
    { label: "Sometimes", score: 3 },
    { label: "Often", score: 4 },
    { label: "Always", score: 5 }
];

const subscaleItems = {
    worry: [0, 4, 8, 12], // Indices of questions corresponding to 'worry' subscale
    cognitiveInterference: [1, 5, 9, 13], // Indices of questions corresponding to 'cognitive interference' subscale
    tension: [2, 6, 10, 14], // Indices of questions corresponding to 'tension' subscale
    physiologicalIndicators: [3, 7, 11, 15] // Indices of questions corresponding to 'physiological indicators' subscale
};

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
    const takeAgainButton = document.getElementById('take-again-button');
    const startButton = document.getElementById('start-button');
    const ageNextButton = document.getElementById('age-next-button');
    const genderNextButton = document.getElementById('gender-next-button');
    const genderPrevButton = document.getElementById('gender-prev-button');
    const questionPrevButton = document.getElementById('question-prev-button'); // Ensure this refers to the specific question prev button
    const progressBar = document.querySelector('.progress-bar');
    const progress = document.getElementById('progress');
    const subscaleScoresContainer = document.getElementById('subscale-scores');

    // --- State Variables ---
    let currentStep = 'intro'; // 'intro', 'age', 'gender', 'questions', 'results'
    let currentQuestionIndex = 0;
    let scores = []; // Stores score for each question (1-5)
    let selectedAge = parseInt(ageSelect.value, 10) || 11; // Default age, ensure it's parsed as number
    let selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male'; // Default gender
    
    const AUTO_ADVANCE_DELAY = 800; // milliseconds for auto-advance and flash effect

    // --- Page Management ---
    const showPage = (pageId) => {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        const fullPageId = pageId.endsWith('-page') ? pageId : `${pageId}-page`; // Add this line
        const pageToShow = document.getElementById(fullPageId); // Use fullPageId here
        if (pageToShow) {
            pageToShow.classList.add('active');
            currentStep = pageId.replace('-page', ''); 
            updateUIForStep(currentStep);
        } else {
            console.error("Page element not found:", fullPageId); // Log fullPageId
            if (fullPageId === 'intro-page') { 
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
        
        // Specific element updates per step
        if (step === 'intro') {
            // Title and instructions are already set in HTML
        } else if (step === 'age') {
            if (ageSelect) ageSelect.value = selectedAge; 
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
            if (!questionHeader || !questionText || !optionsContainer) return; 
            questionHeader.textContent = `Question ${currentQuestionIndex + 1}/${mtasQuestions.length}`;
            questionText.textContent = mtasQuestions[currentQuestionIndex].text;
            optionsContainer.innerHTML = ''; 

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
            optionsContainer.querySelectorAll('.option-label').forEach(lbl => {
                lbl.style.backgroundColor = '#f8f9fa'; 
            });
            event.target.closest('.option-label').style.backgroundColor = '#e8f5e9'; 

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
        if (questionPrevButton) questionPrevButton.style.display = currentQuestionIndex > 0 ? 'block' : 'none';
    };

    const calculateSubscaleScores = () => { 
        const subscaleScores = {
            worry: 0,
            cognitiveInterference: 0,
            tension: 0,
            physiologicalIndicators: 0,
        };

        subscaleItems.worry.forEach(index => {
            subscaleScores.worry += scores[index] || 0;
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
        const scoringResult = scoreMTAS(selectedAge, selectedGender, scores);
        
        if (scoringResult.error) {
            subscaleScoresContainer.innerHTML = `<p style="color: red;">Error calculating scores: ${scoringResult.error}</p>`;
            console.error("Scoring Error:", scoringResult.error);
            return;
        }

        const { total, subscales, percentile, zScore, status } = scoringResult;

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
                questionText.style.transition = 'none';
                questionText.style.opacity = '0.7';
                setTimeout(() => {
                    questionText.style.transition = 'opacity 0.3s ease';
                    questionText.style.opacity = '1';
                }, 50);
            } else {
                showResults = true; // This variable is not defined, will be removed later.
                renderResults();
            }
        } else {
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
                    optionsContainer.querySelectorAll('.option-label').forEach(lbl => {
                        lbl.style.backgroundColor = '#f8f9fa'; 
                    });
                } else { 
                    showPage('gender-selection');
                }
                break;
            case 'gender':
                showPage('age-selection');
                break;
            case 'age':
                showPage('intro');
                break;
        }
    };

    const goToNextStep = () => {
        switch(currentStep) {
            case 'intro':
                showPage('age-selection');
                break;
            case 'age-selection':
                selectedAge = parseInt(ageSelect.value, 10); 
                showPage('gender-selection');
                break;
            case 'gender':
                selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male'; 
                currentQuestionIndex = 0;
                scores = Array(mtasQuestions.length).fill(0); 
                renderQuestion();
                updateProgressBar();
                updateNavigationButtons();
                showPage('question');
                break;
        }
    };

    const resetTest = () => {
        scores = Array(mtasQuestions.length).fill(0); 
        currentQuestionIndex = 0;
        selectedAge = parseInt(ageSelect.value, 10); 
        selectedGender = document.querySelector('input[name="gender"]:checked')?.value || 'male'; 
        // showResults = false; // This variable is not defined, will be removed later.
        
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

    genderRadios.forEach(radio => {
        radio.addEventListener('change', handleGenderChange);
    });

    // --- Initial Setup ---
    if (ageSelect) selectedAge = parseInt(ageSelect.value, 10);
    const initialGenderRadio = document.querySelector('input[name="gender"]:checked');
    if (initialGenderRadio) selectedGender = initialGenderRadio.value || 'male';
    else selectedGender = 'male'; 
    
    showPage('intro');
});