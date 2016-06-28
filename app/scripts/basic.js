
// 1. use single class, e.g. js-block v
// 2. use classList v
// 3. move DOM elements into variables outside of scroll callback v
// 4. move menuClass outside of scroll callback v
// 5. remove magic numbers v
// 6. set windowHeight v
// 7. loop through each DOM element and if its offsetTop is between topPosition and bottomPosition, set a class called "is-active", which adds a background-color of red.

// cache DOM elements
var blockNodeList = document.querySelectorAll(".js-block");
// cache positions
var blockOffsetList = [];
// Section heights
var blockHeightList = [];

for (var i = 0; i < blockNodeList.length; i++) {
	blockOffsetList.push(blockNodeList[i].offsetTop);
	blockHeightList.push(blockNodeList[i].offsetHeight);
}

var windowHeight = window.innerHeight;

var blockHeigh
console.log('blockOffsetList', blockOffsetList);
console.log('blockHeightList', blockHeightList);



/*var intro = blockNodeList[0];
var about = blockNodeList[1];
var gallery = blockNodeList[2];
var contact = blockNodeList[3];

var intorPos = intro.offsetTop;
var aboutPos = about.offsetTop;
var galleryPos = gallery.offsetTop;
var contactPos = contact.offsetTop; //don't need them */

// var menuLiNodeList = document.querySelectorAll(".menu li"); //temp off

// function menuRemoveClass() {
// 	for (var i = 1; i < menuLiNodeList.length; i++) {
// 		menuLiNodeList[i-1].classList.remove("current_item");
// 		blockNodeList[i].classList.remove("current_page");
// 	}
// }

window.addEventListener("scroll", function() {

	var scrollTop = document.body.scrollTop;

	var viewCenter = scrollTop + windowHeight * .5;
	var topRange = viewCenter - 100;
	var bottomRange = viewCenter + 100;
	
	// var halfWindowHeight = windowHeight / 2;

	// var midPos = topPosition + halfWindowHeight;

	// console.log("window.scrollTop", document.body.scrollTop);

	// console.log(windowHeight, halfWindowHeight);
	// console.log(bottomPosition);
	// console.log(midPos);
	// console.log(aboutPos);
	// console.log("contactPos: " + contactPos);

	for (var i = 0, l = blockNodeList.length; i < l; i++) {
		
/*		if (topRange < blockOffsetList[i] && bottomRange > blockOffsetList[i]) {
			blockNodeList[i].classList.add('is-active');
			
			// menuRemoveClass();
			// menuLiNodeList[i-1].classList.add("current_item");
			// blockNodeList[i].classList.add("is-active");
		
		} else {
			blockNodeList[i].classList.remove('is-active');
		}*/
		var blockbottom = blockHeightList[i] + blockOffsetList[i];

		if (blockOffsetList[i] < bottomRange && blockbottom > topRange) {
			blockNodeList[i].classList.add('is-active');
		} else {
			blockNodeList[i].classList.remove('is-active');
		}

	}

});

