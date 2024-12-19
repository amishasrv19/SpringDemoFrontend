import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, IconButton, CircularProgress } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import './ViewAllImages.css';

const ViewAllImages = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 
  const fetchImages = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8080/images'); 
      setImages(response.data); 
      setError(null);
    } catch (err) {
      console.error('Error fetching images:', err);
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (fileName) => {
    try {
      await axios.delete(`http://localhost:8080/delete/${fileName}`);
      
      setImages(images.filter((image) => image !== fileName));
    } catch (err) {
      console.error('Error deleting image:', err);
      alert('Failed to delete the image.');
    }
  };

  useEffect(() => {
    fetchImages(); // Fetch images when component mounts
  }, []);

  return (
    <Box className="containerviewall">
      <Typography variant="h4" className="header">
        Uploaded Images ({images.length})
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <div className="image-grid">
          {images.length === 0 ? (
            <Typography>No images found.</Typography>
          ) : (
            images.map((imageName) => (
              <Box key={imageName} className="image-card">
                <img
                  src={`http://localhost:8080/${imageName}`}
                  alt={imageName}
                  className="image-preview"
                />
                <Typography className="image-name">{imageName}</Typography>
                <IconButton
                  color="error"
                  onClick={() => handleDelete(imageName)}
                  className="delete-button"
                >
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          )}
        </div>
      )}
    </Box>
  );
};

export default ViewAllImages;
