import { MapContainer, TileLayer } from "react-leaflet";

const center = [46.61651025171428, 2.3325928033416217];

function Map() {
  return (
    <MapContainer center={center} style={{ width: "100vh", height: "100vh" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
