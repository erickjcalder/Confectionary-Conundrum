const grid = document.getElementById("grid");
grid.addEventListener("click", clickDetect, false);

var started = false;
var score = 0;
var click1 = false;
var first;
var noSwap = new Audio("./audio/pop.mp3");
var swap = new Audio("./audio/bing.mp3");
var previous;
var previous2;
var temp;
var count = 0;
var matchList = [];

setupField();

function setupField() {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 7; j++) {
            const cell = i + "." + j;
            const selected = document.getElementById(cell);
            selected.style.backgroundColor = "white";
            const rand = Math.floor(Math.random() * 6);
            selected.style.backgroundImage = pickImage(rand);
        }
    }

    checkAll();
    while (matchList.length > 0) {
        alert("ENEMY SPOTTED");
        clearMatchList();
        checkAll();
    }
}

function pickImage(x) {
    switch (x) {
        case 0:
            return "url(./images/cak.png)";
            break;

        case 1:
            return "url(./images/can.png)";
            break;

        case 2:
            return "url(./images/cup.png)";
            break;

        case 3:
            return "url(./images/don.png)";
            break;

        case 4:
            return "url(./images/man.png)";
            break;

        case 5:
            return "url(./images/cro.png)";
            break;
    }
}

function windowClick() {
    if (!started) {
        const img = document.getElementById("start");
        img.style.display = "none";
        started = true;
    }
}

function clickDetect(e) {
    const xPos = e.clientX - grid.offsetLeft;
    const yPos = e.clientY - grid.offsetTop;

    const x = Math.trunc(xPos / 75);
    const y = Math.trunc(yPos / 75);

    const selected = document.getElementById(y + "." + x);

    if (!click1) {
        selected.style.backgroundColor = "blue";
        first = selected;
        click1 = true;
    } else if (checkAdjacent(x, y)) {
        const tempImg = first.style.backgroundImage;
        first.style.backgroundImage = selected.style.backgroundImage;
        selected.style.backgroundImage = tempImg;
        click1 = false;
        first.style.backgroundColor = "white";

        checkAll();
        if (matchList.length == 0) {
            const tempImg = first.style.backgroundImage;
            first.style.backgroundImage = selected.style.backgroundImage;
            selected.style.backgroundImage = tempImg;
            noSwap.play();
        } else {
            clearMatchList();
            swap.play();
        }
    } else {
        first.style.backgroundColor = "white";
        selected.style.backgroundColor = "blue";
        first = selected;
    }
}

function checkAdjacent(x, y) {
    const fid = parseFloat(first.id);
    const sid = parseFloat(y + "." + x);
    const test = Math.round((fid - sid) * 10) / 10;

    if (Math.abs(test) == 1 || Math.abs(test) == 0.1) {
        return true;
    } else {
        return false;
    }
}

function checkMatchesH() {
    for (i = 0; i < 9; i++) {
        for (j = 0; j < 7; j++) {
            const selected = document.getElementById(i + "." + j);

            if (j != 0) {
                if (
                    selected.style.backgroundImage ==
                    previous.style.backgroundImage
                ) {
                    count += 1;
                } else {
                    count = 0;
                }
            } else {
                count = 0;
            }

            if (count == 2) {
                selected.style.backgroundColor = "red";
                previous2.style.backgroundColor = "red";
                previous.style.backgroundColor = "red";
                matchList.push(selected);
                matchList.push(previous);
                matchList.push(previous2);
            } else if (count >= 3) {
                selected.style.backgroundColor = "red";
                matchList.push(selected);
            }

            if (count >= 1) {
                previous2 = previous;
            }
            previous = selected;
        }
    }
}

function checkMatchesV() {
    count = 0;
    for (j = 0; j < 7; j++) {
        for (i = 0; i < 9; i++) {
            const selected = document.getElementById(i + "." + j);

            if (i != 0) {
                if (
                    selected.style.backgroundImage ==
                    previous.style.backgroundImage
                ) {
                    count += 1;
                } else {
                    count = 0;
                }
            } else {
                count = 0;
            }

            if (count == 2) {
                selected.style.backgroundColor = "red";
                previous2.style.backgroundColor = "red";
                previous.style.backgroundColor = "red";
                matchList.push(selected);
                matchList.push(previous);
                matchList.push(previous2);
            } else if (count >= 3) {
                selected.style.backgroundColor = "red";
                matchList.push(selected);
            }

            if (count >= 1) {
                previous2 = previous;
            }
            previous = selected;
        }
    }
}

function checkAll() {
    checkMatchesH();
    checkMatchesV();
}

function clearMatchList() {
    for (i in matchList) {
        const rand = Math.floor(Math.random() * 6);
        matchList[i].style.backgroundImage = pickImage(rand);
        matchList[i].style.backgroundColor = "white";
    }
    matchList = [];
}
