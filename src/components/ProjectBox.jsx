
import { Box } from "@mui/material";
import { Stack } from "@mui/material";


const ProjectBox = ({image, topText, bottomText, positionText, linkText, toolText}) => {
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
            <div>
              <Box 
                sx={{ 
                  width: "15vh", 
                  height: "19vh",
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
                <Stack spacing={0}>
                  <div style={{ fontSize : "3vh", margin:"1vh", marginBottom: "0vh", fontWeight: '600', color: 'rgb(0, 158, 158)' }}>{topText}</div>
                  <div style={{ wordWrap: 'normal' , fontSize : "2vh", marginRight:"2vh",  marginLeft:"1vh", marginTop: "0vh", fontWeight: '600', color: 'rgb(0, 158, 158)' }}> {bottomText}</div>
                  < div style={{ wordWrap: 'normal' , fontSize : "1.5vh", marginRight:"2vh",    marginLeft:"3vh", marginTop: "0vh", fontWeight: '400', color: 'rgb(0, 158, 158)' }}> {positionText}</div>
                  <div style={{ wordWrap: 'normal' , fontSize : "1.5vh", marginRight:"2vh",    marginLeft:"3vh", marginTop: "0vh", fontWeight: '400', color: 'rgb(0, 158, 158)' }}> {toolText}</div>
                  <div style={{ wordWrap: 'normal' , fontSize : "1.5vh", marginRight:"2vh",  marginLeft:"3vh", marginTop: "0vh", fontWeight: '400', color: 'rgb(0, 158, 158)' }}> {linkText}</div>
                
                </Stack>
              </Stack>
            </Box>
          </Box>
);

};

export default ProjectBox;