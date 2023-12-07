import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

interface IOptions {
    label: string;
    value: string | number;
}

interface IFormRadio{
    options: IOptions[];
    name: string;
    label: string;
    defaultValue: string | number;
    className: string;
}

export function FormRadio(
    {options, name, label, defaultValue, className}: IFormRadio
){
    const { control, } = useFormContext()
    return(
        <FormControl className={className}>
            <FormLabel>{label}</FormLabel>
            <Controller 
                name={name}
                control={control}
                defaultValue={defaultValue}
                render={
                    ({field}) => (
                        <RadioGroup {...field}>
                            {
                                options.map((option, index) => {
                                    return <FormControlLabel 
                                        value={option.value}
                                        label={option.label}
                                        control={<Radio />}
                                        key={index}
                                    />
                                })
                            }
                        </RadioGroup>
                    )
                }
            />
        </FormControl>
    )
}