import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

export default function SelectInput(
    {items, label, defaultValue}: {
        items: {
            value: string,
            text: string
        }[],
        label: string,
        defaultValue: string
    }
){
    const [value, setValue] = useState(defaultValue);

    function handleChange(event: SelectChangeEvent<string>){
        setValue(event.target.value);
    }

    useEffect(() => {
        setValue(defaultValue);
    }, [defaultValue])

    return(
        <FormControl fullWidth>
            <InputLabel id="select">{label}</InputLabel>
            <Select
                labelId="select"
                label={label}
                value={value}
                onChange={handleChange}
            >
                {
                    items.map((item, index) => {
                        return <MenuItem value={item.value} key={index}>{item.text}</MenuItem>
                    })
                }
            </Select>
        </FormControl>
    )
}