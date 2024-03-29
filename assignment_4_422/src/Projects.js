import React,{Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import MainContainer from './MainContainer';

class Projects extends Component{

    constructor(){
        super();
        this.state={
            projects: []
        }
    }
    componentDidMount(){
        axios.get("https://calm-refuge-91872.herokuapp.com/projects").then((res)=>{
            this.setState({
                projects: res.data,
                dataLoaded: true
            })
        })
        
        }


render()
{
    return(
<MainContainer sidebar={this.props.title}>
 <h1 className="page-header">{this.props.title}</h1>
 <div className="row">
<table className="table table-striped table-bordered">
<tbody>
    <tr>
        <th>Name</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            </tr>
            {this.state.projects.map((project,index)=>{
                return(
                    <tr>
                    <td key={index}>{project.ProjectName}</td>
                    <td key={index}>{project.ProjectDescription}</td>
                    <td key={index}>{moment(project.StartDate).format('LL')}</td>
                    <td key={index}>{(project.ProjectEndDate == null ? 'n/a' : moment(project.StartDate).format('LL'))}</td>
                    </tr>
                )
            })}


    </tbody> 
 </table>
  </div>
</MainContainer>
    )
}
}
export default Projects;