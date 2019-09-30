/*
 *   File:   Carousel.js
 *
 *   Desc:   Carousel widget that implements ARIA Authoring Practices
 *
 */ /*
 *   @constructor CarouselTablist
 *
 *
 */var Carousel=function(a){this.domNode=a,this.items=[],this.firstItem=null,this.lastItem=null,this.currentDomNode=null,this.liveRegionNode=null,this.currentItem=null,this.pauseButton=null,this.startLabel="Start automatic slide show",this.stopLabel="Stop automatic slide show",this.rotate=!0,this.hasFocus=!1,this.hasHover=!1,this.isStopped=!1,this.timeInterval=5e3};/* Initialize Carousel Tablists */Carousel.prototype.init=function(){this.liveRegionNode=this.domNode.querySelector(".carousel-items");for(var a,b=this.domNode.querySelectorAll(".carousel-item"),c=0;c<b.length;c++){a=new CarouselItem(b[c],this),a.init(),this.items.push(a),this.firstItem||(this.firstItem=a,this.currentDomNode=a.domNode),this.lastItem=a;var d=b[c].querySelectorAll(".carousel-image a");d&&d[0]&&(d[0].addEventListener("focus",this.handleImageLinkFocus.bind(this)),d[0].addEventListener("blur",this.handleImageLinkBlur.bind(this)))}// Next Slide and Previous Slide Buttons
for(var e=document.querySelectorAll(".carousel a.carousel-control"),c=0;c<e.length;c++)if("a"==e[c].tagName.toLowerCase()){var f=new CarouselButton(e[c],this);f.init()}if(this.currentItem=this.firstItem,this.pauseButton=this.domNode.parentNode.parentNode.querySelector("button.pause"),this.pauseButton){var f=new PauseButton(this.pauseButton,this);f.init(),this.pauseButton.innerHTML=this.stopLabel}this.domNode.addEventListener("mouseover",this.handleMouseOver.bind(this)),this.domNode.addEventListener("mouseout",this.handleMouseOut.bind(this)),setTimeout(this.rotateSlides.bind(this),this.timeInterval)},Carousel.prototype.setSelected=function(a,b){"boolean"!=typeof b&&(b=!1);for(var c=0;c<this.items.length;c++)this.items[c].hide();this.currentItem=a,this.currentItem.show(),b&&this.currentItem.domNode.focus()},Carousel.prototype.setSelectedToPreviousItem=function(a,b){"boolean"!=typeof b&&(b=!1);var c;"object"!=typeof a&&(a=this.currentItem),a===this.firstItem?this.setSelected(this.lastItem,b):(c=this.items.indexOf(a),this.setSelected(this.items[c-1],b))},Carousel.prototype.setSelectedToNextItem=function(a,b){"boolean"!=typeof b&&(b=!1);var c;"object"!=typeof a&&(a=this.currentItem),a===this.lastItem?this.setSelected(this.firstItem,b):(c=this.items.indexOf(a),this.setSelected(this.items[c+1],b))},Carousel.prototype.rotateSlides=function(){this.rotate&&this.setSelectedToNextItem(),setTimeout(this.rotateSlides.bind(this),this.timeInterval)},Carousel.prototype.startRotation=function(){this.hasHover||this.hasFocus||this.isStopped||(this.rotate=!0,this.liveRegionNode.setAttribute("aria-live","off"),this.pauseButton.innerHTML=this.stopLabel),this.disablePauseButton()},Carousel.prototype.stopRotation=function(){this.rotate=!1,this.liveRegionNode.setAttribute("aria-live","polite"),this.pauseButton.innerHTML=this.startLabel,this.disablePauseButton()},Carousel.prototype.disablePauseButton=function(){this.hasHover||this.hasFocus?this.pauseButton.setAttribute("aria-disabled","true"):this.pauseButton.removeAttribute("aria-disabled")},Carousel.prototype.toggleRotation=function(){this.isStopped?"true"!==this.pauseButton.getAttribute("aria-disabled")&&(this.isStopped=!1,this.startRotation()):(this.isStopped=!0,this.stopRotation())},Carousel.prototype.handleImageLinkFocus=function(){this.liveRegionNode.classList.add("focus")},Carousel.prototype.handleImageLinkBlur=function(){this.liveRegionNode.classList.remove("focus")},Carousel.prototype.handleMouseOver=function(){this.hasHover=!0,this.stopRotation()},Carousel.prototype.handleMouseOut=function(){this.hasHover=!1,this.startRotation()},window.addEventListener("load",function(){for(var a,b=document.querySelectorAll(".carousel"),c=0;c<b.length;c++)a=new Carousel(b[c]),a.init()},!1);
/*
 *   File:   carouselButton.js
 *
 *   Desc:   Carousel Button widget that implements ARIA Authoring Practices
 */ /*
 *   @constructor CarouselButton
 *
 *
 */var CarouselButton=function(a,b){this.domNode=a,this.carousel=b,this.direction="previous",this.domNode.classList.contains("next")&&(this.direction="next"),this.keyCode=Object.freeze({RETURN:13,SPACE:32,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40})};/* EVENT HANDLERS */CarouselButton.prototype.init=function(){this.domNode.addEventListener("keydown",this.handleKeydown.bind(this)),this.domNode.addEventListener("click",this.handleClick.bind(this)),this.domNode.addEventListener("focus",this.handleFocus.bind(this)),this.domNode.addEventListener("blur",this.handleBlur.bind(this))},CarouselButton.prototype.changeItem=function(){"previous"===this.direction?this.carousel.setSelectedToPreviousItem():this.carousel.setSelectedToNextItem()},CarouselButton.prototype.handleKeydown=function(a){var b=!1;switch(a.keyCode){case this.keyCode.SPACE:case this.keyCode.RETURN:this.changeItem(),this.domNode.focus(),b=!0;break;default:}b&&(a.stopPropagation(),a.preventDefault())},CarouselButton.prototype.handleClick=function(){this.changeItem()},CarouselButton.prototype.handleFocus=function(){this.carousel.hasFocus=!0,this.domNode.classList.add("focus"),this.carousel.stopRotation()},CarouselButton.prototype.handleBlur=function(){this.carousel.hasFocus=!1,this.domNode.classList.remove("focus"),this.carousel.startRotation()};
