// -- Modal -- //
var modalButtons = document.getElementsByClassName('modal-button');
var modalExits = document.getElementsByClassName('modal-exit');
var modal = document.getElementsByClassName('modal');

function SetUpModalClickEvents(){
    for (var i = 0; i < modalButtons.length; i++) {
        (function(){
            modalButtons[i].addEventListener("click", CreateDisplayModalFunction(i))
        }());
    }
    for (var i = 0; i < modalExits.length;i++){
        (function(){
            modalExits[i].addEventListener("click", CreateExitModalFunction(i),false)
        }());
    }
}
function CreateDisplayModalFunction(i){
    return function(){
        DisplayModal(modalButtons[i].dataset.target)
    };
}
function CreateExitModalFunction(i){
    return function(){
        ExitModal(modalButtons[i].dataset.target)
    };
}
function DisplayModal(target) {
    for (var i = 0; i < modal.length; i++) {
        if(modal[i].dataset.value == target)
            modal[i].style.display = 'flex';
    }
}
function ExitModal(target) {
    for (var i = 0; i < modal.length; i++) {
        if(modal[i].dataset.value == target)
            modal[i].style.display = 'none';
    }
}
SetUpModalClickEvents();

// -- Accordion -- //
var accordionTriggers = document.getElementsByClassName('accordion-trigger');
var accordionElements = document.getElementsByClassName('accordion');
function SetUpAccordionClickEvents(){
    for (var i = 0; i < accordionTriggers.length; i++) {
        (function(){
            accordionTriggers[i].addEventListener("click", CreateDisplayAccordionFunction(i))
        }());
    }
    for (var i = 0; i < accordionElements.length; i++) {
        accordionElements[i].style.maxHeight = '0';
    }
}
function CreateDisplayAccordionFunction(i){
    return function(){
        ToggleDisplayAccordion(accordionTriggers[i].dataset.target)
    };
}
function ToggleDisplayAccordion(target) {
    for (var i = 0; i < accordionElements.length; i++) {
        if(accordionElements[i].dataset.value == target)
            accordionElements[i].style.maxHeight = accordionElements[i].style.maxHeight == '0px' ? '1020px': '0px';
    }
}
SetUpAccordionClickEvents();

// -- Carousel -- //
var carousels = document.getElementsByClassName('carousel');
var carouselPrevs = document.getElementsByClassName('prev');
var carouselNexts = document.getElementsByClassName('next');
var carouselIndicators = document.getElementsByClassName('indicators');
var hoverOver = false;
function SetUpCarouselEvents(){
    for (var i = 0; i < carouselPrevs.length; i++) {
        (function(){
            carouselPrevs[i].addEventListener("click", CreatePrevFunction(i));
        }());
    }
    for (var i = 0; i < carouselNexts.length; i++) {
        (function(){
            carouselNexts[i].addEventListener("click", CreateNextFunction(i));
            setInterval(CreateCycleFunction(i),8000);
        }());
    }
    for (var i = 0; i < carousels.length; i++) {
        carousels[i].addEventListener("mouseenter", CreateStopFunction);
        carousels[i].addEventListener("mouseleave", CreateResumeFunction);
        var images = GetImagesFromCarousel(carousels[i]);
        for (var j = 0; j < images.length; j++) {
            var node = document.createElement("i");
            node.classList.add("fa-square");
            images[j].style.display = 'none';
            if(j == 0)
            node.classList.add("fas");  
            else
            node.classList.add("far");
            carouselIndicators[i].appendChild(node);
        }
        var texts = GetTextsFromCarousel(carousels[i]);
        if(texts.length > 0)
            texts[0].classList.add('carousel-text-display')
        images[0].style.display = 'inline-flex';
        carousels[i].style.height = images[0].height + "px";
        images[images.length - 1].style.display = 'inline-flex';
        images[images.length - 1].classList.add('carousel-left-position');
        images[1].style.display = 'inline-flex';
        images[1].classList.add('carousel-right-position');
    }
}

function GetImagesFromCarousel(carousel){
    var images = [];
    for (var i = 0; i < carousel.children.length; i++) {
        if(carousel.children[i].localName == "img"){
            images.push(carousel.children[i]);
        }
    }
    return images;
}
function GetTextsFromCarousel(carousel){
    var texts = [];
    for (var i = 0; i < carousel.children.length; i++) {
        if(carousel.children[i].classList.contains('carousel-text')){
            texts.push(carousel.children[i]);
        }
    }
    return texts;
}
function CreateNextFunction(i){
    return function(){
        CycleSlide(carouselNexts[i].dataset.target,1)
    };
}
function CreateCycleFunction(i){
    return function(){
        if(!hoverOver)
            CycleSlide(carouselNexts[i].dataset.target,1)
    };
}

