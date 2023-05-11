// import { useEffect, useState } from "react";
// import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
// import axios from "axios";

// const center = [46.61651025171428, 2.3325928033416217];

// function Map() {
//   const [events, setEvents] = useState([]);

//   useEffect(() => {
//     axios
//       .get(`${import.meta.env.VITE_BACKEND_URL}/api/events/`)
//       .then((response) => {
//         const geocodingPromises = response.data.map((event) => {
//           return axios
//             .get(
//               `https://geocode.xyz/${encodeURIComponent(event.address)}?json=1`
//             )
//             .then((result) => {
//               const { latt, longt } = result.data;
//               const lat = parseFloat(latt);
//               const lng = parseFloat(longt);
//               return { ...event, lat, lng };
//             });
//         });
//         Promise.all(geocodingPromises)
//           .then((geocodedEvents) => setEvents(geocodedEvents))
//           .catch((error) => console.error(error));
//       })
//       .catch((error) => console.error(error));
//   }, []);

//   return (
//     <MapContainer
//       center={center}
//       zoom={6}
//       style={{ width: "100%", height: "100vh" }}
//     >
//       <TileLayer
//         attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//         url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//       />
//       {events.map((event) => (
//         <Marker key={event.id} position={[event.lat, event.lng]}>
//           <Popup>
//             <strong>{event.title}</strong>
//             <br />
//             {event.description}
//           </Popup>
//         </Marker>
//       ))}
//     </MapContainer>
//   );
// }

// export default Map;
