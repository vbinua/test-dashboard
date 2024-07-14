import React, {useState} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';

export default function HeaderBox({onDateChange}) {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (date) => {
        setSelectedDate(date);
        if (onDateChange) {
            onDateChange(date);
        }
    };

    return (
        <>
            <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleDateChange}
                        slotProps={{
                            textField: {
                                helperText: 'MM/DD/YYYY',
                                sx: {
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            color: '#000000',
                                            border: '1px solid #ffffff',
                                        },
                                        '&:hover fieldset': {},
                                        '&.Mui-focused fieldset': {},
                                    },
                                    '& .MuiInputBase-input': {},
                                    '& .MuiInputBase-input::placeholder': {
                                        color: '#000000',
                                    },
                                    '& .MuiFormHelperText-root': {
                                        display: 'none'
                                    },
                                },
                            },
                        }}
                    />
                </LocalizationProvider>
            </div>
        </>
    );
}
