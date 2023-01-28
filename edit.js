var bar = document.querySelector(".bar")
var inputTestButton = document.querySelector(".inputTestButton")
var nextDayButton = document.querySelector(".nextDayButton")
var previousDayButton = document.querySelector(".previousDayButton")

var dayNum = 0

var days = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
]
var daysBlockList = [
    (JSON.parse(localStorage.getItem("monday")) || []),
    (JSON.parse(localStorage.getItem("tuesday")) || []),
    (JSON.parse(localStorage.getItem("wednesday")) || []),
    (JSON.parse(localStorage.getItem("thursday")) || []),
    (JSON.parse(localStorage.getItem("friday")) || []),
    (JSON.parse(localStorage.getItem("saturday")) || []),
    (JSON.parse(localStorage.getItem("sunday")) || []),
]

var blockList = daysBlockList[dayNum]

function timeToMinutes(time) {
    var parts = time.split(":");
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return (hours * 60) + minutes;
}

function removeInner() {
    var elements = document.getElementsByClassName("bar-inner");
    while (elements.length > 0) {
        elements[0].remove();
    }
}

function setInner() {
    document.querySelector(".day-title").textContent = days[dayNum]
    removeInner()
    for (var i = 0; i < blockList.length; i++) {
        var block = blockList[i];
        var startTime = timeToMinutes(block.timeStart);
        var endTime = timeToMinutes(block.timeEnd);
        var blockColor = block.color.trim()
        var blockTitle = block.title

        var startTimeToPercent = (parseInt(startTime) / 1440) * 100
        var endTimeToPercent = (parseInt(endTime) / 1440) * 100
        var percentDifference = endTimeToPercent - startTimeToPercent

        // creating element:
        newBlock = document.createElement("div")
        newBlock.classList.add("bar-inner")
        newBlock.id = i+1
        newBlock.style.backgroundColor = blockColor
        console.log(blockColor)

        newBlock.addEventListener("contextmenu", function(event){
            event.preventDefault();
            blockList.splice(parseInt(this.id-1), 1)
            document.getElementById(this.id).remove()
            localStorage.setItem(days[dayNum], JSON.stringify(blockList))
        });        

        let startTimeElem = document.createElement("div");
        startTimeElem.classList.add("start-time");
        startTimeElem.textContent = block.timeStart;
        startTimeElem.style.color = blockColor;
        newBlock.appendChild(startTimeElem);

        let endTimeElem = document.createElement("div");
        endTimeElem.classList.add("end-time");
        endTimeElem.textContent = block.timeEnd;
        endTimeElem.style.color = blockColor;
        newBlock.appendChild(endTimeElem);

        if (percentDifference > 6) {
            newTitle = document.createElement("div")
            newTitle.classList.add("bar-inner-title")
            newTitle.textContent = blockTitle
            newBlock.appendChild(newTitle)
        }


        // sets x value depending on  start time:
        newBlock.style.left = startTimeToPercent + "%"

        // sets width value depending on the difference of start and end values:
        newBlock.style.width = percentDifference + "%"


        bar.appendChild(newBlock)
    }
}

function addToBlockList() {
    var startTimeInput = document.querySelector(".startTimeInput").value
    var endTimeInput = document.querySelector(".endTimeInput").value
    var colorInput = document.querySelector(".colorInput").value
    var titleInput = document.querySelector(".titleInput").value

    var blockToPush = {
        timeStart: startTimeInput,
        timeEnd: endTimeInput,
        color: colorInput,
        title: titleInput
    }
    blockList.push(blockToPush)
    localStorage.setItem(days[dayNum], JSON.stringify(blockList))
    console.log(blockList)
    setInner()
}


function nextDay() {
    if (dayNum == 6) {
        dayNum = 0
    }
    else {
        dayNum++
    }
    blockList = daysBlockList[dayNum]
    setInner()
} 
function prevDay() {
    if (dayNum == 0) {
        dayNum = 6
    }
    else {
        dayNum--
    }
    blockList = daysBlockList[dayNum]
    setInner()
}
const mouseFollowText = document.querySelector('.mouseFollowText');

document.addEventListener('mousemove', (event) => {
  mouseFollowText.style.top = `${event.clientY + 20}px`;
  mouseFollowText.style.left = `${event.clientX}px`;
});

function setMouseFollowTextContent() {
    mouseFollowText.textContent = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
}

window.onload = function() {
    setInner()
    setMouseFollowTextContent()
    setTimeout(setMouseFollowTextContent, 10000);
}