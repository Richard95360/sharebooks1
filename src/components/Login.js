import React,{Component} from 'react'
import axios from 'axios'
import { Link, withRouter } from "react-router-dom";
import logo from '../media/logo.jpg';
import SimpleModal from './SimpleModal'



class Login extends Component {

    constructor() {
        super();
        this.state = { userData: {}, showModal: false }
        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
    }

    handleChange (event) {
        let currentState = {...this.state.userData};
        currentState[event.target.name] = event.target.value;
        this.setState({ userData: currentState })
    }

    onSubmit (event) {
        event.preventDefault();
        axios.post('/authenticate', {
            email: this.state.userData.email,
            password: this.state.userData.password
        }).then((response) => {
            this.props.setUserInfo(response.data.userName)
            this.props.history.push('/listBooks')
        }).catch(()=> {
            this.setState({showModal : true})
        })
    }

    handleCloseModal() {
        this.setState({showModal : false})
    }

    render() {

        const title = "Login incorrect";
        const bodyTxt = "Votre Login ou mot de passe est incorrect"
       
        return (

          
            <>
            <div className="login-container">
                <div>
                    <div>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="title">
                        Bienvenue sur Sharebook!
                    </div>
                    <div className="form-container">
                        <form onSubmit={this.onSubmit}>
                            <span>Mail: </span>
                            <input type="text" className="form-control" name="email" onChange={this.handleChange}></input>
                            <span>Passsword: </span>
                            <input type="password" className="form-control" name="password" onChange={this.handleChange}></input>
                            <div className="text-center">
                                <input type="submit" className="btn btn-primary" value="OK" />
                            </div>
                        </form>
                    </div>
                    <div className="text-center"><Link to="/addUser">M'inscrire</Link></div>
                </div>
            </div>
            <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={this.handleCloseModal} showModal={this.state.showModal} />
       
          </>
        )
    }
}

export default withRouter(Login)  

/*  import React,{useState} from 'react';
import logo from '../media/logo.jpg'
import { Link , withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleModal from './SimpleModal'


const Login = ({setUserInfo, history}) => {
  
    const [userData, setUserData] = useState({})
    const [showModal, setShowModal] = useState(false)

   
  
    const handleChange = e => {
        const newData = {...userData}
        newData[e.target.name] = e.target.value
        setUserData({ newData })
    }


     const  handleCloseModal = () => {
  
       setShowModal(false)
      }
   

  const  onSubmit = e =>{
      e.preventDefault();
     axios.post('/authenticate',{
         email : userData.email,
         password : userData.password
     }).then(res => {
         setUserInfo(res.data.useName)
        history.push('/listBooks')
        }).catch((error)=> {
           setShowModal(true)
    })

    }


    const title = "Login incorrect";
    const bodyTxt = "Votre Login ou mot de passe est incorrect"

    return (
      
    
        <>
        
     <div className="login-container">
                <div>
                    <div>
                        <img src={logo} alt="Logo" />
                    </div>
                    <div className="title">
                        Bienvenue sur Sharebook!
                    </div>
                    <div className="form-container">
                        <form onSubmit={onSubmit}>
                            <span>Mail: </span>
                            <input type="text" className="form-control" name="email" onChange={handleChange}></input>
                            <span>Passsword: </span>
                            <input type="password" className="form-control" name="password" onChange={handleChange}></input>
                            <div className="text-center">
                                <input type="submit" className="btn btn-primary" value="OK" />
                            </div>
                        </form>
                    </div>
                    <div className="text-center"><Link to="/addUser">M'inscrire</Link></div>
                </div>
            </div>
            <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={handleCloseModal} showModal={showModal} />
       
        </>
    );
};

export default withRouter(Login);   */