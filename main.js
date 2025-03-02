"use strict";

let authorDiv = document.querySelector(".author");
let authorButton = document.querySelector(".author__button");
let shareDiv = document.querySelector(".share-links");
let shareButton = document.querySelector(".share-links__button");
let list = document.querySelector(".list");
let text = document.querySelector(".text")
let isTooltip;

authorButton.addEventListener("click", handleClickOnButton);
shareButton.addEventListener("click", handleClickOnButton);
window.onresize = handleResize;

function handleClickOnButton(event) {
  let windowWidth = document.documentElement.clientWidth;

  if (windowWidth < 640) {
    switchFooter();
  } else {
    let tooltipWidth = 250;
    let buttonCoords = this.getBoundingClientRect();
    let isEnoughSpace = (tooltipWidth / 2) < (windowWidth - buttonCoords.left - this.offsetWidth / 2);

    if (isEnoughSpace && this == authorButton) {
      if (isTooltip) return;
      isTooltip = true;
      showTooltip();
      this.addEventListener("click", removeTooltip);
    } else {
      switchFooter();
    }
  }
}

function switchFooter() {
  authorDiv.classList.toggle("hidden");
  shareDiv.classList.toggle("hidden");
}

function showTooltip() {
  shareDiv.className = "tooltip";
  list.classList.toggle("list--tooltip");
  shareButton.classList.toggle("hidden");
  shareDiv.style.top = text.getBoundingClientRect().top + "px";
  shareDiv.style.left = authorButton.getBoundingClientRect().left - ((shareDiv.offsetWidth - authorButton.offsetWidth) / 2) + "px";
}

function removeTooltip() {
  shareDiv.className = "share-links footer hidden";
  list.classList.toggle("list--tooltip");
  shareButton.classList.toggle("hidden");
  authorButton.removeEventListener("click", removeTooltip);
  isTooltip = null;
}

function handleResize() {
  if (!isTooltip) return;
  removeTooltip();
}
