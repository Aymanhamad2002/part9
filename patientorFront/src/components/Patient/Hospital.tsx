import { HospitalEntry } from "../../types";
import { Card,Box,Typography,CardContent, IconButton } from "@mui/material";
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
const Hospital = ({entry} : {entry:HospitalEntry}) =>{
    return (
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">{entry.date}</Typography>
            <IconButton size="small">
              <LocalHospitalIcon />
            </IconButton>
          </Box>
          <CardContent>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {entry.description}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
             
              <Typography variant="body2">diagnoseBy{":  " + entry.specialist}</Typography>
            </Box>
          </CardContent>
        </Card>
      );
    };
export default Hospital;
