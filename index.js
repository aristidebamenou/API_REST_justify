const express = require('express')
const morgan = require('morgan')
const bodyParser = require('body-parser')

app = express()

app.use(morgan('dev'))
app.use(bodyParser.text())


app.post('/api/justify', (request, response)=>{
    response.setHeader('Content-Type', 'text/plain');

    response.send(justify(request.body))
})

app.listen(8000, ()=>console.log('Started on port 8080'))

var justify= (text)=>{

    var words = text.split(' ')
    var lines = []
    var counter =0

    lines[counter] = []

    words.forEach(word => {
        if(lines[counter].join(' ').length == 0 && word.length <= 80) {
			lines[counter].push(word);
		}
		else if((lines[counter].join(' ').length + word.length + 1) <= 80) {
			lines[counter].push(word);
		}
		else {
			lines[++counter] = [];
			lines[counter].push(word);
		}
    });

    for(var x in lines) {

		var line = lines[x].join(" ");
		var spaces = 80 - line.length;

		
		if( x == lines.length - 1) {
			lines[x] = appendSpaces(line, spaces);
		}
		
		else if(lines[x].length == 1) {
			var word = lines[x].join("");
			spaces = 80 - word.length;
			lines[x] = appendSpaces(word, spaces);
		}
		else {
			var w = lines[x];
			var gaps = w.length - 1;
			spaces = 80 - w.join("").length;
			var extraSpaces = spaces % gaps;
			var spacesPerGap = Math.floor(spaces / gaps);

			line = "";
			for(var j = 0; j < w.length; j++) {
				
				var addOneSpace = false;
				if(extraSpaces > 0) {
					addOneSpace = true;
					extraSpaces--;
				}
				var filler = spacesPerGap + (addOneSpace ? 1 : 0);
				if (j == w.length - 1) {
					line += w[j];
				}
				else {
					line += appendSpaces(w[j], filler);
				}
			}

			lines[x] = line;
		}
	}

    return lines.join('\r\n')
}

function appendSpaces(str, n) {
    for(var x = 0; x < n; x++ ) {
        str += " ";
    }
    return str;
}