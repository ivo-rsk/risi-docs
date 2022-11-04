import { Box, Typography, Stack } from '@mui/material';
import FileUpload from './components/FileUploader';
import theme from './styles/theme';


const main = { minHeight: '100vh', backgroundColor: '#F6FBFC', color: '#212529', fontFamily: 'Monsterrat', fontWeight: 600, lineHeight: '35px' }
const content = {padding: theme.spacing(5)}
const title = {wordSpacing: '-16px'}

function App() {
  return (
    <Stack sx={main}
      justifyContent="start"
      alignItems="center" 
      spacing={5}
    >
      <Stack direction='row' spacing={1} sx={content}>
       <Box
          component="img"
          sx={{
            height: 60,
            width: 50,
          }}
          src="/risika-shield.svg"
        />
        <Typography variant='h3' sx={title}> Risi Docs</Typography>
      </Stack>
      <FileUpload />
    </Stack>
  );
}

export default App;
