let flagImgDiv = document.querySelector('.flag-img');
let flagImg = document.querySelector('.flag-img img');
let flagOptions = document.querySelector('.button-container');
let flagArray = document.querySelectorAll('.button-container button');
let notificationEl = document.querySelector('.button-container p.notification-message');
let correctSound = document.getElementById('correct');
let incorrectSound = document.getElementById('incorrect');
let resultDiv = document.querySelector('.result');
let score = document.querySelector('.result .score span');
let levelHeader = document.getElementById('levelHeader');
let questions

// let continent = document.querySelector('.body')

let index = 0;
let numOfCorrect = 0;
let questionNum = 5;
let clickCounter = 0;
function newGame(country) {
    let request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            questions = JSON.parse(this.responseText);
            //ToDo: add fuction to select num of questions
            // Get a random index.
            questions = questions.sort(() => Math.random() - Math.random()).slice(0, questionNum);
            //Add Questions Data
            addData(questions[index], questionNum, country);

            flagArray.forEach(button => {
                button.addEventListener('click', () => {
                    if (clickCounter == 0) {
                        let answer = questions[index].answer;
                        button.classList.add('selected');
                        //Increase Index 
                        index++;
                        //Check The Answer
                        setTimeout(() => {
                            check(answer);
                        }, 500);

                        setTimeout(() => {
                            let next = document.getElementById('next')
                            if (index < questionNum) {
                                next.classList.remove('hidden')
                            }
                        }, 1000);
                        clickCounter++

                    } else {

                    }

                    setTimeout(() => {
                        getResult(questionNum);
                    }, 5000);

                });
            });
        }
    }
    request.open("GET", `/src/data/${country}.json`, true);
    request.send();
}

function addData(obj, count, country) {
    if (index < count) {
        flagImg.src = `/src/images/countries/${country}/${obj.img}`;
        flagArray.forEach((button, i) => {
            button.id = `answer_${i + 1}`;
            button.dataset.options = obj[`options`][i];
            button.innerHTML = obj[`options`][i];
        });
    }
}

function showNotification(notification) {
    notificationEl.classList.add('notify');
    notificationEl.innerHTML = notification
    setTimeout(function () {
        notificationEl.classList.remove('notify');
    }, 1000);
}

function check(answer) {
    for (let i = 0; i < flagArray.length; i++) {
        if (flagArray[i].classList.contains('selected')) {
            let selectedOption = flagArray[i].dataset.options;
            if (selectedOption === answer) {
                flagArray[i].classList.add('right');
                showNotification("&#10004")
                correctSound.play();
                numOfCorrect++;
            } else {
                flagArray[i].classList.add('wrong');
                for(let i = 0; i < flagArray.length; i++) {
                    if (flagArray[i].dataset.options === answer){
                        flagArray[i].classList.add('showright');
                    }
                }
                showNotification("&#10006");
                incorrectSound.play()
            }
        }
    }
}

function getResult(count) {
    if (index === count) {
        flagOptions.style.display = 'none'
        flagImgDiv.style.display = 'none'
        resultDiv.style.display = 'block'
        score.innerHTML = numOfCorrect;
        levelHeader.style.display = 'none';
    }
}

function nextLevel(country) {

    clickCounter -= 1
    flagImg.src = '';
    flagArray.forEach(button => {
        button.classList.remove('selected');
        button.classList.remove('right');
        button.classList.remove('wrong');
        button.classList.remove("showright");
    })
    addData(questions[index], questionNum, country);
    let next = document.getElementById('next')
    next.classList.add('hidden')

}