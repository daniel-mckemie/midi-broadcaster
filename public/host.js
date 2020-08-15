const socket = io.connect('/');


const midiInputSelect = document.getElementById('midi-inputs');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    for (index in WebMidi.inputs) {
      midiInputSelect.options[midiInputSelect.options.length] = new Option(WebMidi.inputs[index].name, index);
    }

    input = null;

    function getMidiInput() {
      console.log(midiInputSelect.options[midiInputSelect.selectedIndex].text);
      return input = WebMidi.getInputByName(midiInputSelect.options[midiInputSelect.selectedIndex].text);
    }
    midiInputSelect.addEventListener('change', getMidiInput)
    
    

        
  }
});

let midiChannel = 1;
let ccGuy = 31;
let valueGuy = 127;

const sliderGuy = document.getElementById('myRange');
sliderGuy.addEventListener('input', function(e) {
  e.preventDefault();   
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
  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log(e.controller.number);
      socket.emit('midiTransport', {
        channel: e.channel,
        controller: e.controller.number,
        cc: e.data[1],
        value: e.data[2]
      });
    }
  );
})