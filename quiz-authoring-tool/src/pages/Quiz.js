import React, { Component } from 'react';
import { Row, Col,Grid} from "react-bootstrap";
import LeftPane from './Components/LeftPane/LeftPane';
import RightPane from './Components/RightPane/RightPane';
import styles from './Quiz.css';
import quizStructure from './quizStructure';

class Quiz extends Component {
constructor(props){
super()
    this.state={
  quizStructure:null,
  selectedQuestion:null
} 
this.updateQuestionValue=this.updateQuestionValue.bind(this)
this.updateAnswerValue=this.updateAnswerValue.bind(this)
this.renderRightPane=this.renderRightPane.bind(this)
this.updateAddQuiz=this.updateAddQuiz.bind(this)
}
componentWillMount(){
  this.setState({
    selectedQuestion:quizStructure[0],
    quizStructure:quizStructure
  })

}
componentDidMount(){
	document.title="Quiz Authoring Tool"
  
}
updateQuestionValue(number,textboxvalue){
  console.log(quizStructure)
  quizStructure.forEach(question=>{
    if(question.questionNumber==number)
      question.questionName=textboxvalue
  })
  this.setState({
    quizStructure:quizStructure
  })
}
renderRightPane(questionObj){
   this.setState({
    selectedQuestion:questionObj
  }) 
}
updateAnswerValue(questionNumber,answerNumber,textboxvalue){
console.log(textboxvalue)
console.log(quizStructure)
quizStructure.forEach(question=>{
  if(question.questionNumber==questionNumber){
  question.answerChoices.forEach(answer=>{
    if(answer.answerNumber==answerNumber)
      answer.answerName=textboxvalue
  })    
  }

})

  this.setState({
    quizStructure:quizStructure
  })
}
updateAddQuiz(addQuiz){
addQuiz.questionNumber=quizStructure.length+1;
this.state.quizStructure.push(addQuiz)
this.setState({
  quizStructure:this.state.quizStructure
})
}
  render() {
    return (
    	<Grid>
      <Row className="show-grid" id="quizBorder">
        <Col xs={6} md={5} id="leftPane">
        <LeftPane questions={this.state.quizStructure} renderRightPane={this.renderRightPane} updateAddQuiz={this.updateAddQuiz}/>
    </Col>
    <Col xs={12} md={7} id="rightPane">
    <RightPane selectedQuestion={this.state.selectedQuestion} updateQuestionValue={this.updateQuestionValue} updateAnswerValue={this.updateAnswerValue}/>
    </Col>
      </Row>
      </Grid>
    );
  }
}

export default Quiz;
