let isListening = false;
let initiationCommand = "hey there";

let commands = {
    'lights off': 'black',
    'lights on': 'white',
    'red': 'red',
    'pink': 'pink',
    'blue': 'blue',
    'yellow': 'yellow',
    'green': 'green'
};

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

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
    Object.keys(commands).forEach(function (key) {
        if (t.toLowerCase().indexOf(key) > -1) {
            document.bgColor = commands[key];
            isListening = false;
            document.getElementById("mic-icon").classList.toggle("mic-disabled");
            document.getElementById("mic-icon").classList.toggle("mic-enabled");
        }
    });
}