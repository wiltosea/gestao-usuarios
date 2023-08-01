import { Admin, Resource } from "react-admin";
import jsonServerProvider from "ra-data-json-server";
import { UserEdit, UserList, CreateUserForm } from "./users";
import React from "react";

const dataProvider = jsonServerProvider("http://localhost:3001");

const App = () => {
  return(
    <Admin dataProvider={dataProvider}>
      <Resource name="users" list={UserList} edit={UserEdit} create={CreateUserForm}/>
    </Admin>
  )
}

export default App