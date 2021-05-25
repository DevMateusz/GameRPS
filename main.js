let wins=0, losts=0, drows=0, played=0;
function updateStatistic(){
    let statistic = [...document.querySelectorAll(".stat .value")];
    statistic[0].innerHTML = wins;
    statistic[1].innerHTML = losts;
    statistic[2].innerHTML = drows;
    statistic[3].innerHTML = played;
}

const hands = document.querySelectorAll(".img");
const btn = document.querySelector(".play");
console.log(hands);
let playerSelectedHand = 0;
let aiSelectedHand = 0;
for (let i = 0; i < hands.length; i++) {
    hands[i].addEventListener("click",()=>{
        playerSelectedHand = i;
        hands.forEach(hand => hand.classList.remove("chooseHand"));
        hands[i].classList.add("chooseHand");
        console.log('hello');
    })};

function restartGame(){
    updateStatistic();
    document.querySelector(".fight_layout").style.display = "none";
    document.querySelector(".play").style.animationName = "playShake";
    document.querySelector(".box_one").style.animationName = "none";
    document.querySelector(".box_two").style.animationName = "none";
    document.querySelector(".computer").style.animationName = "none";
    document.querySelector(".you").style.animationName = "none";
    document.querySelector(".player_img").style.animationName = "none";
    document.querySelector(".ai_img").style.animationName = "none";
    document.querySelector(".end_text").style.animationName = "none";
    document.querySelector(".player_img img").style.animationName = "none";
    document.querySelector(".ai_img img").style.animationName = "none";
    document.querySelector(".player_img img").style.transform = "scale(1.2)";
    document.querySelector(".ai_img img").style.transform = "scale(1.2)";
    setTimeout(() => {
        document.querySelector(".transition_layout").style.display = "none";
        document.querySelector(".transition_box").style.animationName = "none";
    }, 600);
}

function animationStart(player, ai, title) {
    hands.forEach(hand => hand.classList.remove("chooseHand"));
    document.querySelector(".play").style.animationName = "none";
    document.querySelector(".transition_layout").style.display = "block";
    document.querySelector(".end_text").innerHTML = `${title}`
    document.querySelector(".fight_layout").style.display = "block";
    document.querySelector(".box_one").style.animationName = "boxLeft";
    document.querySelector(".box_two").style.animationName = "boxRight";
    document.querySelector(".computer").style.animationName = "textLeft";
    document.querySelector(".you").style.animationName = "textRight";
    document.querySelector(".player_img").style.animationName = "playerHand";
    document.querySelector(".ai_img").style.animationName = "aiHand";
    document.querySelector(".player_img img").src = `./images/image${player}.webp`;
    document.querySelector(".ai_img img").src = `./images/image${ai}.webp`;
    document.querySelector(".end_text").style.animationName = "endText";
}

function win(){
    wins++;
    played++;
    animationStart(playerSelectedHand, aiSelectedHand,"WYGRAŁEŚ")
    document.querySelector(".player_img").style.zIndex = "4";
    document.querySelector(".player_img img").style.animationName = "winner";
    setTimeout(() => {
        document.querySelector(".player_img img").style.transform = "scale(1.5)";
    }, 1000);
    setTimeout(() => {
        document.querySelector(".transition_box").style.animationName = "transmitionAnimation";
    }, 4000);
    setTimeout(() => {
        restartGame()
    }, 4200);
}

function lost(){
    losts++;
    played++;
    animationStart(playerSelectedHand, aiSelectedHand,"PRZEGRAŁEŚ")
    document.querySelector(".player_img").style.zIndex = "2";
    document.querySelector(".ai_img img").style.animationName = "winner";
    setTimeout(() => {
        document.querySelector(".ai_img img").style.transform = "scale(1.5)";
    }, 1000);
    setTimeout(() => {
        document.querySelector(".transition_box").style.animationName = "transmitionAnimation";
    }, 4000);
    setTimeout(() => {
        restartGame()
    }, 4200);
}

function drow(){
    drows++;
    played++;
    animationStart(playerSelectedHand, aiSelectedHand,"REMIS");
    setTimeout(() => {
        document.querySelector(".transition_box").style.animationName = "transmitionAnimation";
    }, 4000);
    setTimeout(() => {
        restartGame()
    }, 4200);
}



function checkWinner(player, ai){
    if(player == ai){
        console.log("Remis");
        drow();
    } else{
        switch (player) {
            case 0:
                console.log('kamień');
                switch (ai) {
                    case 1:
                        console.log("Przegrana");
                        lost();
                        break;
                    case 2:
                        console.log("Wygrana");
                        win();
                        break;
                }
                break;
            case 1:
                console.log('papier');
                switch (ai) {
                    case 0:
                        console.log("Wygrana");
                        win();
                        break;
                    case 2:
                        console.log("Przegrana");
                        lost();
                        break;
                }
                break;
            case 2:
                console.log('nożyczki');
                switch (ai) {
                    case 0:
                        console.log("Przegrana");
                        lost();
                        break;
                    case 1:
                        console.log("Wygrana");
                        win();
                        break;
                }
                break;
        }
    }
    
}




btn.addEventListener("click",()=>{
    aiSelectedHand = Math.floor(Math.random() * 3);
    checkWinner(playerSelectedHand, aiSelectedHand);
})