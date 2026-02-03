const input = document.getElementById('user-input');
const output = document.getElementById('terminal-output');

const commands = {
    'help': 'Available commands: help, about, hack, clear',
    'about': 'Hack- Project v1.0.0. A terminal interface for GitHub Pages.',
    'hack': 'Scanning ports... Accessing mainframe... [SUCCESS] JUST KIDDING!',
    'clear': 'CLEAR'
};

input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const val = input.value.toLowerCase().trim();
        const line = document.createElement('div');
        line.innerHTML = `<span class="prompt">root@hack-~#</span> ${val}`;
        output.appendChild(line);

        if (commands[val]) {
            if (val === 'clear') {
                output.innerHTML = '';
            } else {
                const response = document.createElement('div');
                response.textContent = commands[val];
                response.style.color = '#fff';
                output.appendChild(response);
            }
        } else {
            const error = document.createElement('div');
            error.textContent = `Command not found: ${val}`;
            error.style.color = 'red';
            output.appendChild(error);
        }

        input.value = '';
        output.scrollTop = output.scrollHeight;
    }
});