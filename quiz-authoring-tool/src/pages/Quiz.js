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
this.updateAddOption=this.updateAddOption.bind(this)
this.triggerDeleteOptions=this.triggerDeleteOptions.bind(this)
this.saveImage=this.saveImage.bind(this)
}
componentWillMount(){
  var quizStructureLocalStorage=JSON.parse(localStorage.getItem('updatedQuizStructure'))
  this.setState({
    selectedQuestion:quizStructureLocalStorage!=null?quizStructureLocalStorage[0]: quizStructure[0],
    quizStructure:quizStructureLocalStorage!=null?quizStructureLocalStorage:quizStructure,
    triggerFromDeleteButton:false
  })

}
componentDidMount(){
	document.title="Quiz Authoring Tool"
  
}   
updateQuestionValue(number,textboxvalue){
  console.log(quizStructure)
  this.state.quizStructure.forEach(question=>{
    if(question.questionNumber==number)
      question.questionName=textboxvalue
  })
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
  this.setState({
    quizStructure:this.state.quizStructure,
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
this.state.quizStructure.forEach(question=>{
  if(question.questionNumber==questionNumber){
  question.answerChoices.forEach(answer=>{
    if(answer.answerNumber==answerNumber)
      answer.answerName=textboxvalue
  })    
  }

})
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
  this.setState({
    quizStructure:this.state.quizStructure,
    triggerFromDeleteButton:false
  })
}
updateAddQuiz(addQuiz){
addQuiz.questionNumber=this.state.quizStructure.length+1;
this.state.quizStructure.push(addQuiz)
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
this.setState({
  quizStructure:this.state.quizStructure,
  triggerFromDeleteButton:false
})
}
updateAddOption(addOption,questionNumber){
  var choiceNumber=this.state.quizStructure.find(q=>q.questionNumber==questionNumber).answerChoices.length+1
  addOption.answerNumber=this.state.quizStructure.find(q=>q.questionNumber==questionNumber).answerChoices.length+1
  addOption.answerName="Answer Choice "+ choiceNumber
this.state.quizStructure.find(q=>q.questionNumber==questionNumber).answerChoices.push(addOption)
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
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
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
  this.setState({
    quizStructure:this.state.quizStructure,
    triggerFromDeleteButton:true,
    selectedQuestion:this.state.quizStructure[0]
  })
  
}
triggerDeleteOptions(deletedListOptions,questionDetails){
var answerChoices=this.state.quizStructure.find(q=>q.questionNumber==questionDetails.questionNumber).answerChoices
  for(var i=0;i<deletedListOptions.length;i++){
  for(var j=0;j< answerChoices.length;j++){
    if(  answerChoices[j].answerNumber==deletedListOptions[i]){
      answerChoices.splice(j,1)
    }
  }
}
answerChoices.forEach((answer,index)=>{
    answer.answerNumber=index+1
})
  localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
 this.setState({
    quizStructure:this.state.quizStructure,
    triggerFromDeleteButtonOptions:true
  })
}
saveImage(questionDetails){
  this.state.quizStructure.find(q=>q.questionNumber==questionDetails.questionNumber).image=questionDetails.image;
    localStorage.setItem('updatedQuizStructure',JSON.stringify(this.state.quizStructure))
  this.setState({
    quizStructure:this.state.quizStructure
  })
}
  render() {
    return (
      <div>
    	<Grid>
      <Row className="show-grid" id="quizBorder">
        <div className="col-6" id="leftPane">
        <LeftPane questions={this.state.quizStructure} renderRightPane={this.renderRightPane} updateAddQuiz={this.updateAddQuiz} triggerDelete={this.triggerDelete} triggerFromDeleteButton={this.state.triggerFromDeleteButton}/>
    </div>
    <div className="col-6" id="rightPane">
    <RightPane selectedQuestion={this.state.selectedQuestion} saveImage={this.saveImage} updateQuestionValue={this.updateQuestionValue} triggerDeleteOptions={this.triggerDeleteOptions} triggerFromDeleteButtonOptions={this.state.triggerFromDeleteButtonOptions} updateAddOption={this.updateAddOption} updateAnswerValue={this.updateAnswerValue}/>
    </div>
      </Row>
      </Grid>
       </div>
    );
  }
}

export default Quiz;
