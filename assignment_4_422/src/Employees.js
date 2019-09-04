import React,{Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import MainContainer from './MainContainer';

class Employees extends Component{

    constructor(){
        super();
        this.state={
            employees: []
        }
    }
    componentDidMount(){
        axios.get("https://calm-refuge-91872.herokuapp.com/employees").then((res)=>{
            this.setState({
                employees: res.data,
                dataLoaded: true
            })
        })
        
        }


render(){
    return (
        <MainContainer sidebar={this.props.title}>
            <h1 className="page-header">{this.props.title}</h1>
            <table className="table table-striped table-bordered">
                <tbody>
                    <tr>
                        <th>Name & Position</th>
                        <th>Addresss</th>
                        <th>Phone Num</th>
                        <th>Hire Date</th>
                        <th>Salary Bonus</th>
                    </tr>
                    {this.state.employees.map((employee, index) => {
                        return (
                            <tr>
                                <td key={index}>{employee.FirstName} {employee.LastName}-{employee.Position.PositionName}</td>
                                <td key={index}>{employee.AddressStreet}, {employee.AddressCity}, {employee.AddressState}, {employee.AddressZip}</td>
                                <td key={index}>{employee.PhoneNum} ext {employee.Extension}</td>
                                <td key={index}>{moment(employee.HireDate).format('LL')}</td>
                                <td key={index}>${employee.SalaryBonus}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </MainContainer>
    )
}
}

export default Employees;