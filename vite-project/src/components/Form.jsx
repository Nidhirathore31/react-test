import React, { useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextareaAutosize,
  TextField,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, fieldChange, newFetchData } from '../redux/slice';

const Form = () => {
  const { value, responseData,isPending } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch]);
  const handleInputChange = (index, value) => {
    dispatch(fieldChange({ index, value }));
  };

  const renderInputField = (item, index) => {
    switch (item.type) {
      case 'select':
        return (
          <Select
            value={item.value}
            name={item.fieldName}
            onChange={(e) => handleInputChange(index, e.target.value)}
            sx={{ width: '100%' }}
          >
            {item.options.map((data) => (
              <MenuItem key={data} value={data}>
                {data}
              </MenuItem>
            ))}
          </Select>
        );

      case 'multiline':
        return (
          <TextareaAutosize
            value={item.value}
            name={item.fieldName}
            minRows={4}
            style={{
              width: '100%',
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontFamily: 'Roboto, sans-serif',
            }}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        );

      default:
        return (
          <TextField
            value={item.value}
            name={item.fieldName}
            type={item.type}
            onChange={(e) => handleInputChange(index, e.target.value)}
            fullWidth
          />
        );
    }
  };

  const handleSubmit = () => {
    const formData = {};
    value.forEach((form) => {
      formData[form.fieldName] = form.value;
    });
    dispatch(newFetchData(formData));
  };

  return (<>
  {isPending?<div>LODING......</div>:<>
    <Box
      sx={{
        maxWidth: '600px',
        margin: 'auto',
        padding: '20px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
        overflow: 'hidden',
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginBottom: '20px', fontWeight: 'bold', textAlign: 'center' }}
      >
        Form
      </Typography>
      <FormControl
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {value?.map((item, index) => (
          <Box key={index}>
            <FormLabel
              sx={{ marginBottom: '8px', fontWeight: 'bold', color: '#333' }}
            >
              {item.fieldName}
            </FormLabel>
            {renderInputField(item, index)}
          </Box>
        ))}
        <Button
          size="large"
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          sx={{
            marginTop: '20px',
            alignSelf: 'center',
            padding: '10px 20px',
            borderRadius: '20px',
          }}
        >
          Submit
        </Button>
      </FormControl>
      <Box
        sx={{
          marginTop: '20px',
          padding: '10px',
          backgroundColor: '#e8f5e9',
          borderRadius: '8px',
          color: '#2e7d32',
          maxHeight: '200px', 
          overflow: 'auto', 
          wordWrap: 'break-word', 
        }}
      >
        <Typography variant="body1">
          <strong>Response:</strong> {JSON.stringify(responseData)}
        </Typography>
      </Box>
    </Box>
    </>}</>
  );
};

export default Form;


