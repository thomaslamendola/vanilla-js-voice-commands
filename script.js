let isListening = false;
let initiationCommand = "hey there";

let colorCommands = {
    'lights off': 'black',
    'lights on': 'white',
    'red': 'red',
    'pink': 'pink',
    'blue': 'blue',
    'yellow': 'yellow',
    'green': 'green'
};

let actionCommands = {
    'one': 'one',
    'two': 'two',
    'three': 'three',
    '1': 'one',
    '2': 'two',
    '3': 'three'
}

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
// recognition.lang = 'it-IT';

recognition.addEventListener('result', e => {
    const transcript = Array.from(e.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('')

    console.log(transcript);

    if (transcript.toLowerCase().indexOf(initiationCommand) > -1) {
        isListening = true;
        document.getElementById("mic-icon").classList.toggle("mic-disabled");
        document.getElementById("mic-icon").classList.toggle("mic-enabled");
    } else if (isListening) {
        handleCommand(transcript);
    }
}
);

recognition.addEventListener('end', recognition.start);
recognition.start();

function handleCommand(t) {
    Object.keys(colorCommands).forEach(function (key) {
        if (t.toLowerCase().indexOf(key) > -1) {
            document.bgColor = colorCommands[key];
            isListening = false;
            document.getElementById("mic-icon").classList.toggle("mic-disabled");
            document.getElementById("mic-icon").classList.toggle("mic-enabled");
        }
    });
    
    Object.keys(actionCommands).forEach(function (key) {
        if (t.toLowerCase().indexOf(key) > -1) {
            let reference = actionCommands[key];
            let checkboxes = document.getElementsByTagName("input");

            for (let checkbox of checkboxes) {
                let currentValue = checkbox.getAttribute("audio-tag");
                if(reference === currentValue) {
                    checkbox.checked = true;
                }
            }

            isListening = false;
            document.getElementById("mic-icon").classList.toggle("mic-disabled");
            document.getElementById("mic-icon").classList.toggle("mic-enabled");
        }
    });
}