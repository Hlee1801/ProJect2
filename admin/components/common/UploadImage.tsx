import React, { ReactElement, ReactNode, useState } from 'react';
import { Box, Group, useMantineTheme, Text, SimpleGrid } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { showNotification } from '@mantine/notifications';
import {
  Dropzone,
  DropzoneProps,
  IMAGE_MIME_TYPE,
  FileWithPath,
} from '@mantine/dropzone';
type ImageUpProps = {
  image?: ReactElement[];
  onUpload: (img: FileWithPath[]) => void;
  isLoad?: boolean;
};
const UploadImage: React.FC<ImageUpProps> = ({ onUpload, image, isLoad }) => {
  const theme = useMantineTheme();
  return (
    <div>
      <Box sx={{ paddingTop: '10px' }}>
        <Dropzone
          multiple
          onDrop={onUpload}
          onReject={() =>
            showNotification({
              title: 'Lỗi',
              message: 'không hỗ trợ',
              color: 'red',
            })
          }
          accept={IMAGE_MIME_TYPE}
          maxSize={1024 * 1024}
          loading={isLoad}
        >
          <Group
            position="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: 'none' }}
          >
            <Dropzone.Accept>
              <IconUpload
                size={50}
                stroke={1.5}
                color={
                  theme.colors[theme.primaryColor][
                    theme.colorScheme === 'dark' ? 4 : 6
                  ]
                }
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconPhoto size={50} stroke={1.5} />
            </Dropzone.Idle>

            <div>
              <Text size="xl" inline>
                Tải ảnh lên
              </Text>
            </div>
          </Group>
        </Dropzone>
        <SimpleGrid
          cols={4}
          breakpoints={[{ maxWidth: 'sm', cols: 1 }]}
          mt={'xl'}
        >
          {image}
        </SimpleGrid>
      </Box>
    </div>
  );
};

export default UploadImage;
