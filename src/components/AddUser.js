import React,{useState} from 'react';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import SimpleModal from './SimpleModal'


const AddUser = ({setUserInfo, history}) => {

   const [userState, setUserState] = useState({userData :{}, showModal:false})

    const handleChange = e => {
        const newData = {...userState.userData}
        newData[e.target.name] = e.target.value
        setUserState({ userData : newData})
    }
    
   const  handleCloseModal = () => {
      setUserState({ showModal:false })
    }

      const onSubmit = e =>{
        e.preventDefault();
       axios.post('/users' ,{
           ...userState.userData
       })
       .then(res => {
         setUserInfo(res.data.firstName +" "+ res.data.lastName)
         history.push("/listBooks");
       }).catch(() => {
     setUserState({ showModal: true })
  
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
                <input type="submit" value="Valider" className="btn btn-primary" />
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
         showModal={userState.showModal}
       ></SimpleModal>

       </>
    )
    
};
export default withRouter(AddUser);  