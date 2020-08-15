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

buttonBroadcast.addEventListener('click', function(e) {
  e.preventDefault();
  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      console.log(`Chan: ${e.channel} / CC: ${e.data[1]} / Value: ${e.data[2]} / ${e.timestamp}`);
      socket.emit('midiTransport-1', {
        channel: e.channel,
        cc: e.data[1],        
        value: e.data[2]
      });
    }
  );
  
  inc = 0;
  let intervalChange = setInterval(sendIncrement, 50);

  function sendIncrement() {        
    if (inc < 127) {
    socket.emit('midiTransport-1', {
      channel: 1,
      cc: 2,
      value: inc
    });
    inc++;
  } else {
    stopFunction();
  }
}

  function stopFunction() {
    clearInterval(intervalChange);
  }

  
  
  sendIncrement();

  

  socket.on('midiTransport-1', function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})