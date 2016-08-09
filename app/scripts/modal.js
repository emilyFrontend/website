
var imgNumber = 1;

var prevButton = document.querySelector(".previous");
var nextButton = document.querySelector(".next");
var closeButton = document.querySelector(".modal-close");

var imgNode = document.querySelector(".modal img");
var captionNode = document.querySelector(".modal figcaption"); 

var gallery = document.querySelector(".js-gallery");
var modal = document.querySelector(".modal");

var figCaptions = gallery.querySelectorAll("figcaption");

gallery.addEventListener("click", function(e) {

	imgNumber = e.target.parentElement.getAttribute("data-image-number");

	showModal();
	modalContent(imgNumber);

	// console.log("cur: ", e.currentTarget, "target: ", e.target, "this: ", this, imgNumber);

});

nextButton.addEventListener("click", function() {

	if (imgNumber < 8) {
		imgNumber++ ;
	} else {
		imgNumber = 1;
	}

	modalContent(imgNumber);

});

prevButton.addEventListener("click", function() {

	if (imgNumber > 1) {
		imgNumber-- ;
	} else {
		imgNumber = 8;
	}

	modalContent(imgNumber);

});

closeButton.addEventListener("click", function() {
	hideModal();
});

function showModal() {
	modal.classList.add("modal-show");
}

function hideModal() {
	modal.classList.remove("modal-show");
}

function modalContent(imgNumber) {
	imgNode.src = "images/gallery/modal/" + imgNumber + ".jpg";
	captionNode.textContent = figCaptions[imgNumber-1].textContent;
}
