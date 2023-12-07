import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

interface IFormDate{
    name: string;
    label: string;
    defaultValue: string;
    className: string;
}

export default function FormDate(
    {name, label, defaultValue, className}: IFormDate
){
    const { control } = useFormContext()
    return (
        <Controller 
            name={name}
            defaultValue={dayjs(defaultValue)}
            control={control}
            render={
                ({field}) => (
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={['DatePicker']}>
                            <DatePicker 
                                {...field}
                                label={label}
                                className={className}
                                slotProps={{
                                    textField: {
                                        size: 'small',
                                        fullWidth: true
                                    }
                                }}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                )
            }
        />
        
    )
}