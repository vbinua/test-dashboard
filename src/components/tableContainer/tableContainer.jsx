import React, {useState} from 'react';
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle
} from '@mui/material';

export default function TableContainerBox({data}) {
    const [open, setOpen] = useState(false);
    const [currentDescription, setCurrentDescription] = useState('');

    const handleClickOpen = (description) => {
        setCurrentDescription(description);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setCurrentDescription('');
    };

    const truncateDescription = (description) => {
        const words = description.split(' ');
        return words.length > 10 ? words.slice(0, 10).join(' ') + '...' : description;
    };

    return (
        <>
            {data.length > 0 ? (
                data.map((row) => (
                    <div key={row.id} style={{marginBottom: '40px', border: '1px solid #fff', padding: '30px'}}>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Name:</strong> {row.name}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>City:</strong> {row.city}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong style={{fontSize: '16px'}}>Company Name:</strong> {row.companyName}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Description:</strong>
                            <div>{row.description}</div>
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Email:</strong> {row.email}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Date request:</strong> {row.post_date}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Region:</strong> {row.region}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Selected Value:</strong> {row.selectedValue}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Timezone:</strong> {row.timezone}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>User Country:</strong> {row.userCountry}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Section:</strong> {row.section}
                        </div>
                        <div style={{margin: '10px 0px', fontSize: '17px'}}>
                            <strong>Button:</strong> {row.button}
                        </div>
                    </div>
                ))
            ) : (
                <div>Not found</div>
            )}
            <Dialog open={open} onClose={handleClose} sx={{'& .MuiDialog-paper': {width: '100%'}}}>
                <DialogTitle>Description</DialogTitle>
                <DialogContent>
                    {currentDescription}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
