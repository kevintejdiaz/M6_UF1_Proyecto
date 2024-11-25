window.onload = () => {
    // Llamar a la función para crear las tarjetas
    crearTarjetas(filosofos);

    // Crear handlers para los botones de control
    let botonCrearTarjeta = document.querySelector('.create-btn');
    botonCrearTarjeta.addEventListener('click', crearNuevaTarjeta);
    document.getElementById('ordenarAZ').addEventListener('click', ordenarNombreAZ);
    document.getElementById('ordenarZA').addEventListener('click', ordenarNombreZA);
    document.querySelector('.save-btn').addEventListener('click', guardarTarjetas);
    document.querySelector('.load-btn').addEventListener('click', cargarTarjetas);
};

// Crear tarjetas en base al array de filósofos
function crearTarjetas(filosofos) {
    let contenedor = document.querySelector('.cards-container');

    filosofos.forEach((filosofo) => {
        // Crear tarjeta y los elementos de la tarjeta
        let tarjeta = document.createElement('div');
        tarjeta.classList.add('card');
        
        let imagen = document.createElement('img');
        imagen.src = filosofo.imagen;
        imagen.alt = `Foto de ${filosofo.nombre}`;
        imagen.classList.add('photo');
        tarjeta.append(imagen);

        let info = document.createElement('div');
        info.classList.add('card-info');
        tarjeta.append(info);

        let titulo = document.createElement('h3');
        titulo.classList.add('nombre');
        titulo.innerHTML = filosofo.nombre;
        info.append(titulo);

        // Añadir la información adicional (país, corriente, habilidades, etc.)
        let filaInfo = document.createElement('div'); 
        filaInfo.classList.add('info-row');
        info.append(filaInfo);

        // País
        let paisInfo = document.createElement('div');
        paisInfo.classList.add('info-pais');
        let paisImagen = document.createElement('img');
        paisImagen.src = filosofo.pais.bandera;
        paisImagen.alt = `Bandera de ${filosofo.pais.nombre}`;
        paisInfo.append(paisImagen);
        let paisNombre = document.createElement('span');
        paisNombre.classList.add('pais');
        paisNombre.textContent = filosofo.pais.nombre;
        paisInfo.append(paisNombre);
        filaInfo.append(paisInfo);

        // Corriente
        let corrienteInfo = document.createElement('div');
        corrienteInfo.classList.add('info-corriente');
        let corrienteLabel = document.createElement('span');
        corrienteLabel.textContent = 'Corriente: ';
        corrienteInfo.append(corrienteLabel);
        let corriente = document.createElement('span');
        corriente.classList.add('corriente');
        corriente.textContent = filosofo.corriente;
        corrienteInfo.append(corriente);
        filaInfo.append(corrienteInfo);

        // Arma
        let armaInfo = document.createElement('div');
        armaInfo.classList.add('info-arma');
        let armaLabel = document.createElement('span');
        armaLabel.textContent = 'Arma: ';
        armaInfo.append(armaLabel);
        let arma = document.createElement('span');
        arma.classList.add('arma');
        arma.textContent = filosofo.arma;
        armaInfo.append(arma);
        filaInfo.append(armaInfo);

        // Habilidades
        let habilidades = document.createElement('div');
        habilidades.classList.add('skills');
        info.append(habilidades);
        for (let infoHabilidad of filosofo.habilidades) {
            let habilidad = document.createElement('div');
            habilidad.classList.add('skill');
            habilidades.append(habilidad);

            let etiqueta = document.createElement('span');
            etiqueta.classList.add('skill-name');
            etiqueta.textContent = infoHabilidad.habilidad;
            habilidad.append(etiqueta);

            let barraNivel = document.createElement('div');
            barraNivel.classList.add('skill-bar');
            habilidad.append(barraNivel);

            let nivel = document.createElement('div');
            nivel.classList.add('level');
            nivel.style.width = `${infoHabilidad.nivel * 25}%`;
            barraNivel.append(nivel);
        }

        // Botón de eliminar
        let botonX = document.createElement('div');
        botonX.innerHTML = "&#x2716";
        botonX.classList.add('botonEliminar');
        botonX.addEventListener('click', eliminarTarjeta);
        tarjeta.append(botonX);

        // Añadir la tarjeta al contenedor (agregar al final)
        contenedor.append(tarjeta);
    });
}

// Eliminar tarjeta
function eliminarTarjeta(event) {
    const boton = event.target;
    boton.parentElement.remove();
}

function ordenarNombreAZ() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3.nombre').innerText;
        let nombre2 = tarjetaB.querySelector('h3.nombre').innerText;
        return nombre1.localeCompare(nombre2);
    });

    // Eliminar todas las tarjetas del contenedor
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';

    // Añadir las tarjetas ordenadas al contenedor
    tarjetasOrdenadas.forEach(tarjeta => contenedor.append(tarjeta));
}

