        var req;
        var res;
        var question = document.getElementById('question');
        var currentQuestion = 0;
        var answersArray = [];
        var h2 = document.getElementsByClassName('questionAnswer');
        var answers = document.getElementById('answers');
        var userInput = document.getElementById('input');
        var sendButton = document.getElementById('sendButton');
        var difficultyButton = document.getElementsByClassName('difficultyButton');
        var h3 = document.getElementsByTagName('h3');
        var correctAnswers = 0;
        var howManyQuestions;
        var easyButton = document.getElementById('easyButton')

        

        // If the difficulty chosen is easy
        easyButton.addEventListener('click', function() {

        onClickVisibility();

        req = new XMLHttpRequest;

        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {   
                    userInput.value = "";        
                    changeInnerHtml();
                }
            }
        };

        req.open("GET", "https://opentdb.com/api.php?amount=7&category=11&difficulty=easy&type=multiple");

        req.responseType = "json";
        req.send();
        console.log(req);

        });

        // If the difficulty chosen is medium
        mediumButton.addEventListener('click', function() {

            onClickVisibility();
    
            req = new XMLHttpRequest;
    
            req.onreadystatechange = function() {
                if(req.readyState == 4) {
                    if(req.status == 200) {   
                        userInput.value = "";        
                        changeInnerHtml();
                    }
                }
            };
    
            req.open("GET", "https://opentdb.com/api.php?amount=7&category=11&difficulty=medium&type=multiple");
    
            req.responseType = "json";
            req.send();
            console.log(req);
    
            });

            // If the difficulty chosen is hard
            hardButton.addEventListener('click', function() {

            onClickVisibility();
        
            req = new XMLHttpRequest;
        
            req.onreadystatechange = function() {
                if(req.readyState == 4) {
                    if(req.status == 200) {   
                        userInput.value = "";        
                        changeInnerHtml();
                    }
                }
            };
        
            req.open("GET", "https://opentdb.com/api.php?amount=7&category=11&difficulty=hard&type=multiple");
        
            req.responseType = "json";
            req.send();
            console.log(req);
        
        });

        // Transforms input and correct answer texts to nice text
        var decodeHTML = function (html) {
            var txt = document.createElement('textarea');
            txt.innerHTML = html;
            return txt.value;
        };

        // Checks if answer is correct and if the question limit is reached
        function checkIfCorrect() {

            var decodedInput = decodeHTML(userInput.value);
            var decodedCorrectAnswer = decodeHTML(res.results[currentQuestion].correct_answer);
            
            if(decodedInput === decodedCorrectAnswer) {
                alert("Correct!!");
                userInput.value = "";
                correctAnswers++
                currentQuestion++
            } else {
                alert("Wrong!");
                userInput.value = "";
                currentQuestion++
            }
            if (currentQuestion < howManyQuestions) {
                removeLastQuestionAnswer();
                changeInnerHtml()
            } else {
                alert("Correct answers: " + correctAnswers +" out of " + howManyQuestions)
                removeLastQuestionAnswer();
                location.reload(); 
            }
            console.log("Current: " + currentQuestion)
        }

        // Changes the inner HTML for the questions
        function changeInnerHtml() {
            res = req.response;

            howManyQuestions = res.results.length;

            question.innerHTML = res.results[currentQuestion].question;

            answersArray.push(res.results[currentQuestion].correct_answer);
                    
            for(let i = 0; i < 3; i++) {
                answersArray.push(res.results[currentQuestion].incorrect_answers[i]);
            }
            console.log("before shuffle: " + answersArray);

            answersArray.shuffle();
            console.log("after shuffle: " + answersArray);

            for(i = 0; i <= 3; i++) {
                answers.innerHTML += answersArray[i] + "<br>";
            };
        };

        // removes the already answered question and answers
        function removeLastQuestionAnswer() {
            question.innerHTML = null;
            answersArray = [];
            answers.innerHTML = null;
        };

        // Makes the question and answers visible and the difficulty choises invisible
        function onClickVisibility() {

            var h1 = document.getElementsByTagName('h1');

            for(i = 0; i < h2.length; i++) {
                Object.assign(h2[i].style,{margin:"0 0 15px",visibility:"visible"});
            }

            for(i = 0; i < difficultyButton.length; i++) {
                Object.assign(difficultyButton[i].style,{padding:"0",margin:"0",visibility:"hidden"});
            }

            for(i = 0; i < h3.length; i++) {
                Object.assign(h3[i].style,{padding:"0",margin:"0",visibility:"hidden"});
            }

            Object.assign(h1[0].style,{margin:"0"});
            sendButton.style = "visibility: visible";
            input.style = "visibility: visible"

        };

        // A shuffle function I use on the questions
        Array.prototype.shuffle = function() {
           var input = this;
     
           for (var i = input.length-1; i >=0; i--) {
     
               var randomIndex = Math.floor(Math.random()*(i+1)); 
               var itemAtIndex = input[randomIndex]; 
         
               input[randomIndex] = input[i]; 
               input[i] = itemAtIndex;
           }
           return input;
        };

    