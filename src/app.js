import React , {Component} from 'react';
import './asset/css/app.css'

class TodoList extends Component{

    constructor(props){
        super(props);
        this.state = {
            content:'',
            array:[]
        }
        this.change = this.change.bind(this);
        this.click = this.click.bind(this);
    }

    change(e){
        this.setState({
            content:e.target.value
        })
    }

    click(){
        var newArray = JSON.parse(JSON.stringify(this.state.array));
        newArray.push(this.state.content);
        this.setState({
            array:newArray
        })
    }

    render(){
        return(
            <div>
                <input className='border' value={this.state.content} onChange={this.change}/>
                <button onClick={this.click} >Click Me!</button>
                <ul>
                    {this.state.array.map((item)=>{
                        return <li>{item}</li>
                    })}
                </ul>
            </div>
        )
    }

}

export default TodoList;