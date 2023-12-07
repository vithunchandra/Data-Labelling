import { FormControl, FormControlPropsSizeOverrides, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";
import { OverridableStringUnion } from '@mui/types';

interface IOptions{
    label: string;
    value: string | number;
}

interface IFormControl{
    options: IOptions[]
    name: string;
    label: string;
    size: OverridableStringUnion<"small" | "medium", FormControlPropsSizeOverrides> | undefined;
    defaultValue: string | number | undefined;
    className: string;
}

export default function FormSelect(
    {options, name, label, size, defaultValue, className} : IFormControl
){
    const {control} = useFormContext()

    return(
        <FormControl fullWidth className={className} size={size}>
            <InputLabel id="select">{label}</InputLabel>
            <Controller 
                name={name}
                defaultValue={defaultValue}
                control={control}
                render={
                    ({field}) => (
                        <Select
                            {...field}
                            label={label}
                        >
                            {
                                options.map((item, index) => {
                                    return <MenuItem value={item.value} key={index}>{item.label}</MenuItem>
                                })
                            }
                        </Select>
                    )
                }
            />
        </FormControl>
    )
}