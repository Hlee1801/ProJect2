import React from 'react';
import { GetStaticProps, GetStaticPaths, GetServerSideProps } from 'next';
import { GET, routes } from 'utils';

const List = (res: any) => {
  return <>this is list</>;
};
export const getServerSideProps: GetServerSideProps = async () => {
  const res = await GET(routes.api.room);
  // const data = res.json();
  console.log(res);
  return { props: { res } };
};
export default List;
