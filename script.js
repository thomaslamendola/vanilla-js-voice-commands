let isListening = false;

let lang = 'en-ZA';

let initiationCommand = {
    'en-ZA': 'listen to me',
    'it-IT': 'mamma mia',
    'fr-FR':'bonjour'
}

let commands = {
    'en-ZA': {
        'change_theme': {
            'verb': ['change', 'swap', 'toggle', 'set'],
            'object': ['theme', 'dark theme', 'light theme'],
            'metadata': [],
            'payload': {
                'eventName': 'change_theme'
            }
        }
    },
    'it-IT': {
        'change_theme': {
            'verb': ['cambia', 'cambiare', 'inverti', 'invertire', 'imposta', 'impostare'],
            'object': ['tema', 'tema chiaro', 'tema scuro'],
            'metadata': [],
            'payload': {
                'eventName': 'change_theme'
            }
        }
    }    ,
    'fr-FR': {
        'change_theme': {
            'verb': ['change', 'définir'],
            'object': ['thème', 'thème sombre', 'thème lumière'],
            'metadata': [],
            'payload': {
                'eventName': 'change_theme'
            }
        }
    }
};

let commandList = document.getElementById('commands');

function setListeningStatus(status) {
    switch (status) {
        case true:
            isListening = true;
            document.getElementById('mic-icon').classList.toggle('mic-disabled');
            document.getElementById('mic-icon').classList.toggle('mic-enabled');
            break;
        case false:
            isListening = false;
            document.getElementById('mic-icon').classList.toggle('mic-disabled');
            document.getElementById('mic-icon').classList.toggle('mic-enabled');
            break;
    }
}

function isMatchFound(sentence, word) {
    return sentence.toLowerCase().indexOf(word) > -1
}

function isCommandMatched(sentence, command) {
    let result = false;
    if (command['verb'].some(verb => isMatchFound(sentence, verb))) {
        if (command['object'].some(obj => isMatchFound(sentence, obj))) {
            result = true;
        }
    }
    return result;
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

recognition.lang = lang;

function changeLang(ev) {
    lang = ev.target.value
    recognition.lang = lang;
}

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    console.log(transcript);

    if (isMatchFound(transcript, initiationCommand[lang])) {
        setListeningStatus(true);
    } else if (isListening) {
        handleCommand(transcript);
    }
}
);

recognition.addEventListener('end', recognition.start);
recognition.start();

function print(message) {
    let p = document.createElement('p');
    p.textContent = message;
    commandList.appendChild(p);
}

function handleCommand(t) {
    let handled = false;
    Object.keys(commands[lang]).forEach(function (key) {
        let command = commands[lang][key];
        if (isCommandMatched(t, command)) {
            handled = true;
            print(`${JSON.stringify(command['payload'])} was sent through the event bus...`);
            setListeningStatus(false);
        }
    });
    if (!handled) {
        print('Sorry, can you please say it again... I am still learning! :)')
    }
}