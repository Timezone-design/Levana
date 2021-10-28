import React, { useState, useEffect } from 'react';
import Cropper from "cropperjs";
import "cropperjs/dist/cropper.min.css";

export default function ImageCropper(props) {

    const [canvassource, setCanvasSource] = useState('');
    const imageElement = React.createRef();
    const { src, setCropSource } = props;
    useEffect(() => {
        cropper && cropper.destroy();
        const cropper = new Cropper(imageElement.current, {
            zoomable: false,
            scalable: false,
            cropBoxResizable: true,
            autoCropArea: 0.7,
            aspectRatio: 1,
            crop: () => {
                const canvas = cropper.getCroppedCanvas();
                setCanvasSource(canvas.toDataURL("image/png"));
                setCropSource(canvas.toDataURL("image/png"));
            }
        });
    }, [src]);

    return (
        <div className={'hng'}>
            <div className="img-container">
                <img ref={imageElement} src={src} alt="Source" crossOrigin="true" className="mx-auto"
                />
            </div>
            <img src={canvassource} className="mx-auto" alt="Destination" style={{ width: '200px', height: '200px', border: '5px dashed #f59e0b' }} />
        </div>
    )


}