import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";


interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void;
}

export default function PhotoUploadWidget({loading, uploadPhoto}: Props) {
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();
    
    function onCrop() {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        }
    }, [files])

    return (
        <Row>
            <Col sm={4}>
                <h6 className="text-primary">{'Step 1 - Add photo'.toUpperCase()}</h6>
                <PhotoWidgetDropzone setFiles={setFiles} />
            </Col>
            <Col sm={4}>
                <h6 className="text-primary">{'Step 2 - Resize image'.toUpperCase()}</h6>
                {files && files.length > 0 && (
                    <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview} />
                )}
            </Col>
            <Col sm={4}>
                <h6 className="text-primary">{'Step 3 - Preview & upload'.toUpperCase()}</h6>
                {files && files.length > 0 &&
                    <>
                        <div className='img-preview' style={{ minHeight: 200, overflow: 'hidden' }} />
                        <ButtonGroup>
                            <Button disabled={loading} variant="primary" onClick={onCrop}>
                                {loading ? 'Loading…' : 'check'}
                            </Button>
                            <Button disabled={loading} variant="secondary" onClick={() => setFiles([])}>close</Button>
                        </ButtonGroup>
                    </>}
            </Col>
        </Row>
    );
}