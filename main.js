let worldSettings;

(async function() {
    
    function readJson(path) {
        return fetch(path)
            .then(response => response.json());
    }
    
    worldSettings = await readJson('./WorldSettings.json');
    
    console.log(worldSettings);
})()


const input = document.querySelector('#current input');
const current = document.querySelector('#current');
const history = document.querySelector('#history');


input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        let comm = input.value;
        input.value = '';

        let action = {
            comm: disectCommand(comm),
            result: {}
        }
        
        action.result = processCommand(action);

        appendHistory(action);
    }
});


function appendHistory({comm, result}) {
    const div = document.createElement('div');
    div.classList.toggle('event');
    history.appendChild(div);

    const c = document.createElement('p');
    div.appendChild(c);
    c.textContent = `${comm.raw}`;

    const r = document.createElement('p');
    div.appendChild(r);
    r.textContent = result;
}