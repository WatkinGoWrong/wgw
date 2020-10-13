import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'


const Questionpost = (props) => {

    return (
        <div>
            {
                <Card>
                    <CardContent>
                        <Typography gutterbutton="true" variant="h5" component="h2">
                            {props.curQuestion.question}
                        </Typography>
                    </CardContent>
                </Card>
            }
        </div>

    )
}

export default Questionpost;