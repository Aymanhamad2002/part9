import { OccupationalHealthcareEntry } from "../../types";
import { Card,Box,Typography,CardContent, IconButton } from "@mui/material";
import WorkIcon from '@mui/icons-material/Work';

interface Props {
    entry:OccupationalHealthcareEntry
}
const Occupational = ({entry}:Props) =>{
    return (
        <Card sx={{ marginBottom: 2, padding: 2 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="body2">{entry.date}</Typography>
            <IconButton size="small">
              <WorkIcon />
              <Typography variant="body2">{entry.employerName}</Typography>
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
export default Occupational;
