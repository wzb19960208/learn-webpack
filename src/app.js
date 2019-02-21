import React , {Component} from 'react';

class TodoList extends Component{

    constructor(props){
        super(props);
        this.state = {
            content:'',
            array:[]
        }
        this.change = this.change.bind(this);
    }

    change(data){
        this.setState({
            content:data
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
                <input value={this.state.content} onChange={this.change}/>
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