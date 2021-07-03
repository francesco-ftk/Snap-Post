var canvas = null;
var context = null;  // contenitore per interfaccia di disegno canvas
var coloreSelezionato = "black";
var larghezzaLinea = 3;
var puntoInizioDisegnoX;
var puntoInizioDisegnoY;
var posizioneCorrenteMouseX;
var posizioneCorrenteMouseY;
var mouseIsDown = false;

function openEditor(canvas, controls, snapButton, switchCamera, confirm1){
    snapButton.style.display= 'none';
    switchCamera.style.display= 'none';
    controls.style.display= 'block';
    confirm1.style.display= 'block';
    var rollBack = document.getElementById('rollBack');
    rollBack.style.backgroundImage = "url('Immagini/delete.png')";
    context=canvas.getContext('2d');

    /*var controlsHeight = document.getElementById("controls").offsetHeight;
    canvas.width = window.innerWidth;  // vario altezza e larghezza del canvas con javascript
    canvas.height = window.innerHeight - controlsHeight - 20;*/

    [].forEach.call(
        // Elementi su cui iterare e funzione da applicare su di essi
        document.querySelectorAll('.bottone'),
        function(el){
            console.log(el);
            el.addEventListener('click', function(){
                var id = this.id;
                var colore = id.match(/[A-Z][a-z]+/g);

                if (id == "bottoneCancella"){
                    cancella();
                } else {
                    selezionaColore(
                        {
                            colore: colore[0].toLowerCase()  // json
                        }
                    )
                }
            });
        }
    );

    canvas.addEventListener('mousemove', function(e){
        calcolaCordinate(e);
    });

    canvas.addEventListener('mousedown', function(e){
        calcolaCordinate(e);
    });

    canvas.addEventListener('mouseup', function(e){
        calcolaCordinate(e);
    });

    canvas.addEventListener('mouseout', function(e){
        calcolaCordinate(e);
    });

}

function selezionaColore(obj){
    coloreSelezionato =obj.colore;
}

function cancella(){
    var finestraConferma = confirm('Vuoi davvero cancellare?');
    if(finestraConferma) {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }
}

function calcolaCordinate(e){
    console.log(e.type);

    switch(e.type){
        case 'mousemove' :
            if(mouseIsDown){
                posizioneCorrenteMouseX =  e.clientX - canvas.offsetLeft;
                posizioneCorrenteMouseY =  e.clientY - canvas.offsetTop;
                disegna();
                puntoInizioDisegnoX = posizioneCorrenteMouseX;
                puntoInizioDisegnoY = posizioneCorrenteMouseY;
            }
            break;
        case 'mousedown' :
            mouseIsDown= true;
            puntoInizioDisegnoX = e.clientX - canvas.offsetLeft;
            puntoInizioDisegnoY = e.clientY - canvas.offsetTop;
            break;
        case 'mouseup' :
            mouseIsDown= false;
            break;
        case 'mouseout' :
            mouseIsDown= false;
            break;
    }
    e.preventDefault();
}

function disegna() {
    context.beginPath();
    context.moveTo(puntoInizioDisegnoX, puntoInizioDisegnoY);
    context.lineTo(posizioneCorrenteMouseX, posizioneCorrenteMouseY);
    context.strokeStyle = coloreSelezionato;
    context.lineWidth = larghezzaLinea;
    context.stroke();
    context.closePath();
}
