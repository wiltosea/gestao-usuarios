import React from "react";
import { Create, Datagrid, Edit, List, PasswordInput, SimpleForm, TextField, TextInput } from "react-admin";

export const UserList = (props: any) => {
  return (
    <List {...props}>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="name" />
        <TextField source="email" />
      </Datagrid>
    </List>
  );
};

export const UserEdit = (props: any) => {
  return (
    <Edit {...props}>
      <SimpleForm>
        <TextInput source="name" />
        <TextInput source="email" />
        <PasswordInput source="password" />
      </SimpleForm>
    </Edit>
  );
};

export const CreateUserForm = (props: any) => (
  <Create {...props}>
    <SimpleForm>
      <TextInput source="name" label="Name" />
      <TextInput source="email" label="Email" type="email" />
      <PasswordInput source="password" label="Password" />
    </SimpleForm>
  </Create>
);

