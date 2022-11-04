import { Box, Typography, Stack, Button } from '@mui/material'
import React from 'react'
import theme from '../styles/theme'

const main = {
    paddingBottom: theme.spacing(5),
    textAlign: "center",
    width: '500px',
    '& > h5': {
        width: '500px',
        display: 'block',
        overflow: "hidden",
        whiteSpace: 'nowrap',
        textOverflow: "ellipsis"
    }
}
const yearSection = {
    marginY: theme.spacing(2)
}
const yearSectionTitle = {
    mt: 5
}
const finField = {
    textAlign: 'left',
    maxWidth: '500px',
    overflow: "hidden",
        whiteSpace: 'nowrap',
        textOverflow: "ellipsis"
}
const finValue = {
    fontWeight: 500,
    width: 'max-content'
}
const fileTitle = {
    marginBottom: theme.spacing(2)
}

const downloadFn = () => { console.log('Downloading...') }


const VisualRepresentation = ({ response, title }) => {

    const { financial_figures: data, unit} = response

    return (<Stack sx={main} justifyContent="flex-start" alignItems="center">
        <Typography variant='h5' >Extracted data</Typography>
        <Typography variant='h5' sx={fileTitle}>{title}</Typography>
        {/* <Button variant="outlined" onClick={downloadFn}>Download</Button> */}

        {Object.keys(data).sort((a, b) => parseInt(b) - parseInt(a)).map(year => (<Box key={year}>
            <Typography variant='h6' sx={yearSectionTitle}>{year}</Typography>
            <Stack sx={yearSection} justifyContent='flex-start'>
                {Object.entries(data[year]).map(([key, value]) =>
                    <Stack direction='row' justifyContent="space-between" key={key}>
                        <Typography sx={finField}>{key}:&nbsp;&nbsp;</Typography>
                        <Typography sx={finValue}>{value} {unit ?? 'DKK'}</Typography>
                    </Stack>)
                }
            </Stack>
        </Box>))}
    </Stack>)
}

export default VisualRepresentation