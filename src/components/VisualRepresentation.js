import { Box, Typography,Stack } from '@mui/material'
import React from 'react'
import theme from '../styles/theme'

const main = {
    paddingBottom: theme.spacing(5),
    textAlign: "center"
}
const yearSection = {
    marginY: theme.spacing(2)
}
const yearSectionTitle = {
    mt: 5
}
const finField = {
    textAlign: 'left',
    whiteSpace: 'nowrap'
}
const finValue= {
    fontWeight: 500
}

const VisualRepresentation = ({data, unit = 'DKK' }) => {
    return (<Box sx={main}>
                <Typography variant='h5' >Extracted data</Typography>
        
                {Object.keys(data).sort((a, b) =>  parseInt(b) - parseInt(a)).map(year => (<>
                    <Typography variant='h6'  sx={yearSectionTitle}>{year}</Typography>
                    <Stack sx={yearSection} justifyContent='flex-start'>
                        {Object.entries(data[year]).map(([key, value]) =>
                            <Stack direction='row'>
                                <Typography sx={finField}>{key}:&nbsp;&nbsp;</Typography>
                                <Typography sx={finValue}>{value} {unit}</Typography>
                            </Stack>)
                        }
                    </Stack>
                </>))}
            </Box>)
}

export default VisualRepresentation