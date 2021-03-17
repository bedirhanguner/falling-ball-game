var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var bothKeys = 0;
var counter = 0;
var currentBlocks = [];

function moveLeft() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left > 0) {
        character.style.left = left - 2 + "px";
    }
}

function moveRight() {
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if (left < 580) {
        character.style.left = left + 2 + "px";
    }
}

document.addEventListener("keydown", event => {
    if (bothKeys === 0) {
        bothKeys++;
        if (event.key == "ArrowLeft" || event.key == "a" || event.key == "A") {
            interval = setInterval(moveLeft, 1);
        }

        if (event.key == "ArrowRight" || event.key == "d" || event.key == "D") {
            interval = setInterval(moveRight, 1);
        }
    }
});

document.addEventListener("keyup", event => {
    clearInterval(interval);
    bothKeys = 0;
});

var blocks = setInterval(function () {
    var lastBlock = document.getElementById("block" + (counter - 1));
    var lastHole = document.getElementById("hole" + (counter - 1));
    if (counter > 0) {
        var lastBlockTop = parseInt(window.getComputedStyle(lastBlock).getPropertyValue("top"));
        var lastHoleTop = parseInt(window.getComputedStyle(lastHole).getPropertyValue("top"));
    }

    if (lastBlockTop < 690 || counter == 0) {
        var block = document.createElement("div");
        var hole = document.createElement("div");
        var random = Math.floor(Math.random() * 540);
        hole.style.left = random + "px";
        block.style.top = lastBlockTop + 100 + "px";
        hole.style.top = lastHoleTop + 100 + "px";
        block.setAttribute("class", "block");
        hole.setAttribute("class", "hole");
        block.setAttribute("id", "block" + counter);
        hole.setAttribute("id", "hole" + counter);
        game.appendChild(block);
        game.appendChild(hole);
        currentBlocks.push(counter);
        counter++;
    }

    var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    var drop = 0;
    if (characterTop <= 0) {
        alert("Game Over. Your Score is " + (counter - 9));
        clearInterval(blocks);
        location.reload();
    }
    for (var i = 0; i < currentBlocks.length; i++) {
        let current = currentBlocks[i];
        let iblock = document.getElementById("block" + current);
        let ihole = document.getElementById("hole" + current);
        let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
        let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
        iblock.style.top = iblockTop - 0.5 + "px";
        ihole.style.top = iblockTop - 0.5 + "px";
        if (iblockTop < -0) {
            currentBlocks.shift();
            iblock.remove();
            ihole.remove();
        }
        if (iblockTop - 20 < characterTop && iblockTop > characterTop) {
            drop++;
            if (iholeLeft <= characterLeft && iholeLeft + 20 >= characterLeft) {
                drop = 0;
            }
        }

        if (drop == 0) {
            character.style.top = characterTop + 2 + "px";
        }
        else {
            character.style.top = characterTop - 1 + "px";
        }
    }

}, 1);
