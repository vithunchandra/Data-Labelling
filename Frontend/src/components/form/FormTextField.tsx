import { TextField, TextFieldVariants } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface FormTextField{
    name: string;
    variant: TextFieldVariants | undefined;
    label: string;
    defaultValue: string | number | boolean | undefined;
    type: string;
    className: string | undefined;
}

export default function FormTextField(
    {name, variant, label, defaultValue, type, className} : FormTextField
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
                    className={className}
                    fullWidth
                />
            )}
        />
    )
}