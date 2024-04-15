import React from 'react';
import RichTextEditor from './Richtext';
import { RichTextEditorProps } from '@mantine/rte';

const TextEdit = (props: RichTextEditorProps) => {
  const handleImageUpload = React.useCallback(
    (file: File): Promise<string> =>
      new Promise((resolve, reject) => {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'ml_default');
        formData.append('cloud_name', 'dji8eaf4q');

        fetch('https://api.cloudinary.com/v1_1/dji8eaf4q/upload', {
          method: 'POST',
          body: formData,
        })
          .then((response) => response.json())
          .then((result) => resolve(result.secure_url))
          .catch(() => reject(new Error('Upload failed')));
      }),
    [],
  );
  return (
    <div>
      <RichTextEditor {...props} onImageUpload={handleImageUpload} />
    </div>
  );
};

export default TextEdit;
