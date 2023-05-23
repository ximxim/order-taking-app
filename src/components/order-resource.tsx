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
  ArrayInput,
  SimpleFormIterator,
  BooleanInput,
  ReferenceInput,
  SelectInput,
  ReferenceField,
  ChipField,
} from "react-admin";
import { MdReceipt } from "react-icons/md";

const OrderForm = () => {
  return (
    <SimpleForm sanitizeEmptyValues>
      <ImageInput source="image" label="Image">
        <ImageField source="src" title="title" />
      </ImageInput>
      <ReferenceInput source="category" reference="category">
        <SelectInput optionText="title" fullWidth validate={[required()]} />
      </ReferenceInput>
      <TextInput source="label" validate={[required()]} fullWidth />
      <NumberInput source="price" validate={[required(), number()]} fullWidth />
      <TextInput source="description" fullWidth />
      <ArrayInput source="variants">
        <SimpleFormIterator fullWidth>
          <TextInput source="type" helperText={false} fullWidth />
          <ArrayInput source="choices">
            <SimpleFormIterator inline>
              <TextInput source="label" />
              <NumberInput source="price" defaultValue={0} />
            </SimpleFormIterator>
          </ArrayInput>
          <BooleanInput source="allowMultiple" helperText={false} fullWidth />
          <BooleanInput source="isRequired" helperText={false} fullWidth />
        </SimpleFormIterator>
      </ArrayInput>
    </SimpleForm>
  );
};

const OrderEdit = () => (
  <Edit>
    <OrderForm />
  </Edit>
);

const OrderList = () => (
  <List sort={{ field: "pickupTime", order: "DESC" }}>
    <Datagrid
      rowClick="edit"
      bulkActionButtons={false}
      rowStyle={(record) =>
        record.status === "pending"
          ? {
              backgroundColor: "pink",
            }
          : undefined
      }
    >
      <TextField source="firstName" />
      <TextField source="lastName" />
      <TextField source="email" />
      <TextField source="phone" />
      <TextField source="status" />
      <NumberField
        source="total"
        options={{ style: "currency", currency: "CAD" }}
      />
      <DateField source="pickupTime" showTime label="Pickup" />
    </Datagrid>
  </List>
);

export const OrderProps: ResourceProps = {
  icon: MdReceipt,
  name: "order",
  list: OrderList,
  edit: OrderEdit,
};
