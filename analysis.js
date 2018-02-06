var process = require('child_process');
function analysis(leaf, color, res) {
    var spw = process.spawn('sh', ['folia.sh', leaf, color,'/tmp/'+leaf+color +'.png','/dev/null'])
    //var spw = process.spawn('ping', ['-c', '5', '127.0.0.1']),

    str=""
    spw.stdout.on('data', (data) => {
      str += data.toString();

      // just so we can see the server is doing something

      // Flush out line by line.
      var lines = str.split("\n");
      for(var i in lines) {
          if(i == lines.length - 1) {
              str = lines[i];
          } else{
              // Note: The double-newline is *required*
              res.write('data: ' + lines[i] + "\n\n");
          }
      }
    });

    spw.stderr.on('data', (data) => {
      console.log('stderr: ${data}');
    });

    spw.on('close', (code) => {
      res.end(str);
    });

}

module.exports = { analysis: analysis }
