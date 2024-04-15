import React from 'react';
import { createStyles, Text, UnstyledButton } from '@mantine/core';
import { useStyles } from 'hooks';
type InvoiceProps = {
  count: number;
  click?: () => void;
  title: string;
};

const Invoice: React.FC<InvoiceProps> = ({ count, click, title }) => {
  const { classes } = useStyles();
  return (
    <div className={classes.root}>
      <UnstyledButton
        className={classes.stat}
        onClick={click}
        sx={{ width: '100%' }}
      >
        <Text className={classes.count}>{count}$</Text>
        <Text className={classes.invoice_title}>{title}</Text>
      </UnstyledButton>
    </div>
  );
};

export default Invoice;
