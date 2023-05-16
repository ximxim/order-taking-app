import {
  Text,
  Image,
  VStack,
  FormControl,
  FormLabel,
  Textarea,
  Input,
  FormErrorMessage,
  CheckboxGroup,
  Checkbox,
  RadioGroup,
  Radio,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDataProvider } from "../components/data-provider";
import { ILine } from "../models";

const Variant = ({ allowMultiple, ...props }: any) =>
  allowMultiple ? <CheckboxGroup {...props} /> : <RadioGroup {...props} />;

const Choice = ({ allowMultiple, ...props }: any) =>
  allowMultiple ? <Checkbox {...props} /> : <Radio {...props} />;

export const Item = () => {
  const { id } = useParams();
  const { getItemById } = useDataProvider();
  const item = getItemById(id!);
  const { register, handleSubmit, formState } = useForm<ILine>({
    defaultValues: {
      quantity: 1,
      value: [],
      price: item!.price,
      label: item!.label,
    },
  });

  const onSubmit = (values: ILine) => console.log(values);

  if (!item) return null;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack gap={4} pb={100} alignItems="flex-start">
        <Image src={item.image.src} w="100%" maxH="280px" objectFit="cover" />
        <VStack gap={4} p={4} w="100%" alignItems="flex-start">
          <Text>{item.description}</Text>
          {item.variants.map((variant) => (
            <FormControl>
              <FormLabel>
                {variant.type}{" "}
                {variant.isRequired && (
                  <Text as="span" fontSize={12} color="gray.500">
                    (Required)
                  </Text>
                )}
              </FormLabel>
              <Variant allowMultiple={variant.allowMultiple}>
                <VStack
                  alignItems="flex-start"
                  border="1px solid"
                  borderColor="gray.200"
                  borderRadius={4}
                >
                  {variant.choices.map((choice, index, arr) => (
                    <Box
                      px={4}
                      py={2}
                      w="100%"
                      borderColor="gray.200"
                      borderBottomWidth={arr.length - 1 === index ? 0 : 1}
                      mt="0px !important"
                    >
                      <Choice
                        value={`${variant.type}:${index}`}
                        allowMultiple={variant.allowMultiple}
                      >
                        <Flex gap={3}>
                          <Text>{choice.label}</Text>
                          {choice.price > 0 && (
                            <Text color="gray.500" fontSize={12}>
                              +${choice.price.toFixed(2)}
                            </Text>
                          )}
                        </Flex>
                      </Choice>
                    </Box>
                  ))}
                </VStack>
              </Variant>
            </FormControl>
          ))}
          <FormControl>
            <FormLabel>Special Instructions</FormLabel>
            <Textarea
              placeholder="pepper / salt / cutluty..."
              {...register("instructions")}
            />
          </FormControl>
          <FormControl isInvalid={!!formState.errors.quantity?.type}>
            <FormLabel>Quantity</FormLabel>
            <Input
              type="number"
              defaultValue={1}
              {...register("quantity", { min: 1, valueAsNumber: true })}
            />
            {!!formState.errors.quantity?.type && (
              <FormErrorMessage>Invalid</FormErrorMessage>
            )}
          </FormControl>
        </VStack>
      </VStack>
    </form>
  );
};
