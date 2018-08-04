const express = require('express');
const http = require('http')
const path = require('path');

const app = express();

app.use(express.static(path.join(__dirname, 'dist/client')));

app.get('/.well-known/acme-challenge/nWNWMV-GII2Ak3U6QHhQLk1B_GeHS9KDEXFK6J90r_U', (req, res)=>{
  res.send('nWNWMV-GII2Ak3U6QHhQLk1B_GeHS9KDEXFK6J90r_U.r3cuzAVFNKO-N1Nx4Zczz9QxsJTsZf1Gbo39g7ydh8U');
 })

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/client/index.html'));
});


const port = process.env.PORT || 3000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port, () => console.log('running'));