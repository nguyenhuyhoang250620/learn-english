import { UploadOutlined } from '@ant-design/icons';
import { Button, Empty } from 'antd';
import { useState } from 'react';
import Dropzone from 'react-dropzone';
import styles from "./UploadImage.module.scss";

const UploadImage = () => {
    const [file, setFile] = useState(null);
    const handleDrop = (acceptedFiles) => {
        setFile(acceptedFiles[0]);
    };
    const renderImage = () => {
        if (file) {
            return (
                <img
                    className={styles.image}
                    src={URL.createObjectURL(file)}
                    alt="Uploaded file"
                />
            );
        } else {
            return <Empty description={null} className={styles.image}></Empty>;
        }
    };

    const uploadImage = async (imageFile) => {
        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const response = await fetch('https://your-api-url.com/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();
            console.log(data); // log data trả về từ API
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <div className={styles.container}>
                <Dropzone id="dropzone" onDrop={handleDrop}>
                    {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps()} className={styles.upload}>
                            <input {...getInputProps()} />
                            <div>
                                <UploadOutlined className={styles.icons} />
                                <h4 className={styles.text}>Upload ảnh</h4>
                            </div>
                        </div>
                    )}
                </Dropzone>
                <div className={styles.wrapper}>
                    {renderImage()}
                </div>

            </div>
            <Button onClick={() => setFile(null)}>Xoá</Button>
        </>
    );
};
export default UploadImage;