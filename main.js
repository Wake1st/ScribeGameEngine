let worldSettings;


const input = document.querySelector('#current input');
const current = document.querySelector('#current');
const history = document.querySelector('#history');


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const comm = input.value;
        input.value = '';

        const result = processCommand(comm);
        appendHistory(comm,result);
    }
});


function readJson(path) {
    return fetch(path)
        .then(response => response.json());
}

function appendHistory(comm,result) {
    const div = document.createElement('div');
    div.classList.toggle('event');
    history.appendChild(div);

    const c = document.createElement('p');
    div.appendChild(c);
    c.textContent = `${comm}`;

    const r = document.createElement('p');
    div.appendChild(r);
    r.textContent = result;
}

function processCommand(comm) {
    let msg;

    const mainIndex = comm.indexOf(' ')
    let mainCommand = comm.substring(0,mainIndex);
    let argument = comm.slice(mainIndex, comm.length);

    //  Handle main command
    switch (mainCommand) {
        case 'goto':
            break;
        case 'take':
            break;
        default:
            return 'Nothing seems to happen.';
    }
                
    msg = `You ${mainCommand} ${argument}.`;
    
    return msg;
}


worldSettings = readJson('./WorldSettings.json');
console.log(worldSettings);