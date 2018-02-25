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
this.triggerDelete=this.triggerDelete.bind(this)
}
componentWillMount(){
  this.setState({
    selectedQuestion:quizStructure[0],
    quizStructure:quizStructure,
    triggerFromDeleteButton:false
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
    quizStructure:quizStructure,
    triggerFromDeleteButton:false
  })
}
renderRightPane(questionObj){
   this.setState({
    selectedQuestion:questionObj,
    triggerFromDeleteButton:false
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
    quizStructure:quizStructure,
    triggerFromDeleteButton:false
  })
}
updateAddQuiz(addQuiz){
addQuiz.questionNumber=this.state.quizStructure.length+1;
this.state.quizStructure.push(addQuiz)
this.setState({
  quizStructure:this.state.quizStructure,
  triggerFromDeleteButton:false
})
}
triggerDelete(deletedList){
for(var i=0;i<deletedList.length;i++){
  for(var j=0;j<this.state.quizStructure.length;j++){
    if(this.state.quizStructure[j].questionNumber==deletedList[i]){
      this.state.quizStructure.splice(j,1)
    }
  }
}
this.state.quizStructure.forEach((question,index)=>{
    question.questionNumber=index+1
})
  this.setState({
    quizStructure:this.state.quizStructure,
    triggerFromDeleteButton:true,
    selectedQuestion:this.state.quizStructure[0]
  })
  
}
  render() {
    return (
    	<Grid>
      <Row className="show-grid" id="quizBorder">
        <Col xs={6} md={5} id="leftPane">
        <LeftPane questions={this.state.quizStructure} renderRightPane={this.renderRightPane} updateAddQuiz={this.updateAddQuiz} triggerDelete={this.triggerDelete} triggerFromDeleteButton={this.state.triggerFromDeleteButton}/>
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
