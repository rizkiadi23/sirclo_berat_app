import React from 'react';
import {
  Create,
  SimpleForm,
  DateInput,
  NumberInput,
  useNotify,
  useRefresh,
  useRedirect,
} from 'react-admin';

const WeightCreate = (props) => {
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();

  const onSuccess = () => {
    notify(`New Weight record successfully added`);
    redirect('/weights');
    refresh();
  };

  return (
    <Create title='Add new Weight Record' {...props} onSuccess={onSuccess}>
      <SimpleForm>
        <DateInput label='Tanggal' source='date' />
        <NumberInput label='Minimum' source='minimum' />
        <NumberInput label='Maksimum' source='maximum' />
      </SimpleForm>
    </Create>
  );
};

export default WeightCreate;
