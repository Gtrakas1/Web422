import React, {Component} from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

class TeamsPanel extends Component{
    constructor(props){
        super(props);
        this.state={
            teams: []

        }
    }
    componentDidMount(){
        axios.get("https://calm-refuge-91872.herokuapp.com/teams").then((res)=>{
            this.setState({
                teams: res.data,
                dataLoaded: true
            })
        })
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
                                {this.state.teams.map((team, index) => {
                                    return (
                                        <tr>
                                            <td key={index}>{team.TeamName}</td>
                                            <td key={index}>{team.Employees.length} Employees</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                    <Link to="/teams" className="btn btn-primary form-control">View All Teams Data</Link>
                </div>
            </div>    )
    }
}
export default TeamsPanel;