import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Button, CircularProgress } from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import axios from 'axios';
import './UploadDoc.css'; 
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

const UploadDoc = () => {
  const [customerName, setCustomerName] = useState('');
  const [customerId, setCustomerId] = useState('');
  const [EmailId, setEmailId] = useState('');
  const [MobileNO, setMobileNO] = useState('');
  const [address, setAddress] = useState('');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const [fileNames, setFileNames] = useState({ aadhar: null, pan: null, address: null });
  const [imageUrls, setImageUrls] = useState({ aadhar: null, pan: null, address: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [currentDocumentType, setCurrentDocumentType] = useState(null);
  const navigate = useNavigate();

  const handleUpload = async (event, documentType) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        setLoading(true);
        setUploadStatus(null);

        const response = await axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        const imageUrl = URL.createObjectURL(file); // Temporary preview
        setFileNames((prev) => ({ ...prev, [documentType]: file.name }));
        setImageUrls((prev) => ({ ...prev, [documentType]: imageUrl }));
        setUploadStatus(`File uploaded successfully: ${file.name}`);
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Failed to upload file.');
      } finally {
        setLoading(false);
      }
    }
  };

  const handleView = (documentType) => {
    if (!imageUrls[documentType]) {
      alert('Please upload the document first.');
    } else {
      setModalContent(imageUrls[documentType]);
      setCurrentDocumentType(documentType);
      setIsModalOpen(true);
    }
  };
  const handleNavigateToListImages = () => {
    navigate("/ViewAllImages"); // Navigate to the ViewAllImages route
  };

  const handleDelete = () => {
    if (currentDocumentType) {
      setFileNames((prev) => ({ ...prev, [currentDocumentType]: null }));
      setImageUrls((prev) => ({ ...prev, [currentDocumentType]: null }));
      setIsModalOpen(false);
      setUploadStatus(`${currentDocumentType} document deleted successfully.`);
    }
  };

  return (
    <div className="container">
      <Typography className="header">Customer Details</Typography>
      <div className="form-grid">
        <TextField
          label="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          variant="outlined"
          className="text-field"
        />
        <TextField
          label="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          variant="outlined"
          className="text-field"
        />
        <TextField
          label="Email ID"
          value={EmailId}
          onChange={(e) => setEmailId(e.target.value)}
          variant="outlined"
          className="text-field"
        />
        <TextField
          label="Mobile NO"
          value={MobileNO}
          onChange={(e) => setMobileNO(e.target.value)}
          variant="outlined"
          className="text-field"
        />
        <TextField
          label="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          variant="outlined"
          className="text-field full-width"
        />
      </div>

      <div className="upload-section">
        <Typography id ='uploaddocid'variant="body1">Upload Documents</Typography>
        <div className="document-upload-grid">
          {/* Aadhar */}
          <div className="document-row">
            <Typography>Aadhar</Typography>
            <input
              accept="image/*,.pdf"
              id="aadhar-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e, 'aadhar')}
            />
           <div className='rowww1'><label htmlFor="aadhar-upload">
              <IconButton color="primary" component="span">
                <UploadFileIcon fontSize="large" />
              </IconButton>
            </label>
            </div> 
            <Button variant="contained" color="primary" onClick={() => handleView('aadhar')}>
              View 
            </Button>
          </div>

          {/* Pan Card */}
          <div className="document-row">
            <Typography>Pan Card</Typography>
            <input
              accept="image/*,.pdf"
              id="pan-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e, 'pan')}
            />
            <div  className='rowww2'>
            <label htmlFor="pan-upload">
              <IconButton color="primary" component="span">
                <UploadFileIcon fontSize="large" />
              </IconButton>
              
            </label>
            </div>
            <Button variant="contained" color="primary" onClick={() => handleView('pan')}>
              View
            </Button>
          </div>

          {/* Address Proof */}
          <div className="document-row">
            <Typography>Address Proof</Typography>
            
            <div className='rowww3'><input
              accept="image/*,.pdf"
              id="address-upload"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => handleUpload(e, 'address')}
            />
           
            <label htmlFor="address-upload">
              <IconButton color="primary" component="span">
                <UploadFileIcon fontSize="large" />
              </IconButton>
            </label>
            </div>
            <Button variant="contained" color="primary" onClick={() => handleView('address')}>
              View
            </Button>
          </div>
        </div>
      </div>

      {loading && (
        <div className="loading">
          <CircularProgress />
        </div>
      )}

      {uploadStatus && (
        <Typography className={`status-message ${uploadStatus.startsWith('File uploaded') ? 'status-success' : 'status-error'}`}>
          {uploadStatus}
        </Typography>
      )}

      {/* View All Button */}
      <Box textAlign="center" mt={3}>
      
        <Button variant="contained" color="secondary" onClick={handleNavigateToListImages}>
          View All
        </Button>
        
      </Box>

      {/* Modal for Document Preview */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            {modalContent && <img src={modalContent} alt="Document Preview" className="image-previewDoc" />}
            <div className="modal-buttons">
              <Button variant="contained" color="secondary" onClick={handleDelete}>
                Delete
              </Button>
              <Button variant="contained" color="primary" href={modalContent} download>
                Download
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadDoc;


