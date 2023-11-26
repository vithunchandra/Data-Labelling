import { TextField, TextFieldVariants } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormTextField{
    name: string;
    variant: TextFieldVariants | undefined;
    label: string;
    defaultValue: string | number | boolean;
    type: string;
}

export default function FormTextField(
    {name, variant, label, defaultValue, type} : FormTextField
){
    const { control } = useFormContext()
    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue}
            render={({field}) => (
                <TextField 
                    {...field}
                    type={type}
                    label={label}
                    variant={variant}
                    fullWidth
                />
            )}
        />
    )
}