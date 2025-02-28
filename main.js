"use strict";

let authorButton = document.querySelector(".author__button");
let tooltip;

authorButton.addEventListener("click", handleClickOnAuthorButton);
window.onresize = handleResize;

function handleClickOnAuthorButton(event) {
  let windowWidth = document.documentElement.clientWidth;
  
  if (tooltip) return;

  if (windowWidth < 640) { // viewport max-width 640px
    switchFooter();
  } else { // viewport min-width 640px
    let tooltipWidth = 250;
    let authorButtonCoords = authorButton.getBoundingClientRect();
    let isEnoughSpace = (tooltipWidth / 2) < (windowWidth - authorButtonCoords.left - authorButton.offsetWidth / 2);

    if (isEnoughSpace) {
      tooltip = createTooltip();
      showTooltip(tooltip, authorButtonCoords);
      authorButton.addEventListener("click", removeTooltip);
    } else {
      switchFooter();
    }
  }
}

function handleResize(event) {
  if (!tooltip) return;

  tooltip.style.left = authorButton.getBoundingClientRect().left - ((tooltip.offsetWidth - authorButton.offsetWidth) / 2 ) + "px";
  let textElement = document.querySelector(".text");
  tooltip.style.top = textElement.getBoundingClientRect().top + "px";
}

function removeTooltip(event) {
  tooltip.remove();
  authorButton.removeEventListener("click", removeTooltip);
  tooltip = null;
}

function showTooltip(tooltip, buttonCoords) {
  document.body.append(tooltip);
  let tooltipX = buttonCoords.left - ((tooltip.offsetWidth - authorButton.offsetWidth) / 2 );
  let textElement = document.querySelector(".text");
  let tooltipY = textElement.getBoundingClientRect().top;

  tooltip.style.left = tooltipX + "px";
  tooltip.style.top = tooltipY + "px";
}

function createTooltip() {
  let div = document.createElement("div");
  div.classList.add("tooltip");
  div.insertAdjacentHTML(
    "beforeend",
    `
      <div class="tooltip__contents">            
        <p class="share-links__text">Share</p>
        <ul class="tooltip__list list">
          <li><a href="#"><img src="./images/icon-facebook.svg" alt="A link to Facebook" width="20" height="20" class="link-img"/></a></li>
          <li><a href="#"><img src="./images/icon-twitter.svg" alt="A link to Twitter" width="20" height="20" class="link-img"/></a></li>
          <li><a href="#"><img src="./images/icon-pinterest.svg" alt="A link to Pinterest" width="20" height="20" class="link-img"/></a></li>
        </ul></div>
      <div class="triangle-container"><span class="triangle"></span></div>     
    `
  )
  return div;
}

function switchFooter() {
  let shareLinkDiv = createShareLinkElement();
  let footer = document.querySelector(".footer-container");
  footer.append(shareLinkDiv);
  let shareLinkButton = document.querySelector(".share-links__button");
  shareLinkButton.addEventListener('click', handleClickOnShareLinkButton);
}

function handleClickOnShareLinkButton(event) {
  let shareLinkDiv = document.querySelector(".share-links");
  let authorDiv = document.querySelector(".author")
  document.querySelector(".share-links__button").removeEventListener("click", handleClickOnShareLinkButton);
  shareLinkDiv.replaceWith(authorDiv);
  shareLinkDiv = null;
}

function createShareLinkElement() {
  let div = document.createElement("div");
  div.classList.add("share-links", "footer");
  div.insertAdjacentHTML(
    "beforeend",   
    ` 
      <p class="share-links__text">Share</p>
      <ul class="list">
        <li><a href="#"><img src="./images/icon-facebook.svg" alt="A link to Facebook" width="20" height="20" class="link-img"/></a></li>
        <li><a href="#"><img src="./images/icon-twitter.svg" alt="A link to Twitter" width="20" height="20" class="link-img"/></a></li>
        <li><a href="#"><img src="./images/icon-pinterest.svg" alt="A link to Pinterest" width="20" height="20" class="link-img"/></a></li>
      </ul>
      <button type="button" class="share-links__button button">
        <img src="./images/icon-share.svg" alt="share links" width="32" height="32" class="button__img button__img--dark" />
      </button>      
    `
  )
  return div;
}