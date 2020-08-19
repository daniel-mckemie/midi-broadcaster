const socket = io.connect('/');

let infoDiv = document.getElementById('info');

const midiOutputSelect = document.getElementById('midi-transports');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    const transportOptions = ['midiTransport-1', 'midiTransport-2'];

    for (index in transportOptions) {      
      midiOutputSelect[midiOutputSelect.length] = new Option(transportOptions[index], index);
    }

    outputSocket = null;

    function setWebSocket() {
      console.log(midiOutputSelect.options[midiOutputSelect.selectedIndex].text)
      return outputSocket = midiOutputSelect.options[midiOutputSelect.selectedIndex].text;
    }
    midiOutputSelect.addEventListener('change', setWebSocket)

    
  }
});



// Slider objects

let slidersId = document.querySelectorAll('#sliders');
let sliderDivs = document.querySelectorAll('.slider-div');
let slider = document.querySelector('#sliderr');
slider.style.display = 'none'; // Hide initial slider on load 

// Creates slider.  Eventually the PROMPTS for sound properties will be moved into
// their own functions.  Which will then in turn be sent to yet another function which
// builds all sounds.  (Probably?)
let sliderCounter = 0;

function createSlider() {
  slider.style.display = 'block';

  let newSliderDiv = sliderDivs[0].cloneNode(true);
  slidersId[0].append(newSliderDiv);
  let newSliderId = slidersId[0].id.slice(0, -1) + sliderCounter;
  newSliderDiv.childNodes[1].id = newSliderId;

  sliderSpeed = prompt('Speed of slider (in milliseconds)');
  freqs[sliderCounter] = prompt('Frequency of oscillator note (in Hz)');

  slider.style.display = 'none';


  setInterval(function () {
    moveSlider(newSliderId)
  }, sliderSpeed);
  sliderCounter++
}




// midiChannel = 1;
// ccGuy = 31;
// let valueGuy;

// function setSliderAttributes() {
//   console.log('dudem');
//   return midiChannel = document.getElementById('channel').value
//   // ccGuy = document.getElementById('cc').value

// }

// const sliderGuy = document.getElementById('myRange');
// sliderGuy.addEventListener('input', function (e) {
//   console.log(midiChannel, ccGuy)
//   e.preventDefault();
//   socket.emit(outputSocket, {
//     channel: midiChannel,
//     cc: ccGuy,
//     value: parseInt(sliderGuy.value)
//   });
//   socket.on(outputSocket, function (data) {
//     infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
//   })
// })


