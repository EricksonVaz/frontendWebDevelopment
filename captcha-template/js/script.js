var horse = document.querySelector('.horse');
var leftBtn = document.querySelector('.left-arrow');
var rightBtn = document.querySelector('.right-arrow');
var btnCheck = document.querySelector('.btn-check');

var cavalo = [
    {
        name:"olhando para tras",
        img:"horse-left.jpg",
        incorrect:[90,180,270],
        leftDegIncrement:90,
        rightDegIncrement:-90
    },
    {
        name:"olhando para Frente",
        img:"horse-right.jpg",
        incorrect:[-90,-180,-270],
        leftDegIncrement:-90,
        rightDegIncrement:90
    }
];

var horseStateChoise = parseInt(Math.random()*2);
console.log("Cavalo "+horseStateChoise);

var horseChoised = cavalo[horseStateChoise];
var startHorsePositionChoised = horseChoised.incorrect[parseInt(Math.random()*2)];

console.log("Cavalo Escolhido "+horseChoised.name);
console.log("Posição inicial do cavalo "+startHorsePositionChoised+" deg");

horse.src = horseChoised.img;

horse.setAttribute('data-atual',startHorsePositionChoised);
sessionStorage.setItem('atualDeg', startHorsePositionChoised);

horse.style.transform="rotate("+startHorsePositionChoised+"deg)";

leftBtn.addEventListener('click',function(){
    let atualPosition = parseInt(horse.dataset.atual);
    let newAtualPosition

    if(horseStateChoise == 0){

        newAtualPosition = atualPosition + (horseChoised.leftDegIncrement);
        newAtualPosition = atualPosition >= 270? 0 : newAtualPosition;
        horse.setAttribute('data-atual',newAtualPosition);

    }else if(horseStateChoise == 1){

        newAtualPosition = atualPosition + (horseChoised.rightDegIncrement);
        newAtualPosition = atualPosition == 0? -270 : newAtualPosition;
        horse.setAttribute('data-atual',newAtualPosition);

    }
    sessionStorage.setItem('atualDeg', newAtualPosition);
    horse.style.transform="rotate("+newAtualPosition+"deg)";
});

rightBtn.addEventListener('click',function(){
    let atualPosition = parseInt(horse.dataset.atual);
    let newAtualPosition;

    if(horseStateChoise == 0){

        newAtualPosition = atualPosition + (horseChoised.rightDegIncrement);
        newAtualPosition = atualPosition == 0? 270 : newAtualPosition;
        horse.setAttribute('data-atual',newAtualPosition);

    }else if(horseStateChoise == 1){

        newAtualPosition = atualPosition + (horseChoised.leftDegIncrement);
        newAtualPosition = atualPosition <= -270? 0 : newAtualPosition;
        horse.setAttribute('data-atual',newAtualPosition);

    }
    sessionStorage.setItem('atualDeg', newAtualPosition);
    horse.style.transform="rotate("+newAtualPosition+"deg)";
});

btnCheck.addEventListener('click',function(){

    if(horse.dataset.atual == sessionStorage.getItem('atualDeg')){
        if(horse.dataset.atual == 0){
            window.location.href = "./congratulation.html";
        }else{
            toastr.options.hideDuration = 2000;
            toastr.error("Wrong try again");
        }
    }else{
        alert("Oops! Something unexpected happened, press ok to try again");
        location.reload()
    }
});

