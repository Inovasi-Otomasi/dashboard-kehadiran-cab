import HomeIcon from '@mui/icons-material/Home';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import MapIcon from '@mui/icons-material/Map';
 
export const navData = [
    {
        id: 0,
        icon: <HomeIcon/>,
        text: "Dashboard",
        link: "/"
    },
    {
        id: 1,
        icon: <AccessTimeIcon/>,
        text: "Shifts",
        link: "/shift"
    },
    {
        id: 2,
        icon: <GroupIcon/>,
        text: "Drivers",
        link: "/driver"
    },
    {
        id: 3,
        icon: <MapIcon/>,
        text: "Routes",
        link: "/location"
    }
]