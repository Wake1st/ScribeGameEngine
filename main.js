const question = document.querySelector('#question');
const input = document.querySelector('#current input');
const current = document.querySelector('#current');
const history = document.querySelector('#history');


question.textContent = 'Who are you?';

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        
        let comm = input.value;
        input.value = '';

        if (!worldSettings.ready) {
            if (setup(comm)) {
                worldSettings.ready = true;
                question.textContent = `What does ${worldSettings.player.name} do?`;
            }
        } else {
            let action = handleTurn(comm);
            displayHistory(action);
            //console.log(worldSettings.player)
        }
    }
});


function displayHistory({comm, result}) {
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