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
  ImageInput,
  ImageField,
} from "react-admin";

export const CategoryCreate = () => (
  <Create>
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="title" validate={[required()]} fullWidth />
      <TextInput source="description" fullWidth />
    </SimpleForm>
  </Create>
);

const CategoryList = () => (
  <List>
    <Datagrid>
      <ImageField source="image.src" />
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
