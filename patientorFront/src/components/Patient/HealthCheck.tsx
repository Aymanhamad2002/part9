import { HealthCheckEntry } from "../../types";
import { Card,Box,Typography,CardContent, IconButton } from "@mui/material";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';

interface Props{
    entry:HealthCheckEntry;
}
const HealthCheck =({entry}:Props) =>{
    return (
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">{entry.date}</Typography>
            <IconButton size="small">
              <MedicalServicesIcon />
            </IconButton>
          </Box>
          <CardContent>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              {entry.description}
            </Typography>
            <Typography variant="body1" sx={{ fontStyle: 'italic' }}>
              HealthCheckRate: {entry.healthCheckRating}
            </Typography>
            <Box display="flex" alignItems="center" mt={1}>
             
              <Typography variant="body2">diagnoseBy{":  " + entry.specialist}</Typography>
            </Box>
          </CardContent>
        </Card>
      );
    };
export default HealthCheck;

