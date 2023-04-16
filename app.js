const textarea = document.querySelector('textarea');
const button = document.querySelector('button');
let isSpeaking = true;

const textToSpeech = (e) =>{
    const synth = window.speechSynthesis;
    const text = textarea.value;
    if(!synth.speaking && text){
        const speech = new SpeechSynthesisUtterance(text);
        speech.lang = "ja-JP"; //change this to change the language for the speech. example: "en-US"
        synth.speak(speech);
    }
    if(text.length >50){
        // console.log("this is fine...");
        if(synth.speaking && isSpeaking){
            button.innerText = "一時停止"; //paused
            synth.resume();
            isSpeaking = false;
        } else {
            button.innerText = "再生"; //resume
            synth.pause();
            isSpeaking = true;
        }
    }else{
        isSpeaking = false;
        button.innerText = "発声.."; //speaking..
    }

    setInterval(() =>{
        if(!synth.speaking && !isSpeaking){
            isSpeaking = true;
            button.innerText = "音声に変換"; //convert to speech
        }
    })
};

button.addEventListener('click', textToSpeech)