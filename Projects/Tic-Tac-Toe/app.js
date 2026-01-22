let btn = document.querySelectorAll(".box");
let reset = document.querySelector(".reset");
let para = document.querySelector(".msg");
let newReset = document.querySelector(".newReset");
let msg = document.querySelector(".msg-container");
const winPattern = [[0,1,2],[3,4,5],
                    [6,7,8],[0,3,6],
                    [1,4,7],[2,5,8],
                    [2,4,6],[0,4,8]];

let turnO = true;

const draw = () => {
    para.innerText = `Draw`;
    msg.classList.remove("hide");
}

const disable = () => {
    for (let btns of btn) {
        btns.disabled = true;
    }
}
const enable = () => {
    for (let btns of btn) {
        btns.disabled = false;
        btns.innerText= "";
    }
}
const winner = (a) =>{
    para.innerText = `Congratulation ${a} is Winner`;
    msg.classList.remove("hide");
}
btn.forEach((btn) => {
    btn.addEventListener("click", () =>{
        if(turnO){
        btn.innerText = "O";
        btn.style.color = "#785964";
        turnO = false;
        }
        else{
            btn.innerText = "X";
            turnO = true;
            btn.style.color = "#DD2D4A";
        }
        btn.disabled = true;
        checkWinner();
    });
});
const checkWinner = () =>{
    for(let pattern of winPattern){
        let pos1 = btn[pattern[0]].innerText;
        let pos2 = btn[pattern[1]].innerText;
        let pos3 = btn[pattern[2]].innerText;

        if(pos1 !='' && pos2 !='' && pos3 !=''){
            if(pos1 === pos2 && pos2 === pos3){
                console.log('Congratulation',pos1,'Are The Winner');
                disable();
                winner(pos1);

            }
        }
    }
    
}
const resetGame = () => {
    turnO = true;
    enable();
    msg.classList.add('hide');
}

reset.addEventListener("click",resetGame);
newReset.addEventListener("click",resetGame);