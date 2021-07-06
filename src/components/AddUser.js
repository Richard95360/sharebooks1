import axios from 'axios';
import React,{ Component } from 'react'
import { Link, withRouter } from "react-router-dom";
import SimpleModal from './SimpleModal'

class AddUser extends Component {

  constructor() {
    super();
    this.state = { userData: {}, showModal: false}
  }

  handleChange = (event) => {
    let currentState = { ...this.state.userData };
    currentState[event.target.name] = event.target.value;
    this.setState({ userData: currentState })
  }

  handleCloseModal = () => {
    this.setState({ showModal: false })
  }
 

  onSubmit = (event) => {
    event.preventDefault();
    axios.post('/users', {
      ...this.state.userData
    }).then(response => {
      this.props.setUserInfo(response.data.firstName + " " + response.data.lastName);
      this.props.history.push("/listBooks")
    }).catch(error => {
      this.setState({ showModal: true })
    })
  }


  render() {
    return (
      <>
        <div className="add-user-container">
          <div>
            <h1>M'inscrire</h1>
            <div>
              <form onSubmit={this.onSubmit}>
                <div>
                  <label>email</label>
                  <input name="email" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>nom</label>
                  <input name="lastName" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>prenom</label>
                  <input name="firstName" type="text" className="form-control" onChange={this.handleChange} />
                </div>
                <div>
                  <label>password</label>
                  <input name="password" type="password" className="form-control" onChange={this.handleChange} />
                </div>
                <div className="container-valid text-center">
                  <input type="submit" value="Valider" className="btn btn-primary" onChange={this.handleChange} />
                </div>
              </form>
            </div>
            <div><Link to="/">Retour à l'accueil</Link></div>
          </div>
        </div>
        <SimpleModal
          title={"Mail déja utilisé"}
          bodyTxt={"Cet email est déja utilisé, merci d'en saisir un autre"}
          handleCloseModal={this.handleCloseModal}
          showModal={this.state.showModal}
        ></SimpleModal>
       
      </>
    )
  }
}

export default withRouter(AddUser) 

/*  import React,{useState} from 'react';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleModal from './SimpleModal'


const AddUser = ({setUserInfo, history}) => {

    const [userData, setUserData] = useState({})
    const [showModal, setShowModal] = useState(false)


  

    const handleChange = e => {
        const newData = {...userData}
        newData[e.target.name] = e.target.value
        setUserData({ newData})
    }

   const  handleCloseModal = () => {
      setShowModal(false)
    }

      const  onSubmit = e =>{
        e.preventDefault();
       axios.post('/users' ,{
           ...userData
       })
       .then(res => {
         setUserInfo(res.data.firstName +" "+ res.data.lastName)
         history.push("/listBooks");
       }).catch(error => {
        setShowModal(!showModal)
  
      })

    }
     
  
  
    return (
      <>
        <div className="add-user-container">
        <div>
          <h1>M'inscrire</h1>
          <div>
            <form onSubmit={onSubmit}>
              <div>
                <label>email</label>
                <input name="email" type="text" className="form-control" onChange={handleChange} />
              </div>
              <div>
                <label>nom</label>
                <input name="lastName" type="text" className="form-control" onChange={handleChange} />
              </div>
              <div>
                <label>prenom</label>
                <input name="firstName" type="text" className="form-control" onChange={handleChange} />
              </div>
              <div>
                <label>password</label>
                <input name="password" type="password" className="form-control" onChange={handleChange} />
              </div>
              <div className="container-valid text-center">
                <input type="submit" value="Valider" className="btn btn-primary" onChange={handleChange} />
              </div>
            </form>
          </div>
          <div><Link to="/">Retour à l'accueil</Link></div>
        </div>
      </div>
         <SimpleModal
         title={"Mail déja utilisé"}
         bodyTxt={"Cet email est déja utilisé, merci d'en saisir un autre"}
         handleCloseModal={handleCloseModal}
         showModal={showModal}
       ></SimpleModal>

       </>
    )
    
};

export default withRouter(AddUser);   */