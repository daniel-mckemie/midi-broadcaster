const socket = io.connect('/');


const midiInputSelect = document.getElementById('midi-inputs');
const infoDiv = document.getElementById('info');

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



const buttonBroadcast = document.getElementById('broadcaster');

// setInterval(function() { buttonBroadcast.click() }, 20);

buttonBroadcast.addEventListener('click', function (e) {
  e.preventDefault();
  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      // console.log(`Chan: ${e.channel} / CC: ${e.data[1]} / Value: ${e.data[2]}`);
      socket.emit('midiTransport-2', {
        channel: e.channel,
        cc: e.data[1],
        value: e.data[2]
      });
    }
  );
  socket.on('midiTransport-2', function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})