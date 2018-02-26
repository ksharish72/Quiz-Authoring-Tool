import React, { Component } from 'react';
import { Row, Col,Grid,Button} from "react-bootstrap";
import styles from './LeftPane.css';
let deletedList=[]
class LeftPane extends Component {
	constructor(){
		super()
		this.handleAdd=this.handleAdd.bind(this)
		this.handleDeleteMode=this.handleDeleteMode.bind(this)
    this.handleCancelDelete=this.handleCancelDelete.bind(this)
    this.handleCheckBoxClick=this.handleCheckBoxClick.bind(this)
    this.handleDelete=this.handleDelete.bind(this)
    this.state={
      deleteMode:false
    }
	}
	componentDidMount(){
      deletedList=[]
	}
	handleClick(self){
			self.props.renderRightPane(this)
	}
  handleDelete(){
    this.props.triggerDelete(deletedList)
  }
	handleAdd(){
		var addQuiz={
      questionNumber:"",
     questionName:"New Question",
     image:"",
     answerChoices:[{
      answerNumber:1,
      answerName:"Answer Choice 1"
     },{
      answerNumber:2,
      answerName:"Answer Choice 2"
      
     },{
        answerNumber:3,
      answerName:"Answer Choice 3"
    
     }] 
    }
			this.props.updateAddQuiz(addQuiz)
	}
  handleCancelDelete(){
    deletedList=[]
    this.setState({
      deleteMode:false
    })
  }
	handleDeleteMode(){
    this.setState({
    deleteMode:true
  })
	}
  handleCheckBoxClick(event){
      deletedList.push(event.target.value)
      console.log(event.target.value)
    console.log('checkboxcick')
  }
  componentWillReceiveProps(nextProps){
    if(nextProps.triggerFromDeleteButton){
    deletedList=[]
    this.setState({
      deleteMode:false
    })  
    }
    
  }
  render() {
  	var {questions}=this.props;
   return (
    <div>
   	<h3>{this.state.deleteMode ? "Select Questions to be Deleted" : "Select your Questions"}</h3>
   	<div className="tab">
{questions!=null && questions.map(questionObj=>{
	return(
  <div>{this.state.deleteMode && <label class="checkcontainer">
 
         <input type="checkbox" value={questionObj.questionNumber} onChange={this.handleCheckBoxClick} id="checkcheckbox"/>
           <span class="checkcheckmark"></span>
           </label>
  }
  <button className="tablinks" onClick={this.handleClick.bind(questionObj,this)}><h5 id="questionName">{questionObj.questionNumber}{".  "}{questionObj.questionName}</h5></button>
   </div>
   	);
   	})}
   	</div>
    {this.state.deleteMode ?    <Row clasName="show-grid" style={{    marginTop: 20}}>
          <Col md={4}>
  <Button onClick={this.handleDelete} bsStyle="danger">DELETE</Button>
          </Col>
          <Col md={1}>
  <Button onClick={this.handleCancelDelete} bsStyle="primary">CANCEL</Button>
          </Col>
          </Row>:
              <Row clasName="show-grid" style={{    marginTop: 20}}>
          <Col md={4}>
  <Button onClick={this.handleAdd} bsStyle="primary">ADD</Button>
          </Col>
          <Col md={1}>
  <Button onClick={this.handleDeleteMode} bsStyle="primary">DELETE</Button>
          </Col>
          </Row>
 
        }
   	
	     
    </div>
    );
  }
}

export default LeftPane;
