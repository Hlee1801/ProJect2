import React, { useEffect, useRef, useState } from 'react';
import {
  Paper,
  TextInput,
  Button,
  Box,
  Grid,
  Table,
  Modal,
} from '@mantine/core';
import {
  IconCircleCheck,
  IconBallpen,
  IconTrash,
  IconPlaystationX,
} from '@tabler/icons';
import { POST, GET, PATCH, DELETE, routes } from 'utils';
import { showNotification } from '@mantine/notifications';
type ftType = {
  _id?: string;
  service_name: string;
  service_price: string;
  edit?: boolean;
};
const ConfigFeature = () => {
  const [state, setState] = useState({
    featureList: [],
    rowID: '',
    open: false,
    ftName: '',
    ftPrice: '',
  });
  const [editValue, setEditValue] = useState({
    ftName: '',
    ftPrice: '',
  });

  const { featureList, rowID, open, ftName, ftPrice } = state;
  const nameRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  async function postFeatured(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      await POST(routes.api.service, {
        service_name: nameRef.current?.value,
        service_price: priceRef.current?.value,
      });
      (e.target as HTMLFormElement).reset();
      const controller = new AbortController();
      GET(routes.api.service)
        .then((res) =>
          setState((p) => ({
            ...p,
            featureList: res?.data?.map((x: any) => {
              return {
                ftId: x._id,
                ftName: x.service_name,
                ftPrice: x.service_price,
              };
            }),
          })),
        )
        .finally(() => controller.abort());
    } catch (error: any) {
      showNotification({ title: 'Lỗi', message: error.data.msg, color: 'red' });
    }
  }
  const getId = (id: string) => {
    setState((p) => ({ ...p, rowID: id, open: true }));
  };
  const takeEditRow = (row: ftType) => {
    row.edit = !row.edit;
    setState((p) => ({
      ...p,
      ftName: row.service_name,
      ftPrice: row.service_price,
    }));
  };
  const handleEditValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setEditValue({ ...editValue, [name]: value });
  };
  async function updateFeatured(id: string) {
    await PATCH(`${routes.api.service}/${id}`, {
      company_name: editValue.ftName || ftName,
      director_name: editValue.ftPrice || ftPrice,
    });
    setEditValue((p) => ({ ...p, ftName: '', ftPrice: '' }));
    const controller = new AbortController();
    GET(routes.api.service)
      .then((res) =>
        setState((p) => ({
          ...p,
          featureList: res?.data?.map((x: any) => {
            return {
              ftId: x._id,
              ftName: x.service_name,
              ftPrice: x.service_name,
            };
          }),
        })),
      )
      .finally(() => controller.abort());
  }
  async function deleteFeatured(id: string) {
    const res = await DELETE(`${routes.api.service}/${id}`);
    if (res.status === 200)
      setState((p) => ({
        ...p,
        open: false,
        featureList: featureList.filter(
          (item: { ftId: string }) => item.ftId !== id,
        ),
      }));
  }

  useEffect(() => {
    const controller = new AbortController();
    GET(routes.api.service).then((res) =>
      setState((p) => ({
        ...p,
        featureList: res?.data?.map((x: any) => {
          return {
            ftId: x._id,
            ftName: x.service_name,
            ftPrice: x.service_price,
            edit: false,
          };
        }),
      })),
    );
    return () => controller.abort();
  }, []);

  return (
    <Box>
      <Paper component="form" onSubmit={(e) => postFeatured(e)} shadow="sm">
        <Box>
          <TextInput label="Tên dịch vụ" ref={nameRef} />
          <TextInput label="Giá dịch vụ" ref={priceRef} />

          <Button sx={{ marginTop: '23px' }} fullWidth type="submit">
            Submit
          </Button>
        </Box>
      </Paper>
      <Table sx={{ marginTop: '10px' }} withBorder withColumnBorders>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>Tên</th>
            <th style={{ textAlign: 'center' }}>Giá</th>
            <th style={{ textAlign: 'center' }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {featureList?.map((x: any) => (
            <tr key={x.ftId}>
              <td style={{ textAlign: 'center' }}>
                <input
                  style={{ border: 'none' }}
                  readOnly={!x.edit}
                  defaultValue={x.ftName}
                  type="text"
                  onChange={(e) => handleEditValue(e)}
                  name="ftName"
                />
              </td>
              <td style={{ textAlign: 'center' }}>
                <input
                  style={{ border: 'none' }}
                  readOnly={!x.edit}
                  type="text"
                  name="ftPrice"
                  defaultValue={x.ftPrice}
                  onChange={handleEditValue}
                  placeholder={`${x.ftPrice} $`}
                />
                
              </td>
              <td style={{ width: '350px', textAlign: 'center' }}>
                <Button
                  onClick={() => takeEditRow(x)}
                  leftIcon={<IconBallpen />}
                >
                  Sửa
                </Button>
                {!x.edit ? (
                  <Button
                    color={'red'}
                    sx={{ marginLeft: '10px' }}
                    onClick={() => getId(x.ftId)}
                    leftIcon={<IconTrash />}
                  >
                    Xóa
                  </Button>
                ) : (
                  <>
                    <Button
                      sx={{ marginLeft: '10px' }}
                      color="green"
                      leftIcon={<IconCircleCheck />}
                      onClick={() => updateFeatured(x.ftId)}
                    >
                      Lưu
                    </Button>
                    <Button
                      sx={{ marginLeft: '10px' }}
                      color="red"
                      onClick={() => takeEditRow(x)}
                      leftIcon={<IconPlaystationX />}
                    >
                      Huỷ
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        opened={open}
        onClose={() => setState((o) => ({ ...o, open: false }))}
        title="Xác nhận"
        centered
        size={'xs'}
        withCloseButton={false}
        sx={{ textAlign: 'center' }}
      >
        Bạn có chắc chắn xóa
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Button
            color={'gray'}
            onClick={() => setState((o) => ({ ...o, open: false }))}
          >
            Hủy
          </Button>
          <Button color={'red'} onClick={() => deleteFeatured(rowID)}>
            Xóa
          </Button>
        </div>
      </Modal>
    </Box>
  );
};

export default ConfigFeature;
