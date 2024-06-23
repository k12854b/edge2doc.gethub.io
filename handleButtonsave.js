function saveDrawnFeatures() {
  const drawnItems = fDrawGroup.getLayers();
  drawnItems.forEach(layer => {
    const geoJson = layer.toGeoJSON();

    // Retrieve the style settings from the layer itself
    const styleSettings = layer.options;
    
    const properties = {
      style: styleSettings
    };

    const geometry = geoJson.geometry;

    const geoJsonData = {
      "type": "Feature",
      "properties": properties,
      "geometry": geometry
    };

    sendGeoJsonToServer(geoJsonData);
  });
}
//socket structure 
const socket = io('http://localhost:2000');

socket.on('connect', () => {
  console.log('Connected to server');
});

socket.on('receive-geojson', (geoJsonData) => {
  console.log('New GeoJSON data received', geoJsonData);
  addGeoJsonToMap(geoJsonData);
});

function sendGeoJsonToServer(geoJsonData) {
  fetch('http://localhost:2000/save-geojson', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(geoJsonData)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => console.log('Success:', data))
  .catch((error) => console.error('Error:', error));
}
