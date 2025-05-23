import { Box } from "@mui/material";
import { Stack } from "@mui/material";
import Link from "@mui/material/Link";

const ResumeBox = ({topText, linkUrl}) => {
return(
<Box sx={{ display: 'flex', height: 'auto', borderRadius: '16px' }}>
            <Box sx={{ 
              flex: 1, // Takes up all available space
              bgcolor: 'rgb(61, 61, 61)',
              borderRadius: '16px',
              padding : "3vh",
              boxShadow: 'inset 0 0 0 1vh transparent',
              background: `
                linear-gradient(rgb(255, 255, 255), rgb(163, 241, 255)) padding-box,
                linear-gradient(45deg, rgb(33, 243, 208) 30%, #22ff47 90%) border-box
              `,
              border: '1vh solid transparent',
            }}>
              <Stack spacing={0} direction="row" >

                <Stack spacing={0}>
                  <div style={{ fontSize : "3vh", margin:"1vh", fontWeight: '600', color: 'rgb(0, 158, 158)' }}>{topText}</div>
                 <Link 
                   href={linkUrl}
                   target="_blank"
                   rel="noopener noreferrer"
                   style={{ 
                     wordWrap: 'normal', 
                     fontSize: "2vh", 
                     marginRight:"2vh",  
                     marginLeft:"1vh", 
                     marginTop: "0vh", 
                     fontWeight: '600', 
                     color: 'rgb(0, 158, 158)',
                     textDecoration: 'underline',
                     cursor: 'pointer'
                   }}
                 >
                    Click here to review my resume
                 </Link>
                </Stack>
              </Stack>
            </Box>
          </Box>
);

};

export default ResumeBox;