function findMax() {
	let count = 0;

	//Calcolo occorrenze
	for(let i in countAnswers) {
		for(let j in countAnswers) {
			if(countAnswers[j] === countAnswers[i]) 
				count++;
		}
		occurrences[countAnswers[i]] = count;
		count = 0;
	}
	
	//Trovo l'occorrenza maggiore
	let start_index;
	let max_occurrence = Object.keys(occurrences)[0];
	const len = Object.keys(occurrences).length;

	for(let i = 1; i < Object.keys(occurrences).length; i++) {
		start_index = Object.keys(occurrences)[i];
		if(occurrences[start_index] > occurrences[max_occurrence])
			max_occurrence = start_index;
	}

	return max_occurrence;
}

function showAnswer() {
	for(const item of answers) 
		item.removeEventListener('click',clickAnswer);

	displayAnswer.classList.add('shown');

	const choice = findMax();

	h1.textContent = RESULTS_MAP[choice]['title'];
	p.textContent  = RESULTS_MAP[choice]['contents'];
}

function clickAnswer(event) {
	const selectedItem = event.currentTarget;
	const itemType = selectedItem.dataset.questionId;
	countAnswers[itemType] = selectedItem.dataset.choiceId;
	
	const typeAnswers = document.querySelectorAll('[data-question-id='+itemType+']');
	const checkedImage = selectedItem.querySelector('.checkbox');

	selectedItem.classList.add('selected');
	checkedImage.src = 'images/checked.png';

	for(const newAnswer of typeAnswers) {
		newAnswer.classList.add('opaque');
	}
	selectedItem.classList.remove('opaque');

	/*Se è stata selezionata una risposta diversa da quella precedente*/
	const selectedOpaque = document.querySelector('.selected.opaque');
	if(selectedOpaque !== null) {
		selectedOpaque.classList.remove('selected');
		const deselectImage = selectedOpaque.querySelector('.checkbox');
		deselectImage.src = 'images/unchecked.png';
	}

	if(Object.keys(countAnswers).length === MAX_ANSWER) 
		showAnswer();
}

function resetQuiz() {
	reset.removeEventListener('click',resetQuiz);
	countAnswers = {};
	occurrences  = {};
	
	for(let item of answers) {
		item.classList.remove('selected');
		item.classList.remove('opaque');
		item.querySelector('.checkbox').src = 'images/unchecked.png';
	}
	
	h1.textContent = '';
	p.textContent  = '';

	displayAnswer.classList.remove('shown');

	addClickListener();
}

function addClickListener() {
	for(const item of answers) {
		item.addEventListener('click',clickAnswer);
	}

	reset.addEventListener('click',resetQuiz);
}

const answers = document.querySelectorAll('.choice-grid div');
const reset = document.querySelector('button');

const displayAnswer = document.querySelector('.hidden-answer');
const h1 = displayAnswer.querySelector('div h1');
const p  = displayAnswer.querySelector('div p');

const MAX_ANSWER = 3;	
let countAnswers = {};  //chiave = question-id, valore = choice-id
let occurrences  = {};  //chiave = choice-id,   valore = count	

addClickListener();