function ordenarNombreZA() {
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    let tarjetasOrdenadas = tarjetas.sort((tarjetaA, tarjetaB) => {
        let nombre1 = tarjetaA.querySelector('h3.nombre').innerText;
        let nombre2 = tarjetaB.querySelector('h3.nombre').innerText;
        return nombre2.localeCompare(nombre1);  // Cambio en el orden
    });

    // Eliminar todas las tarjetas del contenedor
    let contenedor = document.querySelector('.cards-container');
    contenedor.innerHTML = '';

    // Añadir las tarjetas ordenadas al contenedor
    tarjetasOrdenadas.forEach(tarjeta => contenedor.appendChild(tarjeta));
}

// Crear nueva tarjeta
function crearNuevaTarjeta(event) {
    event.preventDefault();

    let nuevoFilosofo = {
        nombre: document.querySelector('#name').value,
        imagen: document.querySelector('#image').value,
        pais: { nombre: document.querySelector('#country').value, bandera: document.querySelector('#flag').value },
        corriente: document.querySelector('#philosophy').value,
        arma: document.querySelector('#weapon').value,
        habilidades: [
            { habilidad: "Habilidad 1", nivel: document.querySelector('#skill1').value },
            { habilidad: "Habilidad 2", nivel: document.querySelector('#skill2').value },
            { habilidad: "Habilidad 3", nivel: document.querySelector('#skill3').value },
            { habilidad: "Habilidad 4", nivel: document.querySelector('#skill4').value }
        ]
    };

    // Asignar los valores del formulario al objeto nuevoFilosofo
    nuevoFilosofo.nombre = document.querySelector('#name').value ;
    nuevoFilosofo.imagen = document.querySelector('#image').value;
    nuevoFilosofo.pais.nombre = document.querySelector('#country').value;
    nuevoFilosofo.pais.bandera = document.querySelector('#flag').value;
    nuevoFilosofo.corriente = document.querySelector('#philosophy').value;
    nuevoFilosofo.arma = document.querySelector('#weapon').value;

    // Habilidades
    nuevoFilosofo.habilidades = [
        { habilidad: "Sabiduría", nivel: document.querySelector('#skill1').value},
        { habilidad: "Oratoria", nivel: document.querySelector('#skill2').value},
        { habilidad: "Lógica", nivel: document.querySelector('#skill3').value},
        { habilidad: "Innovación", nivel: document.querySelector('#skill4').value}
    ];

    filosofos.push(nuevoFilosofo);

    // Crear las tarjetas con el nuevo filósofo (solo agregar la nueva tarjeta)
    crearTarjetas([nuevoFilosofo]);

    // Limpiar los campos del formulario después de crear la tarjeta
    document.querySelector('form').reset();
}




function parsearTarjetas(tarjetas) {
    let filosofosParseados = [];  // Inicialitzem l'array que emmagatzemarà els objectes

    for (let tarjeta of tarjetas) {
        let filosofo = {};  // Creem un objecte per cada filòsofo

        // Assignem les propietats de l'objecte filosofo amb els valors extrets del DOM
        filosofo.nombre = tarjeta.querySelector('.nombre').innerHTML;
        filosofo.imagen = tarjeta.querySelector('.photo').src;
        filosofo.pais = {};
        filosofo.pais.nombre = tarjeta.querySelector('.pais').innerHTML;
        filosofo.bandera = tarjeta.querySelector('.info-pais img').src;
        filosofo.corriente = tarjeta.querySelector('.corriente').innerHTML;
        filosofo.arma = tarjeta.querySelector('.arma').innerHTML;

        // Recollim les habilitats de la targeta
        let habilidades = tarjeta.querySelectorAll('.skill');
        filosofo.habilidades = [];  // Inicialitzem l'array per a les habilitats

        for (let habilidad of habilidades) {
            let habilidadParaGuardar = {};
            habilidadParaGuardar.nombre = habilidad.querySelector('.skill-name').innerHTML;
            habilidadParaGuardar.nivel = habilidad.querySelector('.level').style.width;
            filosofo.habilidades.push(habilidadParaGuardar);  // Afegim l'habilitat a l'array
        }

        filosofosParseados.push(filosofo);  // Afegim el filòsofo a la llista
    }

    return filosofosParseados;  // Retornem l'array amb tots els filòsofs
}

function guardarTarjetas(){
    let tarjetas = Array.from(document.querySelectorAll('.card'));
    localStorage.setItem('tarjetas',JSON.stringify(parsearTarjetas(tarjetas)));
}

