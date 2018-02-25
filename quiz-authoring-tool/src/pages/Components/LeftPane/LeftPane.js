import React, { Component } from 'react';
import { Row, Col,Grid,Button} from "react-bootstrap";
import styles from './LeftPane.css';

class LeftPane extends Component {
	constructor(){
		super()
		this.handleAdd=this.handleAdd.bind(this)
		this.handleDelete=this.handleDelete.bind(this)
	}
	componentDidMount(){

	}
	handleClick(self){
			self.props.renderRightPane(this)
	}
	handleAdd(){
		var addQuiz={
      questionNumber:"",
     questionName:"",
     answerChoices:[{
      answerNumber:1,
      answerName:""
     },{
      answerNumber:2,
      answerName:""
      
     },{
        answerNumber:3,
      answerName:""
    
     }] 
    }
			this.props.updateAddQuiz(addQuiz)
	}
	handleDelete(){

	}
  render() {
  	var {questions}=this.props;
   return (
    <div>
   	<h3>Select your Questions</h3>
   	<div className="tab">
{questions!=null && questions.map(questionObj=>{
	return(
		   	<button className="tablinks" onClick={this.handleClick.bind(questionObj,this)}><h5 id="questionName">{questionObj.questionNumber}{"."}{questionObj.questionName}</h5></button>
   	);
   	})}
   	</div>
   			<Row clasName="show-grid" style={{    marginTop: 20}}>
					<Col md={4}>
  <Button onClick={this.handleAdd} bsStyle="primary">ADD</Button>
					</Col>
					<Col md={1}>
  <Button onClick={this.handleDelete} bsStyle="primary">DELETE</Button>
					</Col>
					</Row>
			
    </div>
    );
  }
}

export default LeftPane;