/*
 *   File:   CarouselItem.js
 *
 *   Desc:   Carousel Tab widget that implements ARIA Authoring Practices
 */ /*
 *   @constructor CarouselItem
 *
 *
 */var CarouselItem=function(a,b){this.domNode=a,this.carousel=b};/* EVENT HANDLERS */CarouselItem.prototype.init=function(){this.domNode.addEventListener("focusin",this.handleFocusIn.bind(this)),this.domNode.addEventListener("focusout",this.handleFocusOut.bind(this))},CarouselItem.prototype.hide=function(){this.domNode.classList.remove("active")},CarouselItem.prototype.show=function(){this.domNode.classList.add("active")},CarouselItem.prototype.handleFocusIn=function(){this.domNode.classList.add("focus"),this.carousel.hasFocus=!0,this.carousel.stopRotation()},CarouselItem.prototype.handleFocusOut=function(){this.domNode.classList.remove("focus"),this.carousel.hasFocus=!1,this.carousel.startRotation()};
/*
 *   File:   pauseButton.js
 *
 *   Desc:   Implements the pause button for the carousel widget
 *
 */var PauseButton=function(a,b){this.domNode=a,this.carousel=b},StartButton=function(a,b){this.domNode=a,this.carousel=b};/* EVENT HANDLERS */PauseButton.prototype.init=function(){this.domNode.addEventListener("click",this.handleClick.bind(this)),this.domNode.addEventListener("focus",this.handleFocus.bind(this)),this.domNode.addEventListener("blur",this.handleBlur.bind(this))},PauseButton.prototype.handleClick=function(){this.carousel.toggleRotation()},PauseButton.prototype.handleFocus=function(){this.domNode.classList.add("focus")},PauseButton.prototype.handleBlur=function(){this.domNode.classList.remove("focus")};
