import React, { useState, useEffect } from 'react';
import { Badge, Button } from '@material-ui/core';

export default function NewBookingNotif(props) {

    const {
        client_id,
        escort_id,
        userType,
        childUnread,
        childStatus
    } = props;
    const [update, setUpdate] = useState(false);
    const renderSwitch = (index) => {
        const acception = parseInt(index);
        switch (acception) {
            case 0:
                return 'Unaccepted';
            case 1:
                return 'Acccepted';
            case 2:
                return 'Rejected';
            case 3:
                return 'Cancelled';
        }
    }

    return (

        <Badge anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
            color='secondary'
            badgeContent={'New'}
            invisible={(parseInt(childUnread)) ? true : false}
        >
            <div className={'space-y-2'}>
                <Button
                    variant='contained'
                    style={{ width: '100%', fontSize: '10px' }}
                >
                    {renderSwitch(childStatus)}
                </Button>
                <Button
                    variant='contained'
                    color="secondary"
                    style={{ width: '100%', fontSize: '10px' }}
                    onClick={() => (window.location.href = (userType == 'client') ? '/chat/' + escort_id : '/chat/' + client_id)}
                >
                    Chat
                </Button>
            </div>
        </Badge >
    )
}


