import React, { Component } from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Questionpost from '../griditems/Questionpost'
import axios from 'axios';
import { Button } from '@material-ui/core'



class QuestionList extends Component {
    state = {
        randomQuestion: [],
        questions: [],
        searchString: '',
        selectedQuestion: null
    }

    constructor() {
        super()
        this.getRandomQuestion()
        this.getQuestions()

    };

    async getQuestions() {
        const returnedquestions = await axios.get('/api/questions/all');
        this.setState({ questions: returnedquestions.data });
    }

    async getRandomQuestion() {
        const returnedquestion = await axios.get('/api/questions/random');
        this.setState({ randomQuestion: returnedquestion.data });
    }

    setCurrentQuestion() {
        const returnedquestion = this.getRandomQuestion();
        this.setState({ questions: returnedquestion.data });
    }

    setSelectedQuestion = (questionpost) => {
        this.setState({ selectedQuestion: questionpost });
    }


    clearSelectedQuestion = () => {
        this.setState({ selectedQuestion: null });
    }

    onSearchInputChange = (event) => {
        if (event.target.value) {
            this.setState({ searchString: event.target.value })
        } else {
            this.setState({ searchString: '' })
        }
        this.getQuestions()
    }

    render() {
        return (
            <div>
                {

                    <div>
                        <Button style={{ padding: 24 }} variant="contained" color="primary" onclick={this.setCurrentQuestion}>
                            Random Question
                        </Button>

                        <h4>{this.state.randomQuestion.question}</h4>

                        {/*<Grid container spacing={10} style={{ padding: 24 }}>
                            <Grid item xs={12} sm={6} lg={4} xl={3}>
                                <Questionpost questionpost={this.state.randomQuestion[0]} onSelectQuestion={this.setSelectedQuestion} open={false} />
                            </Grid>
                        </Grid>
                                   
                        <Grid container spacing={10} style={{ padding: 24 }}>
                            {this.state.questions.map(currentQuestionpost => (
                                <Grid item xs={12} sm={6} lg={4} xl={3}>
                                    <Questionpost questionpost={currentQuestionpost} onSelectQuestion={this.setSelectedQuestion} open={false} />
                                </Grid>
                            ))}
                            </Grid>*/}
                    </div>
                }
            </div>
        )
    }
}
export default QuestionList;