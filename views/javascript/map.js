mapboxgl.accessToken = 'pk.eyJ1IjoiY2Fwcmlwb3QiLCJhIjoiY2pjMDJqcDhsMDQ2MzJ4bW85MTR0YXBzYiJ9.Ag9mIZTDONNN9JdN2kW76g';
let map = new mapboxgl.Map({
  container: 'map',
  maxZoom: 5.5,
  minZoom: 1.8,
  style: 'mapbox://styles/mapbox/light-v9',
  center: [-115.36957574368233, 50.732480262447524],
  zoom: 2.850019725398168,
});

map.on('load', () => {
  var layers = map.getStyle().layers;
  // Find the index of the first symbol layer in the map style
  let firstSymbolId;
  for (var i = 0; i < layers.length; i++) {
    if (layers[i].type === 'symbol') {
      firstSymbolId = layers[i].id;
      break;
    }
  }

  let statesLayer = map.addLayer({
    id: 'us-states',
    type: 'fill',
    source: {
      type: 'geojson',
      data: statesData,
    },
    paint: {
      'fill-color': {
        property: 'numOfDisasters',
        stops: [
          [0, '#d3d3d3'],
          [5, '#56D7FF'],
          [10, '#3DBEFF'],
          [20, '#23A4FF'],
          [50, '#0A8BE6'],
          [100, '#0071CC'],
          [200, '#0058B3'],
          [500, '#003E99'],
        ],
      },
      'fill-opacity': 0.75,
    },
  }, firstSymbolId);

  var layers = ['0-5', '5-10', '10-20', '20-50', '50-100', '100-200', '200-500', '500+'];
  let colors = ['#d3d3d3', '#56D7FF', '#3DBEFF', '#23A4FF', '#0A8BE6', '#0071CC', '#0058B3BD0026', '#003E99'];
  for (i = 0; i < layers.length; i++) {
    let layer = layers[i];
    let color = colors[i];
    let item = document.createElement('div');
    let key = document.createElement('span');
    key.className = 'legend-key';
    key.style.backgroundColor = color;

    let value = document.createElement('span');
    value.innerHTML = layer;
    item.appendChild(key);
    item.appendChild(value);
    legend.appendChild(item);
  }
});

map.on('click', 'us-states', (e) => {
  let coordinates = almostFlatten(e.features[0].geometry.coordinates);
  let bounds = new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]);
  coordinates.forEach((coord) => {
    bounds.extend(coord);
  });

  map.fitBounds(bounds, {
    padding: 100,
  });
});


function almostFlatten(arr) {
  return arr.reduce((flat, toFlatten) => {
    return flat.concat(Array.isArray(toFlatten[0]) ? almostFlatten(toFlatten) : [toFlatten]);
  }, []);
}
