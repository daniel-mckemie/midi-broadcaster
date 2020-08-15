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


midiChannel = 1;
ccGuy = 31;
let valueGuy;

function setSliderAttributes(chan, cc) {
  console.log('dudem')
  midiChannel = chan;
  ccGuy = cc;


}

const sliderGuy = document.getElementById('myRange');
sliderGuy.addEventListener('input', function (e) {
  e.preventDefault();
  socket.emit(outputSocket, {
    channel: midiChannel,
    cc: ccGuy,
    value: parseInt(sliderGuy.value)
  });
  socket.on(outputSocket, function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})


