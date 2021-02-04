function iniciar() {

    const video = window.document.querySelector('#video');
    const canvas = window.document.querySelector('#canvas');
    const TxtCarregando = window.document.querySelector('#TxtCarregando');
    const fundoVideoCanvas = window.document.querySelector('#fundoVideoCanvas');

    const context = canvas.getContext('2d');
    
    const detectarFace = new tracking.ObjectTracker('face');
    tracking.track('#video', detectarFace, { camera: true });

    detectarFace.on('track', event => {
        event.data.forEach(dadosDaFace => {

            if(dadosDaFace.length === 0) {

                console.log('Nenhum rosto encontrado');

            } else {

                TxtCarregando.style.visibility = 'hidden';
                fundoVideoCanvas.style.visibility = 'visible'

                console.log(dadosDaFace);

                context.clearRect(0, 0, canvas.width, canvas.height);
            
                context.strokeStyle = 'red';
                context.lineWidth = 2;
                context.shadowColor = 'red';
                context.shadowBlur = 9;

                context.fillText(`X: ${dadosDaFace.x}, Y: ${dadosDaFace.y}`, dadosDaFace.x + dadosDaFace.width + 10, dadosDaFace.y + 20);
                context.fillStyle = 'white';
                context.font='15px sans-serif';

                context.fillText(`Width: ${dadosDaFace.width},  Height:${dadosDaFace.height}`, dadosDaFace.x + dadosDaFace.width + 10, dadosDaFace.y + 40);
                context.fillStyle = 'white ';
                context.font='15px sans-serif';

                context.strokeRect(dadosDaFace.x, dadosDaFace.y, dadosDaFace.width, dadosDaFace.height);

            };
            
        });

    });

};

window.load = iniciar();