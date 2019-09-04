import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import {Link} from 'react-router-dom';

class ProjectsPanel extends Component{
    constructor(props){
        super(props);
        this.state={
projects: []
        }
    }
    componentDidMount(){
        axios.get("https://calm-refuge-91872.herokuapp.com/projects").then((res)=> {
            this.setState({
                projects: res.data,
                dataLoded: true
            });
        }).catch((err)=> {
            this.setState({
                dataLoded: true
            })
        });
    }
    render(){
        return(
        <div className="panel panel-default">
        <div className="panel-heading">
          <h3 className="panel-title">{this.props.title}</h3>
        </div>
        <div className="panel-body">
          <div className="table-responsive overview-table">
            <table className="table table-striped table-bordered">
              <tbody>
                  {this.state.projects.map((project,index)=>{
                      var days = moment().diff([project.ProjectStartDate], 'days');
                  return(
                <tr>
                  <td key={index}>{project.ProjectName}</td>
                  <td key={index}>Active {days} days</td>
                </tr>
                  );
                })}
                 </tbody>
            </table>
          </div>
          <Link to="/projects" className="btn btn-primary form-control">View All Project Data</Link>
        </div>
      </div>
    
            
        )
    }
}
export default ProjectsPanel;