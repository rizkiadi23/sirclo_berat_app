import React from 'react'
import { Edit, SimpleForm, DateInput, NumberInput, TextInput } from 'react-admin'

const WeightEdit = (props) => {
  return (
    <Edit title='Edit Weight Record' {...props}>
      <SimpleForm>
        <TextInput disabled source='id' />
        <DateInput label='Tanggal' source='date' />
        <NumberInput label='Minimum' source='minimum' />
        <NumberInput label='Maksimum' source='maximum' />
      </SimpleForm>
    </Edit>
  )
}

export default WeightEdit