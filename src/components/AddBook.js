import {useParams, useHistory} from 'react-router-dom';
import { useState , useEffect} from 'react';
import axios from 'axios';


const AddBook= () => {

    let { bookId } = useParams();
    const [bookData, setBookData] = useState({})
    const [categoriesData, setCategoriesData] = useState([])
    const history = useHistory();

    useEffect(() => {
        const url = '/categories'
        axios.get(url)
        .then(res => {
        setCategoriesData(res.data)
        setBookData({
            title: '',
            catagoryId: res.data[0].id
          })
        })
        .then(() => {
            if (bookId) {
                axios.get(`/books/${bookId}`).then(response => {
                    setBookData({
                        title: response.data.title,
                        categoryId: response.data.category.id
                    })

                })
            }

        })

    
       
    }, [bookId])

    const onSubmit = (e) => {
        if(bookId){
            e.preventDefault();
           axios.put(`/books/${bookId}`, {
               ...bookData
           }).then(() => {
                //rediriger vers myBooks
                history.push('/myBooks')
           })

            
        }else {
            e.preventDefault();
           axios.post('/books', {
               ...bookData
           }).then(() => {
                //rediriger vers myBooks
                history.push('/myBooks')
           })

        }
    }

    const handleChange = e => {

      const newState = {...bookData}
       newState[e.target.name] = e.target.value;
        setBookData(newState)
        
    }

    return (
        <div className="container-add-book">
            <h1>Ajouter un livre</h1>
            <form onSubmit={onSubmit}>
                <div>
                    <label>Nom du livre</label>
                    <input name="title" value={bookData.title} type="test" onChange={handleChange} className="form-control"></input>
                </div>
                <div>
                    <label>Catégorie du livre</label>
                    <select name="categoryId" value={bookData.categoryId} onChange={handleChange} className="form-control">
                        {categoriesData.map(category => (
                            <option value={category.id} key={category.id}>{category.label}</option>
                        ))}
                    </select>
                </div>
                <div className="container-submit">
                    <input type="submit" value="Valider" className="btn btn-primary"></input>
                </div>
            </form>
        </div>
    );
};

export default AddBook;