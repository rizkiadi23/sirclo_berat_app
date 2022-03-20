import React from 'react';
import {
  List,
  Datagrid,
  DateField,
  NumberField,
  EditButton,
  DeleteButton,
  ShowButton,
  Pagination,
} from 'react-admin';
import WeightStats from './WeightStats';

const WeightPagination = (props) => (
  <Pagination rowsPerPageOptions={[100, 250, 500]} {...props} />
);

const WeightList = (props) => {
  return (
    <>
      {' '}
      <List {...props} pagination={<WeightPagination />} perPage={100}>
        <Datagrid>
          <DateField label='Tanggal' source='date' />
          <NumberField label='Max' source='maximum' />
          <NumberField label='Min' source='minimum' />
          <NumberField label='Perbedaan' source='differences' />
          <ShowButton basePath='/weights' />
          <EditButton basePath='/weights' />
          <DeleteButton basePath='/weights' />
        </Datagrid>
      </List>
      <br />
      <WeightStats />
    </>
  );
};

export default WeightList;
