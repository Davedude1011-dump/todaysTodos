
const mouseFollowText = document.querySelector('.mouseFollowText');

document.addEventListener('mousemove', (event) => {
  mouseFollowText.style.top = `${event.clientY + 20}px`;
  mouseFollowText.style.left = `${event.clientX}px`;
});

function setMouseFollowTextContent() {
    mouseFollowText.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}

window.onload = function() {
    setMouseFollowTextContent()
    setTimeout(setMouseFollowTextContent, 10000);
}