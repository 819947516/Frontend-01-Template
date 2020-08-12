const fsevents = require('fsevents');
const { exec } = require('child_process');
exec('http-server')

const stop = fsevents.watch(__dirname, (path, flags, id) => {
  const info = fsevents.getInfo(path, flags, id);
//   console.log(info)
  console.log('webpack')
  exec('webpack')
  stop(); // To end observation
}); // To start observation


// var watchman = require('fb-watchman');
// var client = new watchman.Client();
// client.capabilityCheck({optional:[], required:['relative_root']},
//   function (error, resp) {
//     if (error) {
//       // error will be an Error object if the watchman service is not
//       // installed, or if any of the names listed in the `required`
//       // array are not supported by the server
//       console.error(error);
//     }
//     // resp will be an extended version response:
//     // {'version': '3.8.0', 'capabilities': {'relative_root': true}}
//     console.log(resp);
//   });