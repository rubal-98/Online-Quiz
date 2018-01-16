(
    function() {
        const myQuestions = [{
                question: "What does HTML stand for?",
                answers: {
                    1: "Hyper Text Markup Language",
                    2: "Home Tool Markup Language",
                    3: "Hyperlinks and Text Markup Language", 
                },
                correctAnswer: "3"
            },
            {
                question: "Who is making the Web standards?",
                answers: {
                    1: "Google",
                    2: "The World Wide Web Consortium",
                    3: "Mozilla",
                    4: "Microsoft"
                },
                correctAnswer: "2"
            },
            {
                question: "Which character is used to indicate an end tag?",
                answers: {
                    1: "^",
                    2: "/",
                },
                correctAnswer: "2"
            },
            {
                question: "HTML comments start with <!-- and end with -->",
                answers: {
                    1: "Yes",
                    2: "No",
                },
                correctAnswer: "1"
            },
            {
                question: "Inline elements are normally displayed without starting a new line.",
                answers: {
                    1: "Yes",
                    2: "No",
                    3: "Depends"
                },
                correctAnswer: "1"
            }
        ];


        function buildQuiz() {
            // we'll need a place to store the HTML output
            var counter = 0;
            const output = [];

            // for each question...
            myQuestions.forEach((currentQuestion, questionNumber) => {
                // we'll want to store the list of answer choices
                const answers = [];

                // and for each available answer...
                for (number in currentQuestion.answers) {
                    // ...add an HTML radio button
                    answers.push(
                        `<label id="ans">

             <input type="radio" class="r" name="question${questionNumber}" value="${number}" id="${counter}" style="display:none" 
>
             <label for="${counter}">
              <div id="number1">${number}</div>
              ${currentQuestion.answers[number]}
              </label><br>
           </label>`
                    );
                    counter++;
                }

                output.push(
                    `<div class="slide">
					  <div class="question">
					  	<div class="number">${questionNumber+1} </div>
					  	<div class="t" ></div>
						 <div class="plusScore">+1.00</div>
						 <div class="minusScore">-0.25</div>
					  	<hr>
					    <div class="ques">${currentQuestion.question} </div>
					    </div>
					    <div class="answers"> ${answers.join("")} </div>
					    
					  </div>`

                );

            });


            // finally combine our output list into one string of HTML and put it on the page
            quizContainer.innerHTML = output.join("");


        }

       
        function showResults() {
        	
        	const userAns = [];
        	swal({
				  title: 'Are you sure?',
				  text: "You won't be able to revert this!",
				  type: 'warning',
				  showCancelButton: true,
				  confirmButtonColor: '#3085d6',
				  cancelButtonColor: '#d33',
				  confirmButtonText: 'Yes, Submit test!',
				  cancelButtonText: 'No, cancel!',
				  confirmButtonClass: 'btn btn-success',
				  cancelButtonClass: 'btn btn-danger',
				  buttonsStyling: false,
				  reverseButtons: true
				}).then((result) => {
				  if (result.value) {
				    swal(
				      'Submitted!',
				      'Your test has been Submitted.',
				      'success'
				    )

				    const answerContainers = quizContainer.querySelectorAll(".answers");
pause_clock();
            // keep track of user's answers
            let numCorrect = 0;
           var output="The options you submitted are as follow:\n";
            // for each question...
            myQuestions.forEach((currentQuestion, questionNumber) => {
                // find selected answer
                const answerContainer = answerContainers[questionNumber];
                var selector = `input[name=question${questionNumber}]:checked`;

                var userAnswer = (answerContainer.querySelector(selector) || {}).value;
                output+="QNo ";
                output+=questionNumber;
                output+="->";
               
                output+=userAnswer;
                output+="\n";
                
                // if answer is correct
                if (userAnswer === currentQuestion.correctAnswer) {
                    // add to the number of correct answers
                    numCorrect++;

                    // color the answers green
                   // answerContainers[questionNumber].style.color = "lightgreen";
                } else {
                    // if answer is wrong or blank
                    // color the answers red
                   // answerContainers[questionNumber].style.color = "red";
                }

            });
            
           
            
            
			if(numCorrect>0)
            swal({title:'Your number of answers correct',

            	text:numCorrect+' out of '+myQuestions.length
            	
            	

            	});
        else{
        	swal({text:'None of your answer were correct',
        		type:'error'});
        }
        alert(output);
            	resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
				  // result.dismiss can be 'cancel', 'overlay',
				  // 'close', and 'timer'
				  } else if (result.dismiss === 'cancel') {
				    swal(
				      'Cancelled',
				      'Your test is not submitted :)',
				      'error'
				    )
				  }
				})
            // gather answer containers from our quiz
            

            // show number of correct answers out of total
            
        }

        function showSlide(n) {
            slides[currentSlide].classList.remove("active-slide");
            slides[n].classList.add("active-slide");
            currentSlide = n;

            if (currentSlide === 0) {
                previousButton.style.display = "none";
            } else {
                previousButton.style.display = "inline-block";
            }

            if (currentSlide === slides.length - 1) {
                nextButton.style.display = "none";

            } else {
                nextButton.style.display = "inline-block";

            }



        }

        function popup() {
            var r = document.getElementsByClassName('r')
            for (var i = 0, j = r.length; i < j; i++) {
                if (r[i].checked) {
                    swal({
						  title: 'Are you sure?',
						  text: "You won't be able to revert this!",
						  type: 'warning',
						  showCancelButton: true,
						  confirmButtonColor: '#3085d6',
						  cancelButtonColor: '#d33',
						  confirmButtonText: 'Yes, submit it!'
						}).then((result) => {
						  if (result.value) {
						    swal(
						      'Submitted!',
						      'Your file has been submitted.',
						      'success'
						    )
						    showNextSlide();
						  }
						
                        // result.dismiss can be 'cancel', 'overlay',
                        // 'close', and 'timer'
                        
                    }).catch(swal.noop);
                }
                else{
                	swal(
						  'You have not selected any option',
						  'Check again',
						  'question'
					)
                }
            }

        }

        function showNextSlide() {

            var t = document.getElementsByClassName('t');

            t[currentSlide + 1].setAttribute('id', currentSlide + 20);
            //console.log(t[currentSlide+1]);
            run_clock1(currentSlide + 20, deadline1);
            //alert(counter);
            showSlide(currentSlide + 1);
            //counter++;
        }

        function showPreviousSlide() {
            showSlide(currentSlide - 1);
        }
        var seconds, seconds1;

        function pauseAction() {
            swal({
                title: 'You have paused the quiz',
                text: 'It will continue in 5 seconds.',
                timer: 5000
            }).then(function() {
                resume_clock();
            })
        }

        const quizContainer = document.getElementById("quiz");
        const resultsContainer = document.getElementById("results");
        const submitButton = document.getElementById("submit1");
        const submitAnswer = document.getElementById("submit");
        // display quiz right away
        buildQuiz();


        const previousButton = document.getElementById("previous");
        const nextButton = document.getElementById("next");
        const slides = document.querySelectorAll(".slide");
        const pause = document.getElementById("pause");
        let currentSlide = 0;

        showSlide(0);

        //ShowHideDiv();
        // on submit, show results

        submitButton.addEventListener("click", showResults);
        submitAnswer.addEventListener("click", popup);
        previousButton.addEventListener("click", showPreviousSlide);
        nextButton.addEventListener("click", showNextSlide);

        var time_in_minutes = 5;
        var time_in_minutes1 = 1;
        var current_time = Date.parse(new Date());
        var deadline = new Date(current_time + time_in_minutes * 60 * 1000);
        var deadline1 = new Date(current_time + time_in_minutes1 * 60 * 1000);

        function time_remaining(endtime) {
            var t = Date.parse(endtime) - Date.parse(new Date());
            var seconds = Math.floor((t / 1000) % 60);
            var minutes = Math.floor((t / 1000 / 60) % 60);
            var hours = Math.floor((t / (1000 * 60 * 60)) % 24);
            var days = Math.floor(t / (1000 * 60 * 60 * 24));
            return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
            };
        }

        var timeinterval, timeinterval1;

        function run_clock(id, endtime) {
            var clock = document.getElementById(id);

            function update_clock() {
                var t = time_remaining(endtime);
                clock.innerHTML = t.minutes + ':' + t.seconds+"<br>"+"Prelims Free Full Test";
                if (t.total < 0) {
                    clearInterval(timeinterval);
                    swal({
					  title: "Time's Up" ,
					 
					  animation: false,
					  customClass: 'animated tada'
					})
					clock.innerHTML = "Time's Up";
					showResults();
                }
            }
            update_clock(); // run function once at first to avoid delay
            timeinterval = setInterval(update_clock, 1000);

  }
        

        function run_clock1(id, endtime) {

            var clock1 = document.getElementById(id);
           // console.log(id);

            function update_clock1() {
                var t1 = time_remaining(endtime);
                clock1.innerHTML = '0: ' + t1.seconds;
                if (t1.total < 0) {
                    clearInterval(timeinterval1);

                }
            }
            update_clock1(); // run function once at first to avoid delay
            timeinterval1 = setInterval(update_clock1, 1000);
        }
        run_clock('intern_demo', deadline);
        var t = document.getElementsByClassName('t');
        t[0].setAttribute('id', 19);
        //console.log(t[currentSlide+1]);
        run_clock1(19, deadline1);

        var paused = false; // is the clock paused?
        var time_left, time_left1; // time left on the clock when paused

        function pause_clock() {
            if (!paused) {
                paused = true;
                clearInterval(timeinterval);
                clearInterval(timeinterval1); // stop the clock
                time_left = time_remaining(deadline).total;
                time_left1 = time_remaining(deadline1).total; // preserve remaining time
            }
        }

        function resume_clock() {
            if (paused) {
                paused = false;

                // update the deadline to preserve the amount of time remaining
                deadline = new Date(Date.parse(new Date()) + time_left);
                deadline1 = new Date(Date.parse(new Date()) + time_left1);
                // start the clock
                run_clock('intern_demo', deadline);
                run_clock1(currentSlide + 19, deadline1);
                
            }
        }

        pause.addEventListener("click", pauseAction);

        // handle pause and resume button clicks
        document.getElementById('pause').onclick = pause_clock;



    })();
