import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface Options{
    label: string;
    value: string | number;
}

interface FormControl{
    options: Options[]
    name: string;
    label: string;
    defaultValue: string | number | undefined;
    className: string;
}

export default function FormSelect(
    {options, name, label, defaultValue, className} : FormControl
){
    const {control} = useFormContext()

    return(
        <FormControl fullWidth className={className}>
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