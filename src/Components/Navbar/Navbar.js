import { Component } from "react";
import { GraphAlgorithms, MazeAlgorithms, speed } from "./Data";
import { Dropdown } from "./Dropdown";
import "./Navbar.css";
export class Navbar extends Component {
    constructor({ data }) {
        super();
        this.mainHandler = data.handler;
        this.state = {
            dropdown1: false,
            dropdown2: false,
            dropdown3: false,
        };
        this.handleWindowClickEvent = this.handleWindowClikcEvent.bind(this);

    }
    componentDidMount() {
        console.log(this.mainHandler)
        window.addEventListener('click', this.handleWindowClickEvent);
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClickEvent);
    }


    render() {
        return (
            <nav className="navbar">
                <h1 className="title">pathfinding visualizer</h1>
                <ul className="nav-links">
                    <li className="dropdown">
                        <a href="#" className="algorithm-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                        {/* dropdown */}
                        <Dropdown
                            data={{
                                list: GraphAlgorithms,
                                toggleDropdown: this.state.dropdown1,
                                extacssClass: '',
                                handler: this.mainHandler
                            }
                            } />
                    </li>
                    <li className="dropdown">
                        <a href="#" className="maze-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>Maze Algorithm's<i className="fa-solid fa-caret-down"></i></a>
                        {/* dropdown */}
                        <Dropdown
                            data={{
                                list: MazeAlgorithms,
                                toggleDropdown: this.state.dropdown2,
                                extacssClass: '',
                                handler: this.mainHandler
                            }
                            } />
                    </li>
                    <li id="visualizebtn"><a href="#" >visualize Algorithm</a></li>
                    <li><a href="#">Clear Board</a></li>
                    <li><a href="#">Clear Paths & walls</a></li>
                    <li className="dropdown">
                        <a href="" className="speed-dropbtn"
                            onClick={e => { this.handleDropDown(e) }}>speed : {`Normal`}<i className="fa-solid fa-caret-down"></i></a>
                        <Dropdown
                            data={{
                                list: speed,
                                toggleDropdown: this.state.dropdown3,
                                extacssClass: 'horizontal',
                                handler: this.mainHandler
                            }
                            } />
                    </li>
                </ul>
            </nav >
        );
    }

    //toggle dropdown
    handleDropDown(e) {
        e.preventDefault();
        if (e.target.matches('.algorithm-dropbtn'))
            this.setState({ dropdown1: !this.state.dropdown1 })
        if (e.target.matches('.maze-dropbtn'))
            this.setState({ dropdown2: !this.state.dropdown2 })
        if (e.target.matches('.speed-dropbtn'))
            this.setState({ dropdown3: !this.state.dropdown3 })
    }
    //window event to close Dropedown
    handleWindowClikcEvent(e) {
        if (!e.target.matches('.algorithm-dropbtn'))
            this.setState({ dropdown1: false })
        if (!e.target.matches('.maze-dropbtn'))
            this.setState({ dropdown2: false })
        if (!e.target.matches('.speed-dropbtn'))
            this.setState({ dropdown3: false })

    }
}