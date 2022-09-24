function openModal(id) {
  var modal = document.getElementById(id);
  var modalContent = modal.getElementsByClassName("modal-content");
  var closeButton = modal.getElementsByClassName("close");
  modal.classList.add("active");
  modal.style.animation = "fadeIn 500ms";
  document.body.style.overflow = "hidden";

  closeButton[0].addEventListener(
    "click",
    (e) => {
      modalContent[0].style.animation = "slideUp 500ms";
      modal.style.animation = "fadeOut 500ms";
      setTimeout(function () {
        modal.classList.remove("active");
        modal.style.animation = "none";
        modalContent[0].style.animation = "slideDown 500ms";
      }, 500);
      document.body.style.overflow = "scroll";
    },
    { once: true }
  );
}

function closeModal(id) {
  var modal = document.getElementById(id);
  var modalContent = modal.getElementsByClassName("modal-content");
  modalContent[0].style.animation = "slideUp 500ms";
  modal.style.animation = "fadeOut 500ms";
  setTimeout(function () {
    modal.classList.remove("active");
    modal.style.animation = "none";
    modalContent[0].style.animation = "slideDown 500ms";
  }, 500);
  document.body.style.overflow = "scroll";
}

const elementIsVisibleInViewport = (el, partiallyVisible = false) => {
  const { top, left, bottom, right } = el.getBoundingClientRect();
  const { innerHeight, innerWidth } = window;
  return partiallyVisible
    ? ((top > 0 && top < innerHeight) ||
        (bottom > 0 && bottom < innerHeight)) &&
        ((left > 0 && left < innerWidth) || (right > 0 && right < innerWidth))
    : top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

function appearCards(id) {
  var cards = document.getElementById(id);
  if (elementIsVisibleInViewport(cards, true)) {
    cards.classList.remove("hidden");
  }
}
