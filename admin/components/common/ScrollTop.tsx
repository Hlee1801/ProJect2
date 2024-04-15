import React from 'react';
import { ActionIcon } from '@mantine/core';
import { IconArrowUpCircle } from '@tabler/icons';
const ScrollTop = () => {
  const [show, setShow] = React.useState(false);
  React.useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 200) {
        setShow(true);
      } else {
        setShow(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return (
    <div style={{ position: 'fixed', right: 20, bottom: 50 }}>
      {show && (
        <ActionIcon
          variant="filled"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <IconArrowUpCircle size={32} />
        </ActionIcon>
      )}
    </div>
  );
};

export default ScrollTop;
