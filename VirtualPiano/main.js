let animateKey = (key)=>{
    key.classList.add('active')
    setTimeout(() => {
        key.classList.remove('active')
    }, 100);
}

let playSound = (key)=>{
    let audioFile = `./tunes/${key.dataset.key}.wav`
    let audio = new Audio(audioFile);
    audio.play()
}


document.querySelectorAll('.key').forEach((key)=>{
    key.addEventListener('click', (button)=>{
        animateKey(key);
        playSound(key);
    })
})

document.addEventListener('keypress', (event)=>{
    try {
        let key = document.querySelector(`[data-key='${event.key}'`);
        animateKey(key);
        playSound(key);
      }catch(err) {
        // if any error, Code throws the error
      }
})
