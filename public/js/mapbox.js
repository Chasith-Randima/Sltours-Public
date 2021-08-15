
export const displayMap = (locations) => {
  // {/* <div id='map' style='width: 400px; height: 300px;'></div> */}

  mapboxgl.accessToken = 'pk.eyJ1IjoicmFuZGltYSIsImEiOiJja2JobDEzM2owNGJxMnN0ZGZwazkwYzVrIn0.odQRCv821tcj9XI_yO6BKQ';
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/randima/ckbhmrw9f0nre1is1zm7fu90k',
    scrollZoom:false
    // center:[-118.2437,34.0522],
    // zoom:4
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach(loc => {

    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker({
        element:el,
        anchor:'bottom'
    }).setLngLat(loc.coordinates).addTo(map);

    new mapboxgl.Popup({offset:30}).setLngLat(loc.coordinates).setHTML(`<p>Day${loc.day}:${loc.description}</p>`).addTo(map);

    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds,{
    padding:{
        top:200,
        bottom:150,
        left:100,
        right:100
    }
  });



}
