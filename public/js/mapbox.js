
const mapbox = document.getElementById('map')


if(mapbox){

  var body = document.querySelector('body');

  body.onload = function(){
    const location = JSON.parse(mapbox.dataset.locations);

  mapboxgl.accessToken = 'pk.eyJ1IjoiYXVzdGluZmFiaWFuIiwiYSI6ImNsNTN4Mjl1MDB0amQzZXJ4cmoxbTU1aXAifQ.2CyD3OaN_rJoaE7MEZ9z3Q';
const map = new mapboxgl.Map({
container: 'map', // container ID
style: 'mapbox://styles/austinfabian/cl7or9v4f005j14lkp0hwlxlr', // style URL
center: location.coordinates, // starting position [lng, lat]
scrollZoom:false,
zoom: 10.4, // starting zoom
projection: 'globe', // display the map as a 3D globe
});
    map.on('style.load', () => {
    map.setFog({}); // Set the default atmosphere style
});

const bounds = new mapboxgl.LngLatBounds();

    // Add marker
    new mapboxgl.Marker({
      anchor: 'bottom'
    })
      .setLngLat(location.coordinates)
      .addTo(map);

    // Add popup
    new mapboxgl.Popup({
      offset: 0
    })
      .setLngLat(location.coordinates)
      .setHTML(`<p class='location'>${location.description}</p>`)
      .addTo(map);
  }

  
 }

  

