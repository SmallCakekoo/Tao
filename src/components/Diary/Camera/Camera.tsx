import { useRef, useState, useEffect } from 'react';
import Webcam from 'react-webcam';

import type { CameraProps } from '../../../types/CameraProps';
import { Polaroid } from '../Polaroid/Polaroid';
import './Camera.css';
import camera from '../../../assets/camera.png';
import { IconX } from '@tabler/icons-react';


export const Camera = ({ onClose, onCapture }: CameraProps) => {
  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [flash, setFlash] = useState(false);

  const cameraWidth = 720;
  const cameraHeight = 720;
  const aspectRatio = cameraWidth / cameraHeight;

  const videoConstraints = {
    width: {
      min: cameraWidth,
    },
    height: {
      min: cameraHeight,
    },
    aspectRatio,
  };

  const triggerFlashAndCapture = () => {
    setFlash(true);

    setTimeout(() => {
      setFlash(false);

      if (!webcamRef.current) return;

      const imageSrc = webcamRef.current.getScreenshot();

      if (imageSrc) {
        setImage(imageSrc);
        localStorage.setItem('capturedPhoto', imageSrc);
        onCapture(imageSrc);
      }

      setTimeout(() => {
        onClose();
      }, 2500);
    }, 600);
  };

  const startCapture = () => {
    let count = 3;
    setCountdown(count);

    const interval = setInterval(() => {
      count--;

      if (count === 0) {
        clearInterval(interval);
        setCountdown(null);

        triggerFlashAndCapture();
      } else {
        setCountdown(count);
      }
    }, 1000);
  };

  useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") onClose();
  };

  window.addEventListener("keydown", handleKeyDown);
  return () => window.removeEventListener("keydown", handleKeyDown);
}, [onClose]);

  return (
    <>
      <div className="camera-overlay">
        {flash && <div className="flash" />}

        <div className="camera-modal">
        <IconX className='close-icon' onClick={onClose}></IconX>

          {countdown !== null && <div className="countdown">{countdown}</div>}

          <div className="camera-video">
            {image ? (
              <img src={image} alt="Captured" />
            ) : (
              <Webcam
                ref={webcamRef}
                videoConstraints={videoConstraints}
                width={cameraWidth}
                height={cameraHeight}
              />
            )}
            <p className="take-pic">Take a picture to remember this day!</p>
          </div>
        </div>
        <div className="camera-wrapper">
          <img onClick={startCapture} src={camera} alt="Camera" className="camera-img" />

          {image && <Polaroid src={image} isPrinting={true} />}
        </div>
      </div>
    </>
  );
};
