export const emailRegex =
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/;
export const genPromoCode = (len: number) => {
  return Math.random()
    .toString(36)
    .substring(2, len + 2);
};
export const checkImage = (file: File) => {
  const types = ['image/png', 'image/jpeg', 'img/jpg'];
  let err = '';
  if (!file) return (err = 'File ảnh không tồn tại');

  if (file.size > 1024 * 1024) err = 'File ảnh phải có dung lượng dưới 1mb';

  if (!types.includes(file.type)) err = 'Định dạng ảnh không được hỗ trợ!';

  return err;
};
