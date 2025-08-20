
import React, { useEffect, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Image, Upload } from 'antd';
import type { GetProp, UploadFile, UploadProps } from 'antd';
import { API } from '../hooks/getEnv';
import { useParams } from 'react-router-dom';
import useFormInstance from 'antd/es/form/hooks/useFormInstance';

type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const UploadImage: React.FC = () => {
  const { id } = useParams()
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  
  const form = useFormInstance(); 

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }
    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps['onChange'] = ({ file, fileList: newFileList }) => {
    setFileList(newFileList);

    if (file.status === "done") {
      const newUrls = newFileList.map(f => f.response?.path || f.url || f.name);
      form.setFieldsValue({ images: newUrls }); 
    }

    if (file.status === "removed") {
      const newUrls = newFileList.map(f => f.response?.path || f.url || f.name);
      form.setFieldsValue({ images: newUrls });
    }
  }

  const uploadButton = (
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  useEffect(() => {
    const imgNames = form.getFieldValue("image") || [];
    if (id && imgNames.length > 0) {
      setFileList(imgNames.map((item: any, index: number) => ({
        uid: String(index),
        name: `image.${item.split(".")[1]}`,
        status: 'done',
        url: `${API}/${item}`,
      })))
    }
  }, [id, form])

  return (
    <>
      <Upload
        action={`${API}/file`}
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
      >
        {fileList.length >= 8 ? null : uploadButton}
      </Upload>
      {previewImage && (
        <Image
          wrapperStyle={{ display: 'none' }}
          preview={{
            visible: previewOpen,
            onVisibleChange: (visible) => setPreviewOpen(visible),
            afterOpenChange: (visible) => !visible && setPreviewImage(''),
          }}
          src={previewImage}
        />
      )}
    </>
  );
};

export default UploadImage;
