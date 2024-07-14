import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function StatisticsBox({data}) {
    let count = data.length;

    return (
        <>
            <div style={{display: 'flex', gap: '20px', margin: '25px 0px', marginTop: '30px'}}>
                <Card sx={{width: 380}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Number of Requests
                        </Typography>
                        <Typography variant="h5" component="div">
                            {count ? count : 'Download'}
                        </Typography>
                    </CardContent>
                </Card>
                <Card sx={{width: 380}}>
                    <CardContent>
                        <Typography sx={{fontSize: 14}} color="text.secondary" gutterBottom>
                            Number of clicks on external links
                        </Typography>
                        <Typography variant="h5" component="div">
                            {count ? count + 3 : 'Download'}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
