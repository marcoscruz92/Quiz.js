	var quiz = [{
		question: "Who is Prime Minister of the United Kingdom?",
		choices: ["David Cameron", "Gordon Brown", "Winston Churchill", "Tony Blair"],
		correctAnswer: 0
	},
	{
		question: "Who is the best rapper?",
		choices: ["Jay-z", "Drake", "Obama", "Kendrick"],
		correctAnswer: 1},
		{
			question: "Who has the best facial hair in Keen ?",
			choices: ["Tim", "Dustin", "Justin", "Kyle"],
			correctAnswer: 2
		}
		];
		var questionPosition;
		var userAnswer = [];
		var total = 0;
		var questionLabel;
		initialize();

		function initialize() {
			questionPosition = 0;
			questionLabel = questionPosition + 1;
			var pNode = document.createElement("h4");
			var pContent = document.createTextNode("Question #" + questionLabel +": " + quiz[0].question);
			pNode.appendChild(pContent);
			document.getElementById("quiz").appendChild(pNode);
			for (var j = 0; j < quiz[0].choices.length; j++) {
				var radioInput = document.createElement('input');
				radioInput.id = quiz[0].choices.indexOf(quiz[0].choices[j]);
				var label = document.createElement("label");
				radioInput.setAttribute('type', 'radio');
				radioInput.setAttribute('name', 'question');
				radioInput.setAttribute('value', quiz[0].choices[j]);
				label.appendChild(radioInput);
				label.innerHTML += quiz[0].choices[j];
				document.getElementById("quiz").appendChild(label);
				document.getElementById(j).onclick = function(){
					document.getElementById("next").disabled = false;
				}
			}
			isDisabled();
		}
		function move(){
			if(questionPosition > 0){
				document.getElementById("back").style.display= "inline";
			} else {
				document.getElementById("back").style.display= "none";
			}
			
			if(questionPosition ==  quiz.length){
				var pNode = document.createElement("p");
				var pContent = document.createTextNode("Your score is " + total + "/" + quiz.length );
				pNode.appendChild(pContent);
				document.getElementById("quiz").appendChild(pNode);
				var elem1 = document.getElementById("next");
				var elem2 = document.getElementById("back");
				elem1.remove();
				elem2.remove();
			} else{
				questionLabel = questionPosition + 1;
				var pNode = document.createElement("p");
				var pContent = document.createTextNode("Question #"+questionLabel +": " + quiz[questionPosition].question);
				pNode.appendChild(pContent);
				document.getElementById("quiz").appendChild(pNode);
				for (var j = 0; j < quiz[questionPosition].choices.length; j++) {
					var label = document.createElement("label");
					var radioInput = document.createElement('input');
					radioInput.id = quiz[questionPosition].choices.indexOf(quiz[questionPosition].choices[j]);
					radioInput.setAttribute('type', 'radio');
					radioInput.setAttribute('name', 'question');
					radioInput.setAttribute('value', quiz[questionPosition].choices[j]);
					label.appendChild(radioInput);
					label.innerHTML += quiz[questionPosition].choices[j];
					document.getElementById("quiz").appendChild(label);
					document.getElementById(j).onclick = function(){
						document.getElementById("next").disabled = false;
					}	
				}
				if(userAnswer[questionPosition] != undefined) {
						document.getElementById(userAnswer[questionPosition]).checked = true;
					} else{
						isDisabled();
					}
				

			}
			console.log(total);
		}

		function back(){
			if($('input[type=radio]:checked').length != 0){
				// alert("Please select one radio");
				// checked variable grabs the radio input id value that is checked
				var checked = document.querySelector('input[name="question"]:checked').id;
				var userChoice = document.querySelector('input[name="question"]:checked').value;
				// answer variable contains the correct answer for this question
				var answer = quiz[questionPosition].correctAnswer;
				if( userAnswer[questionPosition] == undefined) {
					userAnswer[questionPosition] = checked;
					if (userAnswer[questionPosition] == answer) { total +=1;}
				}
			}
			questionPosition -= 1;
			clear();
			move();
			
		}

		function clear(){
			var myNode = document.getElementById("quiz");
			while (myNode.firstChild) {
				myNode.removeChild(myNode.firstChild);
			}
		};

		function isDisabled(){
			document.getElementById("next").disabled = true;
		}
		//this function is activated when the user clicks the next button
		function next(){
			// checked variable grabs the radio input id value that is checked
			var checked = document.querySelector('input[name="question"]:checked').id;
			// answer variable contains the correct answer for this question
			var answer = quiz[questionPosition].correctAnswer;
			if( userAnswer[questionPosition] == undefined) {
				userAnswer[questionPosition] = checked;
				if (userAnswer[questionPosition] == answer) { total +=1;}
			}
			else {
				if(checked != userAnswer[questionPosition]){
					if(checked == answer) {
						total +=1;
					}
					else { 
						total -=1;
					}
				}
			} 		
			questionPosition += 1;
			clear();
			move();	
		}	

