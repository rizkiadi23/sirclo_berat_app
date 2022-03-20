import React from 'react';
import { Admin, Resource } from 'react-admin';
import restProvider from 'ra-data-simple-rest';
import WeightList from './components/WeightList';
import WeightCreate from './components/WeightCreate';
import WeightEdit from './components/WeightEdit';

function App() {
  const hostRestProvider =
    process.env.NODE_ENV === 'production'
      ? 'http://localhost:9000/api'
      : 'http://localhost:3000/api';

  return (
    <Admin title='Berat Apps' dataProvider={restProvider(hostRestProvider)}>
      <Resource
        name='weights'
        options={{
          label: 'Berat Apps',
        }}
        list={WeightList}
        create={WeightCreate}
        edit={WeightEdit}
      ></Resource>
    </Admin>
  );
}

export default App;
