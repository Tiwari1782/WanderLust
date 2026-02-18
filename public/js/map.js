mapboxgl.accessToken = mapToken;

const coordinates = listing.geometry.coordinates;

if (!coordinates || coordinates.length !== 2) {
  console.log("Invalid coordinates:", coordinates);
} else {
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/streets-v12",
    center: coordinates,
    zoom: 9,
  });

  // Popup (hover)
  const popup = new mapboxgl.Popup({
    offset: 25,
    closeButton: false,
    closeOnClick: false,
  }).setHTML(
    `<h4>${listing.location}</h4><p>Exact location provided after booking</p>`
  );

  // Marker
  const marker = new mapboxgl.Marker({ color: "red" })
    .setLngLat(coordinates)
    .addTo(map);

  // Show popup on hover
  marker.getElement().addEventListener("mouseenter", () => {
    popup.setLngLat(coordinates).addTo(map);
  });

  // Hide popup when mouse leaves
  marker.getElement().addEventListener("mouseleave", () => {
    popup.remove();
  });
}
