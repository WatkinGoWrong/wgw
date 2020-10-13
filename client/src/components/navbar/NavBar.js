import React from 'react'
import {AppBar,Toolbar,Typography} from '@material-ui/core'


const Navbar = () => {
    return (
        <div >
            <AppBar positiion="static">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        WatkinGoWrong
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Navbar