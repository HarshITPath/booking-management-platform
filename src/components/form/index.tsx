
import { Stack } from '@mui/material';
import { FormProvider, type UseFormReturn } from 'react-hook-form';

type FormProps = {
  methods: UseFormReturn<any>; // <-- change from FormProviderProps
  onSubmit?: (data: any) => void;
  children: React.ReactNode;
};

export const Form = ({ methods, onSubmit, children, ...props }: FormProps) => {
  const { handleSubmit } = methods;
  return (
    <FormProvider {...methods}>
      <form
        style={{ width: '100%' }}
        onSubmit={onSubmit ? handleSubmit(onSubmit) : undefined}
        noValidate
        {...props}
      >
        <Stack>{children}</Stack>
      </form>
    </FormProvider>
  );
};
Form.displayName = 'Form';
