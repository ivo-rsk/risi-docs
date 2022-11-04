import React, { useState } from 'react';
import axios from 'axios';
import { Button, IconButton, Stack, Typography, CircularProgress, Box } from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import theme from '../styles/theme';
import ProgressBar from './ProgressBar'
import VisualRepresentation from './VisualRepresentation'
import mockRes from '../MOCK_RESPONSE.json'

const docButton = {
  width: '400px',
  height: '150px',
  borderRadius: '5px',
  border: `3px solid ${theme.palette.primary.main}`,
  display: "flex",
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
}

const titleContainer = {
  width: '100%',
  '& > p': {
    display: 'block',
    overflow: "hidden",
    whiteSpace: 'nowrap',
    textOverflow: "ellipsis"
  }
}

const processBtn = {
  '&:hover': {
    cursor: "initial"
  }
}

const fileUploadEndpoint = 'http://10.0.0.51:5000/upload_file'

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [isLoading, setIsLoading] = useState(false)
  const [resultTitle, setResultTitle] = useState("")

  const onChange = e => {
    const fileList = e.target.files

    if (fileList.length === 0) {
      setFile("")
      setFilename("")
      return
    }
    setFile(e.target.files[0])
    setFilename(e.target.files[0].name)
  };


  const onSubmit = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);

    try {
      setError("")
      setIsLoading(true)
      const res = await axios.post(fileUploadEndpoint, formData, {
        headers: {
          "Accept": "application/json, text/plain, /", "Content-Type": "multipart/form-data"
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });

      setIsLoading(false)
      setResult(res.data)
      setResultTitle(filename)

    } catch (err) {
      setIsLoading(false)
      setResult(null)
      if (err.response.status === 500) {
        setError('There was a problem with the server');
      } else {
        setError(err.response.data.msg);
      }
      setUploadPercentage(0)
    } finally {
      setFile("")
      setFilename("")
    }
  };

  const isFileUploading = uploadPercentage > 0 && uploadPercentage < 100

  return (
    <>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>

          <IconButton color="primary" component="label" sx={docButton} onChange={onChange} disabled={isLoading}>
            <input
              hidden
              accept="application/pdf"
              type="file"
            />
            <DescriptionIcon />
            <Box sx={titleContainer}>
              <Typography>{filename ? filename : "Choose file"}</Typography>
            </Box>
          </IconButton>

          <Stack spacing={0.5}>
            {(isFileUploading || !isLoading) ? (<Button
              type="submit"
              variant="outlined"
              disabled={!filename || isLoading}
            >

              {isFileUploading ? 'Uploading' : 'Submit'}
            </Button>) : (
              <Button variant="outlined" disableRipple sx={processBtn}>
                Processing &nbsp;&nbsp;
                <CircularProgress size={15} />
              </Button>)}
            <ProgressBar percentage={uploadPercentage} isFileUploading={isFileUploading} />
          </Stack>

        </Stack>
      </form>
      {error && <Typography color={theme.palette.error.main}>{error}</Typography>}
      {/* {true && <VisualRepresentation data={mockRes.financial_figures} unit={mockRes.unit} title={resultTitle ?? ''} />} */}
      {/* {result && <VisualRepresentation data={result.financial_figures} unit={result.unit} title={resultTitle} />} */}
      {result && <VisualRepresentation response={result} title={resultTitle} />}

    </>
  );
};

export default FileUpload;
