// cache DOM elements
var blockNodeList = document.querySelectorAll('.js-block');
// cache positions
var blockOffsetList = [];
// Section heights
var blockHeightList = [];

var windowHeight = 0;

function updatePositions() {
	windowHeight = window.innerHeight;
	
	for (var i = 0; i < blockNodeList.length; i++) {
		blockOffsetList[i] = blockNodeList[i].offsetTop;
		blockHeightList[i] = blockNodeList[i].offsetHeight;
	}
}

function detectPage() {
	var scrollTop = document.body.scrollTop;

	var viewCenter = scrollTop + windowHeight * .5;
	var topRange = viewCenter - 100;
	var bottomRange = viewCenter + 100;

	for (var i = 0, l = blockNodeList.length; i < l; i++) {
		
		var blockbottom = blockHeightList[i] + blockOffsetList[i];

		var bottomBelowTop = blockbottom > topRange;

		var topAboveBottom = blockOffsetList[i] < bottomRange;

		if (bottomBelowTop && topAboveBottom) {
			blockNodeList[i].classList.add('is-active');
		} /*else {
			blockNodeList[i].classList.remove('is-active');
		}*/

	}
}

// ------------------------------
// TOGGLE BEHAVIOUR
// Click hamburger to show menu
// ------------------------------

var toggle = document.querySelector('.js-toggle');

var menuList = document.querySelector('.js-menu-lists');

toggle.addEventListener('click', function(e) {

	e.currentTarget.classList.toggle('is-toggled');

	menuList.classList.toggle('is-visible');

});	

// ------------------------------
// RESIZE BEHAVIOUR
// ------------------------------

window.addEventListener('resize', function() {

	updatePositions();

});

window.addEventListener('scroll', detectPage);

updatePositions();

detectPage();
