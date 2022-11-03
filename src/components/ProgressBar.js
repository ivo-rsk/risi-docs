import React from 'react'
import { LinearProgress, Box } from '@mui/material';




const ProgressBar = ({ percentage, isFileUploading }) => {

    const bar = {
        visibility: isFileUploading ? 'visible' : 'hidden'
    }

    return (
        <Box sx={ bar }>
            <LinearProgress variant="determinate" value={percentage} />
        </Box>
  )
}

export default ProgressBar