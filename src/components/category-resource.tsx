import {
  ResourceProps,
  List,
  Datagrid,
  TextField,
  Create,
  SimpleForm,
  TextInput,
  required,
  DateField,
} from "react-admin";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
    </SimpleForm>
  </Create>
);

const CategoryList = () => (
  <List>
    <Datagrid>
      <TextField source="title" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created At" />
      <DateField source="lastupdate" showTime label="Updated At" />
    </Datagrid>
  </List>
);

export const CategoryProps: ResourceProps = {
  name: "category",
  list: CategoryList,
  create: CategoryCreate,
};
