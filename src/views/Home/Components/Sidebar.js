import { Button, Row, Col } from "react-bootstrap"
import './Sidebar.scss'
import { authActions, uploadActions } from "../../../application/store/actions";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";


const Sidebar = () => {
    const dispatch = useDispatch();
    const auth = getAuth();

    const { signout } = bindActionCreators(authActions, dispatch);
    //Init navigation
    const navigate = useNavigate();
    //sign the user out
    const signUserOut = () => {
        signout(auth);
        navigate('/login')
    }
    return (
        <Col xs="2" className="align-content-center sidebar">
          
              
                    <h2>Blitscloud</h2>
                    <Button onClick={signUserOut} variant="secondary" >Sign out</Button>

             
        </Col>

    )


}

export default Sidebar