function CreatePrevFunction(i){
    return function(){
        CycleSlide(carouselPrevs[i].dataset.target,-1)
    };
}
function CreateStopFunction(){
    hoverOver = true;
}
function CreateResumeFunction(){
    hoverOver = false;  
}
function CycleSlide(target, increment){
    for (var i = 0; i < carousels.length; i++) {
        if(carousels[i].dataset.value == target) {
            var images = GetImagesFromCarousel(carousels[i]);
            var texts = GetTextsFromCarousel(carousels[i]);
            for (var j = 0; j < images.length; j++) {
                if(images[j].style.display === 'inline-flex' 
                    && !images[j].classList.contains('carousel-left-position')
                    && !images[j].classList.contains('carousel-right-position')){
                    for(var k = 0; k < images.length; k++){
                        images[k].style.display = 'none';
                        if(images[k].classList.contains('carousel-left-position'))
                            images[k].classList.remove('carousel-left-position');
                        if(images[k].classList.contains('carousel-right-position'))
                            images[k].classList.remove('carousel-right-position');
                    }
                    for(var l = 0; l < texts.length; l++)
                        texts[l].classList.remove('carousel-text-display');
                    carouselIndicators[i].children[j].classList.remove("fas");
                    carouselIndicators[i].children[j].classList.add("far");
                    
                    if(j + 2 == images.length && increment == 1){
                        images[images.length - 1].style.display = 'inline-flex';
                        images[images.length - 2].style.display = 'inline-flex';
                        images[images.length - 2].classList.add('carousel-left-position');
                        images[0].style.display = 'inline-flex';
                        images[0].classList.add('carousel-right-position');
                        carouselIndicators[i].children[images.length - 1].classList.remove("far");
                        carouselIndicators[i].children[images.length - 1].classList.add("fas");
                        texts[images.length - 1].classList.add('carousel-text-display');
                    }
                    else if(j + 1 == images.length && increment == 1){
                        images[0].style.display = 'inline-flex';
                        images[images.length - 1].style.display = 'inline-flex';
                        images[images.length - 1].classList.add('carousel-left-position');
                        images[1].style.display = 'inline-flex';
                        images[1].classList.add('carousel-right-position');
                        carouselIndicators[i].children[0].classList.remove("far");
                        carouselIndicators[i].children[0].classList.add("fas");
                        texts[0].classList.add('carousel-text-display');
                    }
                    else if(j - 2 == -1 && increment == -1){
                        images[0].style.display = 'inline-flex';
                        images[images.length - 1].style.display = 'inline-flex';
                        images[images.length - 1].classList.add('carousel-left-position');
                        images[1].style.display = 'inline-flex';
                        images[1].classList.add('carousel-right-position');
                        carouselIndicators[i].children[0].classList.remove("far");
                        carouselIndicators[i].children[0].classList.add("fas");
                        texts[0].classList.add('carousel-text-display');
                    }
                    else if(j - 1 == -1 && increment == -1){
                        images[images.length - 1].style.display = 'inline-flex';
                        images[images.length - 2].style.display = 'inline-flex';
                        images[images.length - 2].classList.add('carousel-left-position');
                        images[0].style.display = 'inline-flex';
                        images[0].classList.add('carousel-right-position');
                        carouselIndicators[i].children[images.length - 1].classList.remove("far");
                        carouselIndicators[i].children[images.length - 1].classList.add("fas");
                        texts[images.length - 1].classList.add('carousel-text-display');
                    }
                    else{
                        images[j + increment].style.display = 'inline-flex';
                        images[(j + increment) - 1].style.display = 'inline-flex';
                        images[(j + increment) - 1].classList.add('carousel-left-position');
                        images[(j + increment) + 1].style.display = 'inline-flex';
                        images[(j + increment) + 1].classList.add('carousel-right-position');
                        carouselIndicators[i].children[j + increment].classList.remove("far");
                        carouselIndicators[i].children[j + increment].classList.add("fas");
                        texts[j + increment].classList.add('carousel-text-display');
                    }
                    return;
                }
            }
        }
    }
}
    SetUpCarouselEvents();
    

// -- JSON -- //

function loadJSON(callback) {

    var file = new XMLHttpRequest();
    file.overrideMimeType("application/json");
    file.open('GET', '../motd.json', true);
    file.onreadystatechange = function() {
        if (file.readyState == 4 && file.status == "200") {
            callback(file.responseText);
        }
    }
    file.send(null);

}
loadJSON(function(response) {
    if(response){
        json = JSON.parse(response);
        if(document.getElementById('motd'))
            document.getElementById('motd').innerHTML = json[0].motd;
    }
        
});
