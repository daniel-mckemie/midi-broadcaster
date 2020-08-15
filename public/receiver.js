const socket = io.connect('/');

let infoDiv = document.getElementById('info');

const midiOutputSelect = document.getElementById('midi-outputs');


WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    for (index in WebMidi.outputs) {
      midiOutputSelect.options[midiOutputSelect.options.length] = new Option(WebMidi.outputs[index].name, index);
    }
    
    output = null;
    function getMidiOutput() {      
      return output = WebMidi.getOutputByName(midiOutputSelect.options[midiOutputSelect.selectedIndex].text);            
    }
    midiOutputSelect.addEventListener('change', getMidiOutput)
    
    socket.on('midiTransport', function (data) {
      console.log(data.controller, data.value, data.channel)
      infoDiv.innerHTML = (data.value);
      output.sendControlChange(data.controller, data.value, data.channel);      
    })
  }
});



socket.on('midiTransport', function(data) {
  infoDiv.innerHTML = (data.channel, data.cc, data.value);
})




