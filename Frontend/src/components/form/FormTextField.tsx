import { TextField, TextFieldPropsSizeOverrides, TextFieldVariants } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { OverridableStringUnion } from '@mui/types';

interface IFormTextField{
    name: string;
    variant: TextFieldVariants | undefined;
    label: string;
    defaultValue: string | number | boolean | undefined;
    type: string;
    size: OverridableStringUnion<"small" | "medium", TextFieldPropsSizeOverrides>;
    className: string | undefined;
}

export default function FormTextField(
    {name, variant, label, defaultValue, type, size, className} : IFormTextField
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
                    size={size}
                    className={className}
                    fullWidth
                />
            )}
        />
    )
}