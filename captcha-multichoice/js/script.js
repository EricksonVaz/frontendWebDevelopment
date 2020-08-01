sessionStorage.clear();
var localIndexSession = 1;

var captchas = [
    {
        name:"Cavalo",
        img:[
                ['img/horse/row-1-col-1.jpg','img/horse/row-1-col-2.jpg','img/horse/row-1-col-3.jpg','img/horse/row-1-col-4.jpg'],
                ['img/horse/row-2-col-1.jpg','img/horse/row-2-col-2.jpg','img/horse/row-2-col-3.jpg','img/horse/row-2-col-4.jpg'],
                ['img/horse/row-3-col-1.jpg','img/horse/row-3-col-2.jpg','img/horse/row-3-col-3.jpg','img/horse/row-3-col-4.jpg']
        ],
        desafio:[
            {
                titulo:"Encontre os cascos do Cavalo",
                resultado_esperado:['c1-r3','c2-r3']
            },
            {
                titulo:"Encontre a cauda do Cavalo",
                resultado_esperado:['c3-r2','c4-r2']
            },
            {
                titulo:"Encontre os joelhos do Cavalo",
                resultado_esperado:['c1-r2']
            },
            {
                titulo:"Encontre as orelhas do Cavalo",
                resultado_esperado:['c1-r1']
            },
            {
                titulo:"Encontre os olhos do Cavalo",
                resultado_esperado:['c1-r1']
            },
            {
                titulo:"A bariga do Cavalo",
                resultado_esperado:['c2-r2','c3-r2']
            },
            {
                titulo:"As costas do Cavalo",
                resultado_esperado:['c2-r1','c3-r1']
            },
            {
                titulo:"A coxa do Cavalo",
                resultado_esperado:['c3-r2']
            },
            {
                titulo:"A espadua do Cavalo",
                resultado_esperado:['c2-r2']
            },
            {
                titulo:"O pedito do Cavalo",
                resultado_esperado:['c1-r2']
            },
            {
                titulo:"O curvilhão do Cavalo",
                resultado_esperado:['c3-r3']
            },
            {
                titulo:"As nadegass do Cavalo",
                resultado_esperado:['c3-r2']
            },
        ]
    },
];

var geraCaptcha = 0;
var captcha = captchas[geraCaptcha];
var desafioGerado = parseInt(Math.random()*captcha.desafio.length);
var infoDesafio = captcha.desafio[desafioGerado];

var cells = document.querySelectorAll('.cell');
var tituloDesafio = document.querySelector('#titulo');
var choice = document.querySelector('.choice');
var btnReset = document.querySelector('.btn-warning');
var btnCheck = document.querySelector('.btn-success');


console.log("imagem->"+captcha.name);
console.log("desafio->"+infoDesafio.titulo);


tituloDesafio.innerText = infoDesafio.titulo;

console.log(sessionStorage.length); 
cells.forEach(el=>{
    el.firstChild.nextElementSibling.setAttribute('src',captcha.img[parseInt(el.dataset.row)][parseInt(el.dataset.col)]);
    el.addEventListener('click',choiceImage);
});

btnReset.addEventListener('click',function(){
    location.reload();
});

btnCheck.addEventListener('click',checkResult);

function choiceImage(el){
    let elementParent = el.target.parentNode;

    if(!elementParent.classList.contains('active')){
        let srcClicked = el.explicitOriginalTarget.attributes.src.nodeValue;
        let nameIndex = "c"+(parseInt(elementParent.dataset.col)+1)+"-r"+(parseInt(elementParent.dataset.row)+1);

        sessionStorage.setItem(nameIndex,nameIndex);
        elementParent.classList.add('active');
        choiceFill(srcClicked,nameIndex);
    }
}

function choiceFill(src,key){
    let choice = document.querySelector('.choice');
    choice.innerHTML += `<div class="choice-img">
            <samp class="close" onclick="deleteImage('${key}',this)">&times;</samp>
            <img src="${src}" alt="">
        </div>`;
}

function deleteImage(key,el){
    document.querySelector('.'+key).classList.remove('active');
    el.parentElement.remove();
    sessionStorage.removeItem(key);
}

function checkResult(){
    let count = 0;

    if(infoDesafio.resultado_esperado.length == (sessionStorage.length - localIndexSession)){
        for(let arrayEl in infoDesafio.resultado_esperado){
            console.log(infoDesafio.resultado_esperado[arrayEl]);
            if(sessionStorage.getItem(infoDesafio.resultado_esperado[arrayEl])){
                count++;
                if(count==infoDesafio.resultado_esperado.length){
                    alert("Parabens Voce passou no teste");
                    location.reload(); 
                }
            }else{
                alert("Voce falhou no teste, tente de novo mais tarde");
                location.reload(); 
            }
        }
    }else{
        alert("Voce falhou no teste, tente de novo mais tarde");
        location.reload();
    }
}