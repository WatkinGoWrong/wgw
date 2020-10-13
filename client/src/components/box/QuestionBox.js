import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid'
import { Button } from '@material-ui/core'
import Questionpost from '../griditems/Questionpost'

class QuestionBox extends React.Component {

    constructor() {
        super();

        // Initial state is defined
        this.state = {
            question: [
            ],
            allQuestions: []
        };

        this.getQuestions()
    }

    async getQuestions() {
        const returnedquestions = await axios.get('/api/questions/all');
        this.setState({
            allQuestions: returnedquestions.data
        });
    }

    // when handleClick is called, setState will update the state so that toggle is reversed
    handleClick = async () => {
        
        const question = await axios.get('/api/questions/random');

        this.setState({
            question: question.data
        })
    }


    render() {


        return (
            <div >
                <container style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center"
                    }}>
                    <Button spacing={20} style={{ padding: 15}} variant="contained" size="medium" color="primary" onClick={this.handleClick} disableElevation>
                        Get Random Question
                    </Button>

                    <Grid container spacing={10} style={{ padding: 24 }}>
                        {this.state.question.map(question => (
                        <Grid item xs={'auto'} sm={12} lg={10} xl={9}>
                        <Questionpost curQuestion={question} />
                            </Grid>
                        ))}
                    </Grid>
                </container>
                <br></br>
                <h1>All Questions</h1>
                {<Grid container spacing={10} style={{ padding: 24 }}>
                    {this.state.allQuestions.map(question => (
                        <Grid item xs={'auto'} sm={12} lg={10} xl={9}>
                            <Questionpost curQuestion={question} />
                        </Grid>
                    ))}
                    </Grid>}
            </div>
        );
    }
}

export default QuestionBox;