function crearTarjetaHTML(filosofo) {
    const card = document.createElement('div');
    card.classList.add('card');

    // Imagen
    const imagen = document.createElement('img');
    imagen.src = filosofo.imagen;
    imagen.alt = `Foto de ${filosofo.nombre}`;
    imagen.classList.add('photo');
    card.append(imagen);

    // Contenedor de información
    const info = document.createElement('div');
    info.classList.add('card-info');
    card.append(info);

    // Nombre
    const titulo = document.createElement('h3');
    titulo.classList.add('nombre');
    titulo.textContent = filosofo.nombre;
    info.append(titulo);

    // Información adicional (país, corriente, arma)
    const filaInfo = document.createElement('div');
    filaInfo.classList.add('info-row');
    info.append(filaInfo);

    // País
    const paisInfo = document.createElement('div');
    paisInfo.classList.add('info-pais');
    const paisImagen = document.createElement('img');
    paisImagen.src = filosofo.bandera;
    paisImagen.alt = `Bandera de ${filosofo.pais.nombre}`;
    paisInfo.append(paisImagen);
    const paisNombre = document.createElement('span');
    paisNombre.classList.add('pais');
    paisNombre.textContent = filosofo.pais.nombre;
    paisInfo.append(paisNombre);
    filaInfo.append(paisInfo);

    // Corriente
    const corrienteInfo = document.createElement('div');
    corrienteInfo.classList.add('info-corriente');
    const corrienteLabel = document.createElement('span');
    corrienteLabel.textContent = 'Corriente: ';
    corrienteInfo.append(corrienteLabel);
    const corriente = document.createElement('span');
    corriente.classList.add('corriente');
    corriente.textContent = filosofo.corriente;
    corrienteInfo.append(corriente);
    filaInfo.append(corrienteInfo);

    // Arma
    const armaInfo = document.createElement('div');
    armaInfo.classList.add('info-arma');
    const armaLabel = document.createElement('span');
    armaLabel.textContent = 'Arma: ';
    armaInfo.append(armaLabel);
    const arma = document.createElement('span');
    arma.classList.add('arma');
    arma.textContent = filosofo.arma;
    armaInfo.append(arma);
    filaInfo.append(armaInfo);

    // Habilidades
    const habilidades = document.createElement('div');
    habilidades.classList.add('skills');
    info.append(habilidades);
    filosofo.habilidades.forEach((habilidad) => {
        const skillDiv = document.createElement('div');
        skillDiv.classList.add('skill');
        habilidades.append(skillDiv);

        const skillName = document.createElement('span');
        skillName.classList.add('skill-name');
        skillName.textContent = habilidad.nombre;
        skillDiv.append(skillName);

        const skillBar = document.createElement('div');
        skillBar.classList.add('skill-bar');
        skillDiv.append(skillBar);

        const level = document.createElement('div');
        level.classList.add('level');
        level.style.width = habilidad.nivel;
        skillBar.append(level);
    });

    // Botón de eliminar
    const botonX = document.createElement('div');
    botonX.innerHTML = "&#x2716"; // Icono de eliminar
    botonX.classList.add('botonEliminar');
    botonX.addEventListener('click', () => {
        card.remove();
    });
    card.append(botonX);

    // Añadir la tarjeta al contenedor
    document.querySelector('.cards-container').append(card);
}


function cargarTarjetas() {
    // Recuperem les targetes emmagatzemades al localStorage
    let tarjetasGuardadas = JSON.parse(localStorage.getItem('tarjetas'));

    // Si hi ha targetes desades, les mostrem
    if (tarjetasGuardadas) {
        // Suponem que ja tenim una funció que converteix les targetes a HTML (com una funció que genera les targetes)
        tarjetasGuardadas.forEach(filosofo => {
            crearTarjetaHTML(filosofo);
        });
    }
}

const filosofos = [
    {
        nombre: "Platón",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/da/Plato_Pio-Clemetino_Inv305.jpg/1200px-Plato_Pio-Clemetino_Inv305.jpg",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Idealismo",
        arma: "Dialéctica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 4
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 4
        }
        ]
    },
    {
        nombre: "Aristóteles",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdXUwy_fFGOJ2vwOMpwtJPyXc9HVb06HSRsbembn7IPKq6D1YitIra2WFM4Gu2rm6yHRs&usqp=CAU",
        pais: {
            nombre: "Grecia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Flag_of_Greece.svg/640px-Flag_of_Greece.svg.png"
        },
        corriente: "Naturalismo",
        arma: "Lógica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 4
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 4
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Descartes",
        imagen: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/800px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
        pais: {
            nombre: "Francia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Flag_of_France.svg/1280px-Flag_of_France.svg.png"
        },
        corriente: "Racionalismo",
        arma: "Meditación",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Kant",
        imagen: "https://i.pinimg.com/736x/20/89/7f/20897f915acb5124893a278c395382ed.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Trascendentalismo",
        arma: "Crítica",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Hume",
        imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSiFZYg2MiOQSXbkBvFP-T3vW9pnhLW5qDioA&s",
        pais: {
            nombre: "Escocia",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Flag_of_Scotland.svg/640px-Flag_of_Scotland.svg.png"
        },
        corriente: "Empirismo",
        arma: "Escepticismo",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 3
        },
        {
            habilidad: "Lógica",
            nivel: 3
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    },
    {
        nombre: "Arendt",
        imagen: "https://efeminista.com/wp-content/uploads/2021/09/Arendt-Hannah-1-e1576158475623.jpg",
        pais: {
            nombre: "Alemania",
            bandera: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Flag_of_Germany.svg/255px-Flag_of_Germany.svg.png"
        },
        corriente: "Fenomenología",
        arma: "Parresía",
        habilidades: [{
            habilidad: "Sabiduría",
            nivel: 3
        },
        {
            habilidad: "Oratoria",
            nivel: 2
        },
        {
            habilidad: "Lógica",
            nivel: 2
        },
        {
            habilidad: "Innovación",
            nivel: 3
        }
        ]
    }
]