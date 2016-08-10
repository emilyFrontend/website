
var imgNumber = 1;

var modalOn = false;

var modal = document.querySelector(".modal");
var screenOverlay = document.querySelector(".screen-overlay");
var introImage = document.querySelector(".introImage");

var prevButton = modal.querySelector(".previous");
var nextButton = modal.querySelector(".next");
var closeButton = modal.querySelector(".modal-close");

var imgNode = modal.querySelector("img");
var captionNode = modal.querySelector("figcaption"); 

var gallery = document.querySelector(".js-gallery");

var figCaptions = gallery.querySelectorAll("figcaption");

var numOfItems = gallery.querySelectorAll("figure").length;

var closes = document.querySelectorAll(".js-modal-close");

function showModal() {
	modalOn = true;
	modal.classList.add("modal-show");
	screenOverlay.classList.add("modal-show");
}

function hideModal() {
	modal.classList.remove("modal-show");
	screenOverlay.classList.remove("modal-show");
	modalOn = false;
}

function modalContent(imgNumber) {
	imgNode.src = "images/gallery/modal/" + imgNumber + ".jpg";
	captionNode.textContent = figCaptions[imgNumber-1].textContent;
}

function next() {
	if (imgNumber < numOfItems) {
		imgNumber++ ;
	} else {
		imgNumber = 1;
	}

	modalContent(imgNumber);
}

function previous() {
	if (imgNumber > 1) {
		imgNumber-- ;
	} else {
		imgNumber = numOfItems;
	}

	modalContent(imgNumber);
}

gallery.addEventListener("click", function(e) {

	imgNumber = e.target.parentElement.getAttribute("data-image-number");

	showModal();
	modalContent(imgNumber);

});

nextButton.addEventListener("click", next);

prevButton.addEventListener("click", previous);

introImage.addEventListener("click", function() {
	showModal();
	modalContent(imgNumber);
});

for (var i = 0; i < closes.length; i++) {
	closes[i].addEventListener("click", function() {
    hideModal();
  });
}

window.addEventListener("keydown", function(e) {

	if (modalOn) {
		switch (e.which) {
	    case 37:
	      previous();
	      break;
	    case 39:
	      next();
	      break;
      case 27:
	      hideModal();
	      break;
	    default:
	      return;
	  }
	} else {
		return;
	}

});

//37 left 39 right