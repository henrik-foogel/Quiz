        var req;
        var res;
        var question = document.getElementById('question');
        var currentQuestion = 0;
        var answersArray = [];
        var answers = document.getElementById('answers');
        var userInput = document.getElementById('input');
        var correctAnswers = 0;

        document.addEventListener('DOMContentLoaded', function() {

        req = new XMLHttpRequest;

        req.onreadystatechange = function() {
            if(req.readyState == 4) {
                if(req.status == 200) {           
                    changeInnerHtml();
                }
            }
        };

        req.open("GET", "https://opentdb.com/api.php?amount=4&category=11&difficulty=easy&type=multiple");

        req.responseType = "json";
        req.send();
        console.log(req);

        });

        function checkIfCorrect() {
            if(userInput.value == res.results[currentQuestion].correct_answer) {
                alert("Correct!!");
                userInput.value = "";
                correctAnswers++
                currentQuestion++
            } else {
                alert("Wrong!");
                userInput.value = "";
                currentQuestion++
            }
            if (currentQuestion <= 3) {
                removeLastQuestionAnswer();
                changeInnerHtml()
            } else {
                alert("Correct answers: " + correctAnswers +" out of 4")
                removeLastQuestionAnswer();
            }
        }

        function changeInnerHtml() {
                    res = req.response;

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

        function removeLastQuestionAnswer() {
            question.innerHTML = null;
            answersArray = [];
            answers.innerHTML = null;
        }

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

    