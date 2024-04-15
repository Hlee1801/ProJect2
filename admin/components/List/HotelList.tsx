import React, { useState, useEffect } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import {
  Table,
  ScrollArea,
  Button,
  Image,
  Box,
  TypographyStylesProvider,
  Drawer,
  Tooltip,
  UnstyledButton,
  Modal,
} from '@mantine/core';
import useStyles from 'hooks/useStyles';
import { Carousel } from '@mantine/carousel';
import { FormEditRoom } from '../form';
import { IRoom, ListType } from 'utils';
import { IconTrash, IconBallpen } from '@tabler/icons';

interface ListProps {
  listData: IRoom[];
  onGetId: (roomId: string) => void;
}

const HotelList: React.FC<ListProps> = ({ listData, onGetId }) => {
  const [state, setState] = useState({
    scrolled: false,
    editRow: {} as IRoom,
    open: false,
    modal: false,
  });
  const { scrolled, editRow, open, modal } = state;
  const { classes, cx } = useStyles();
  const takeRowEdit = (id: string) => {
    const filterRow = listData?.filter((i: any) => i.roomID === id);
    setState((p) => ({ ...p, editRow: filterRow[0], open: !open }));
  };
  function openDescModal(id: string) {
    const specificRow = listData?.filter((i) => i.roomID === id);
    setState((p) => ({ ...p, modal: true, editRow: specificRow[0] }));
  }
  const list = listData?.map((item: ListType, index: number) => (
    <>
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{item.roomName}</td>
        <td>{item.roomType}</td>
        <td>{item.roomPrice}$</td>
        <td>{item.roomLocate}</td>
        <td>{item.roomFeature.join(',')}</td>
        <td>
          {item.roomPhoto && (
            <Carousel sx={{ width: 200, height: 120 }} loop>
              {item.roomPhoto?.map((n: any, index: number) => {
                return (
                  <Carousel.Slide key={index}>
                    <Image
                      src={n}
                      radius="md"
                      alt="photo"
                      width={200}
                      height={120}
                    />
                  </Carousel.Slide>
                );
              })}
            </Carousel>
          )}
        </td>
        <td>
          <UnstyledButton
            onClick={() => openDescModal(item.roomID)}
            style={{ color: 'blue', textDecoration: 'underline' }}
          >
            xem chi tiết
          </UnstyledButton>
        </td>

        <td style={{ textAlign: 'center' }}>
          <Tooltip label="Sửa" color={'blue'} withArrow>
            <Button
              onClick={() => takeRowEdit(item.roomID)}
              sx={{ marginRight: 4 }}
              leftIcon={<IconBallpen />}
            >
              Edit
            </Button>
          </Tooltip>
          <Tooltip label="Xóa" color={'red'} withArrow>
            <Button
              color="red"
              onClick={() => onGetId(item.roomID)}
              leftIcon={<IconTrash />}
            >
              Delete
            </Button>
          </Tooltip>
        </td>
      </tr>
    </>
  ));

  return (
    <Box>
      <ScrollArea
        sx={{ height: 600 }}
        onScrollPositionChange={({ y }) =>
          setState((o) => ({ ...o, scrolled: y !== 0 }))
        }
      >
        <Table sx={{ minWidth: 700 }}>
          <thead
            className={cx(classes.tableHeader, {
              [classes.scrolled]: scrolled,
            })}
          >
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Hạng</th>
              <th>Giá</th>
              <th>Vị trí</th>
              <th>Dịch vụ</th>
              <th>Gallery</th>
              <th>Mô tả</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{list}</tbody>
        </Table>
      </ScrollArea>
      <Drawer
        opened={open}
        onClose={() => setState((p) => ({ ...p, open: !open }))}
        size="xl"
        padding={'sm'}
      >
        <FormEditRoom
          data={editRow}
          closeDawer={() => setState((p) => ({ ...p, open: !open }))}
        />
      </Drawer>
      <Modal
        opened={modal}
        onClose={() => setState((p) => ({ ...p, modal: false }))}
      >
        <TypographyStylesProvider>
          <div dangerouslySetInnerHTML={{ __html: editRow.roomDesc }} />
        </TypographyStylesProvider>
      </Modal>
    </Box>
  );
};

export default HotelList;
