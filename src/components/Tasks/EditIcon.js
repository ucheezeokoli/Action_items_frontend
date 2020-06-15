// NOT BEING USED

import React, { Component } from 'react';
import CreateSharpIcon from '@material-ui/icons/CreateSharp';
import { Link } from 'react-router-dom';



class EditIcon extends Component {

    // contructor() {
    //     super()
    //     this.state={
    //         show:false
    //     }
    // }
    

    // function EditWindow() {
    //     const [show, setShow] = useState(false);
    
    //     const handleClose = () => setShow(false);
    //     const handleShow = () => setShow(true);


    render(){
        return(

            <CreateSharpIcon className="editButton" />
            
        )
    }
}

export default EditIcon;
