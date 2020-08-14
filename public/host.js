const socket = io.connect('/');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    const output = WebMidi.getOutputByName('to Max 1');
    // output.playNote('C3');
  }
});

let midiChannel = 1;
let ccGuy = 31;
let valueGuy = 127;

const sliderGuy = document.getElementById('myRange');
sliderGuy.addEventListener('input', function(e) {
  e.preventDefault();
  console.log(sliderGuy.value);  
  socket.emit('midiTransport', {
    channel: midiChannel,
    cc: ccGuy,
    value: sliderGuy.value
  });
})



const buttonBroadcast = document.getElementById('broadcaster');

// setInterval(function() { buttonBroadcast.click() }, 20);



buttonBroadcast.addEventListener('click', function(e) {
  e.preventDefault();
  console.log(midiChannel, ccGuy, valueGuy);    
  socket.emit('midiTransport', {
    channel: midiChannel,
    cc: ccGuy,
    value: valueGuy
  });
})