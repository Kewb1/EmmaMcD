
import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import Link from "@mui/material/Link";

const LinkBox = ({image, linkUrl}) => {
return(
<Box sx={{ display: 'flex', height: 'auto', borderRadius: '16px' }}>
            <Box sx={{ 
              flex: 1, // Takes up all available space
              bgcolor: 'rgb(61, 61, 61)',
              borderRadius: '16px',
              padding : "0vh",
              boxShadow: 'inset 0 0 0 1vh transparent',
              background: `
                linear-gradient(rgb(255, 255, 255), rgb(163, 241, 255)) padding-box,
                linear-gradient(45deg, rgb(33, 243, 208) 30%, #22ff47 90%) border-box
              `,
              border: '1vh solid transparent',
            }}>
              <Stack spacing={0} direction="row" >
            <Link 
             href={linkUrl}
             target="_blank"
             rel="noopener noreferrer"
             style={{ 
             wordWrap: 'normal',             
             fontWeight: '600', 
             color: 'rgb(0, 158, 158)',
             textDecoration: 'underline',
             cursor: 'pointer'
             }}>
                                
            <div>
              <Box 
                sx={{ 
                  width: "15vh", 
                  height: "15vh",
                  borderRadius: '7px',
                  backgroundImage: `url(${image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat'
                }}
                role="img"
                aria-label="Description"
              />
              </div>
              
              </Link>
                
              </Stack>
            </Box>
          </Box>
);

};

export default LinkBox;