import React, { useState } from 'react';
import errorImage from '../assets/images/image_not_found.png';
import { baseURL } from "../services/ConfigService/ApiService";
const ImageComponent = ({ url,height }) => {
  const [imageSrc, setImageSrc] = useState(`${baseURL}${url}`);
  const [error, setError] = useState(false);

  const handleImageError = () => {
    setImageSrc(errorImage);
    setError(true);
  };

  return (
    <>
      {error ? (
        <img
            style={{ height: `${height}px`, width: "auto" }}
            src={errorImage}
        />
      ) : (
        <img
          style={{ height: `${height}px`, width: "auto",maxWidth:"150px",maxHeight:"150px" }}
          src={imageSrc}
          alt="Error image"
          onError={handleImageError}
        />
      )}
    </>
  );
};

export default ImageComponent;