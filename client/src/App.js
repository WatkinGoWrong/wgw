import React, { Component } from 'react';
import './App.css';
import Navbar from './components/navbar/NavBar';
import QuestionBox from './components/box/QuestionBox';



class App extends Component {
  render() {
    return (
      <div>
        <Navbar />
        <div style={{ marginTop: "70px" }}>
          <QuestionBox/>
        </div>
      </div>
    );
  }
}

export default App;