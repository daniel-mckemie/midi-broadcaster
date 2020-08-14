const socket = io.connect('/');

let infoDiv = document.getElementById('info');

// WebMidi.enable(function (err) {
//   if (err) {
//     console.log('WebMidi could not be enabled.', err);
//   } else {
//     console.log('WedMidi enabled!');
//     console.log(WebMidi.inputs);
//     console.log(WebMidi.outputs);

//     const input = WebMidi.getInputByName('from Max 1');

//     input.addListener('noteon', "all",
//       function (e) {
//         console.log("Received 'noteon' message (" + e.note.name + e.note.octave + ").");
        
//       }
//     );
//   }  
// });

WebMidi.enable(function (err) {
  if (err) {
    console.log('WebMidi could not be enabled.', err);
  } else {
    console.log('WedMidi enabled!');
    console.log(WebMidi.inputs);
    console.log(WebMidi.outputs);

    const output = WebMidi.getOutputByName('to Max 1');
    socket.on('midiTransport', function (data) {
      infoDiv.innerHTML = (data.value);
      output.playNote(data.value, data.channel);
      output.stopNote(data.value, data.channel);
    })
  }
});



socket.on('midiTransport', function(data) {
  infoDiv.innerHTML = (data.channel, data.cc, data.value);
})




