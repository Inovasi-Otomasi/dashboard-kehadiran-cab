import L from 'leaflet'
import { createControlComponent } from '@react-leaflet/core'
import "leaflet-routing-machine"

const createRoutineMachineLayer = (props) => {
    const instance = L.Routing.control({
      waypoints: [
        L.latLng(-6.402484, 106.794243),
        L.latLng(-6.24055841714706, 106.79858973640994)
      ],
      lineOptions: {
        styles: [{ color: "#6FA1EC", weight: 6}]
      },
      show: false,
      addWaypoints: false,
      routeWhileDragging: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: true
    });
  
    return instance;
  };
  
  const TrayekMapRoute = createControlComponent(createRoutineMachineLayer);
  
  export default TrayekMapRoute;
  