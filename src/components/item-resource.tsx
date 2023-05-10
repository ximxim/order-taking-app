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
  Edit,
  NumberInput,
  number,
  NumberField,
} from "react-admin";
import { MdOutlineFastfood } from "react-icons/md";

const ItemForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <NumberInput source="price" validate={[required(), number()]} fullWidth />
      <TextInput source="description" fullWidth />
    </SimpleForm>
  );
};

const ItemEdit = () => (
  <Edit>
    <ItemForm />
  </Edit>
);

const ItemCreate = () => (
  <Create>
    <ItemForm />
  </Create>
);

const ItemList = () => (
  <List>
    <Datagrid rowClick="edit">
      <ImageField source="image.src" label="Image" />
      <TextField source="label" />
      <NumberField source="price" />
      <TextField source="description" />
      <DateField source="createdate" showTime label="Created At" />
      <DateField source="lastupdate" showTime label="Updated At" />
    </Datagrid>
  </List>
);

export const ItemProps: ResourceProps = {
  icon: MdOutlineFastfood,
  name: "item",
  list: ItemList,
  create: ItemCreate,
  edit: ItemEdit,
};
