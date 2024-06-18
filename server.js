const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const fs = require('fs');
const options = {
  key: fs.readFileSync('D:/MAP CIVIL_PROTECTION/js/server-key.pem'),
  cert: fs.readFileSync('D:/MAP CIVIL_PROTECTION/js/server.pem')
};
let WSServer = require('ws').Server;
let server = require('https').createServer(options);
let express = require('express');
let cllerid=0;
let https_port=443;
// Create web socket server on top of a regular http server
let wss = new WSServer({
  server: server
});
//let app = express();
let bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(express.static(__dirname));
// Let's create the regular HTTP request and response
app.get('/', function(req, res) {
  console.log('Get interface');
  fs.createReadStream('./InterfaceCivilProtection').pipe(res);
});
wss.on('connection', function connection(ws) { 
	
	ws.on('message', function incoming(message) {
		let msg=JSON.parse(message);
		console.log("Message : "+msg.src+'>>'+msg.dst);
		ws.send(message);
	});
	ws.on("close", () => { 
		console.log('http/ws server closed' );
	});
});
server.listen(https_port, function() {
  console.log('http/ws server listening on ' +https_port);
});
// Also mount the app here
server.on('request', app);

const app = express();
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Disaster',
    password: '1234',
    port: 5432
});


const port = process.env.PORT || 3000;

app.use(bodyParser.json());
const cors = require('cors');
app.use(cors());

await client.connect();

app.post('', async (req, res) => {
    const geojson = req.body;
    const client = new Client({
      user: 'postgres',  
      host: 'localhost',
      database: 'Disaster',  
      password: '1234',  
      port: 5432,
  });

  await client.connect();

    try {
        const query = `
            'INSERT INTO Disaster (type, propreties, geom)
            VALUES ($1, $2, ST_SetSRID(ST_GeomFromGeoJSON($3), 4326), $4)
            RETURNING id';
        `;
        
        const values = [
            geojson.geometry.type,
            JSON.stringify(geojson.properties),
            JSON.stringify(geojson.geom)
        ];
        
        const result = await pool.query(query, values);
        res.status(200).json({ id: result.rows[0].id });
    } catch (err) {
        console.error('Error saving GeoJSON to database:', err);
        res.status(500).json({ error: 'Failed to save GeoJSON' });
        await client.end();
    }
});
 
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});