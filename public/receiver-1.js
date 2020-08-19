const socket = io.connect('/');

const infoDiv = document.getElementById('info');

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
    
    socket.on('midiTransport-1', function (data) {
      // console.log(`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value} / ${data.time}`)
      infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
      output.sendControlChange(data.cc, data.value, data.channel);      
    })
  }
});






