console.log("Hello, World!");

//DOM Elements

// Grabs the elements from the HTML file and stores them in variables for later use
const start_screen = document.getElementById("start_screen"); 
const quiz_screen = document.getElementById("quiz_screen");

const result_screen = document.getElementById("result_screen"); 
const start_button = document.getElementById("start_btn");

const question_text = document.getElementById("question_text");

const answers_container = document.getElementById("answer_container");
const current_question_span = document.getElementById("current_question");
const total_questions_span = document.getElementById("total_questions");

const score_span = document.getElementById("current_score");
const final_score_span = document.getElementById("final_score");
const max_score_span = document.getElementById("max_score");

const result_message = document.getElementById("result_message");
const restart_button = document.getElementById("restart_btn");
const progress_bar = document.getElementById("progress");


// Quiz Data

// Array of quiz questions, each with a question and multiple answers
const quiz_questions = [
    {
        question: "What is the capital of France?",
        answers: [

            { text: "Berlin", correct: false },
            { text: "Madrid", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ],
    },

    {
        question: "Which planet is known as the Red Planet?",
        answers: [

            { text: "Earth", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Venus", correct: false }
        ],
    },

    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic", correct: false },
            { text: "Indian", correct: false },
            { text: "Arctic", correct: false },
            { text: "Pacific", correct: true }
        ],
    },

    {
        question: "What programming language does this site use?",
        answers: [
            { text: "Python", correct: false },
            { text: "JavaScript", correct: true },
            { text: "Java", correct: false },
            { text: "C++", correct: false }
        ],
    },

    {
        question: "What is the chemical symbol for gold?",
        answers: [
            { text: "Ag", correct: false },
            { text: "Au", correct: true },
            { text: "Fe", correct: false },
            { text: "Cu", correct: false }
        ],
    }

];

// Quiz State Variables

let current_question_index = 0;
let score = 0;
let answers_disabled = false; // Flag to track if answers are disabled

total_questions_span.textContent = quiz_questions.length; // Display total number of questions
max_score_span.textContent = quiz_questions.length; // Display max score

// event listeners for buttons

start_button.addEventListener("click", start_quiz);
restart_button.addEventListener("click", restart_quiz);

function start_quiz() {
    
    console.log("Quiz started");

    // reset variables
    current_question_index = 0;
    score_span.textContent = 0; // Reset score display

    start_screen.classList.remove("active");
    quiz_screen.classList.add("active");

    show_question();

}

function show_question() {

    // reset state
    answers_disabled = false; // Enable answers for the new question
    
    const current_question = quiz_questions[current_question_index];

    current_question_span.textContent = current_question_index + 1;

    const progress_percentage = (current_question_index / quiz_questions.length) * 100;
    progress_bar.style.width = progress_percentage + "%";

    question_text.textContent = current_question.question;

    answers_container.innerHTML = ""; // Clear previous answers

    current_question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.classList.add("answer_btn");
        

        //todo: what is dataset? 
        button.dataset.correct = answer.correct; // Store whether the answer is correct in a data attribute

        button.addEventListener("click",select_answer);

        answers_container.appendChild(button);


    });

}


function select_answer(event) {

    // check
    if (answers_disabled) return; // If answers are disabled, do nothing

    answers_disabled = true;

    const selected_button = event.target; 
    const is_correct = selected_button.dataset.correct === "true"; // Check if the selected answer is correct

    Array.from(answers_container.children).forEach(button => {
       
        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        } else if (button === selected_button) {

            button.classList.add("incorrect");

        }
    });

    if (is_correct) {
        score++;
        score_span.textContent = score; // Update score display
    }

    setTimeout(() => {
        current_question_index++;

        // Check if there are more questions or if the quiz is over
        if (current_question_index < quiz_questions.length) {
            show_question();
        } else {
            show_results();
        }
    }, 1000);
}


function show_results() {
   
    quiz_screen.classList.remove("active");
    result_screen.classList.add("active");      

    final_score_span.textContent = score; // Display final score

    const percentage = (score / quiz_questions.length) * 100;

    if (percentage >= 80) {
        result_message.textContent = "Excellent work!";
    } else if (percentage >= 50) {
        result_message.textContent = "Good job!";
    } else {
        result_message.textContent = "Better luck next time!";
    }
}


function restart_quiz() {

    result_screen.classList.remove("active");
    quiz_screen.classList.add("active");

    current_question_index = 0;
    score = 0;
    score_span.textContent = score;
    progress_bar.style.width = "0%";

    console.log("Quiz restarted");

    show_question();
}
