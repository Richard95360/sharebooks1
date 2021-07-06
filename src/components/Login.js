import React,{useState} from 'react';
import logo from '../media/logo.jpg'
import { Link , withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleModal from './SimpleModal'


const Login = ({setUserInfo, history}) => {
  
    const [userState, setUserState] = useState({userData :{}, showModal:false})

    const handleChange = e => {
        const newData = {...userState.userData}
        newData[e.target.name] = e.target.value
        setUserState({userData : newData })
    }

     const  handleCloseModal = () => {
  
       setUserState({showModal:false})
      }
   
  const  onSubmit = e =>{
      e.preventDefault();
     axios.post('/authenticate',{
         email : userState.userData.email,
         password : userState.userData.password
     }).then(res => {
         setUserInfo(res.data.userName)
        history.push('/listBooks')
        }).catch(() => {
            setUserState({showModal:true})
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
            <SimpleModal title={title} bodyTxt={bodyTxt} handleCloseModal={handleCloseModal} showModal={userState.showModal} />
       
        </>
    );
};

export default withRouter(Login);     