let quizFormContainer = document.querySelector('#quiz-forms-container');
let scrollWidth = quizFormContainer.clientWidth;

let quizData = [
    {
        question: "Who is the Father of Computer",
        options: ["Charles Barbage", "Ada Lovelance", "Charles Darwin", "Frank Edward"],
        correct: "Charles Barbage"
    },
    {
        question: "What is the capital of France?",
        options: ["Madrid", "Rome", "Paris", "Berlin"],
        correct: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correct: "Mars"
    },
    {
        question: "What is the largest mammal?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Hippopotamus"],
        correct: "Blue Whale"
    }
]

let selectedOptions = []

let constructQuizForm = ()=>{

    quizData.forEach((quiz, index) => {
        quizFormContainer.innerHTML += `
        <form action="" data-question-index="${index}">
            <p id="question">${quiz.question}</p>

            <div class="options-ontainer">
                ${constructHtmlOption(quiz.options)}
            </div>
        
            <br>

            <div class="btn-container">
                ${ ( index > 0? '<button class="prevBtn">Previous</button>': '') }

                <button type="submit" >${(index == quizData.length - 1? 'Submit' : 'Next')}</button>
            </div>
        </form>
        `
    });
    
}

let constructHtmlOption = (options)=>{
    let htmlOptions = new Array();
    options.forEach((option, index)=>{
        htmlOptions.push(`
        <label for="option-${index}-${option}" class="radio-container">
            <input type="radio" name="options" value="${option}" id="option-${index}-${option}" required>
            ${option}
        </label>
        `)
    })
    return htmlOptions.join("");
}

constructQuizForm();

document.querySelectorAll('form').forEach(form=>{
    form.addEventListener('submit', (event)=>{
        event.preventDefault()

        let checkedOption = getCheckedRadioBox(form.querySelectorAll("input[type='radio']"))
        selectedOptions[form.dataset.questionIndex] = checkedOption.value;

        quizFormContainer.scrollTo({
            left: quizFormContainer.scrollLeft + scrollWidth,
            behavior: "smooth"
        })

        if (form.dataset.questionIndex == quizData.length - 1) {
            calculateAnswer();
        }

    })
})

document.querySelectorAll('.prevBtn').forEach(btn=>{
    btn.addEventListener('click', (event)=>{
        event.preventDefault();
        quizFormContainer.scrollTo({
            left: quizFormContainer.scrollLeft - scrollWidth,
            behavior: "smooth"
        })
    })
})


let getCheckedRadioBox = (radioButtons)=>{

    let selectedOption;
    // Loop through the radio buttons to find the selected one
    radioButtons.forEach((radioButton)=>{
        if (radioButton.checked){
            selectedOption = radioButton;
        }
    })

    return selectedOption;
}

let calculateAnswer = ()=>{
    let points = 0;

    quizData.forEach((question, index)=>{
        if (selectedOptions[index] == question.correct) {
            points ++ 
        }
    })


    quizFormContainer.innerHTML = `<p id="result"> You Scored ${points} out of ${quizData.length} </p>`;
}