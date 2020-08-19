const socket = io.connect('/');


const midiInputSelect = document.getElementById('midi-inputs');
const infoDiv = document.getElementById('info');

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
    infoDiv.innerHTML = ('WebMidi could not be enabled', err);
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

// inc = 0;
// intervalChange = null;

// function sendIncrement() {  
//   console.log(Date.now())
//   socket.emit('midiTransport-1', {
//     channel: 1,
//     cc: 2,
//     value: inc,
//     time: Date.now()
//   });  
// }

// function stopClock() {
//   clearInterval(intervalChange);
// }

// function startClock() {
//   let clockSpeed = document.getElementById('quantity').value;
//   intervalChange = setInterval(sendIncrement, ((1000 / clockSpeed)) * 60);
// }



const buttonBroadcast = document.getElementById('broadcaster');

// setInterval(function() { buttonBroadcast.click() }, 20);
buttonBroadcast.addEventListener('click', function (e) {
  e.preventDefault();
  // Listen to control change message on all channels
  input.addListener('controlchange', "all",
    function (e) {
      // console.log(`Chan: ${e.channel} / CC: ${e.data[1]} / Value: ${e.data[2]} / ${e.timestamp}`);
      socket.emit('midiTransport-1', {
        channel: e.channel,
        cc: e.data[1],
        value: e.data[2],
        time: e.timestamp
      });
    }
  );
  socket.on('midiTransport-1', function (data) {
    infoDiv.innerHTML = (`Chan: ${data.channel} / CC: ${data.cc} / Value: ${data.value}`);
  })
})