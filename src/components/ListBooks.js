/* 
import React,{Component} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {

  constructor() {
    super();
    this.state = {
      books: []
    }
  }

  componentDidMount() {
   axios.get(`/books?status=FREE`).then(response => {
     this.setState({books: response.data})
   })
  }

  borrowBook(bookId) {
    axios.post(`/borrows/${bookId}`, {}).then(()=> {
      this.props.history.push('/myBorrows')
    })
  }

  render() {
    return <div>
      <h1>Livres disponibles</h1>
      <div className="list-container">
        {this.state.books.length === 0 ? "Pas de livres disponibles" : null}
        {this.state.books.map(book => (<div className="list-book-container">
        <Book title={book.title} category={book.category.label} lender={`${book.user.firstName} ${book.user.lastName}`} />
          <button className="btn btn-primary btn-sm" onClick={() => this.borrowBook(book.id)}>Emprunter</button>
        </div>
        ))}
      </div>
    </div>
  }
}
export default withRouter(ListBooks) */

 import axios from 'axios';
import React,{useState,useEffect} from 'react';
import { withRouter, useHistory } from 'react-router';
import Book from './Book';



const ListBooks = () => {

    const [books, setBooks] = useState([])

    console.log(books);

    const history = useHistory();

    
    useEffect(() => {
       axios.get('/books?status=FREE')
       .then(res => {
         setBooks(res.data);
       })
    })

const borrowBook = (bookId) => {
  axios.post(`/borrows/${bookId}`,{}).then(() =>{
    history.push('/myBorrows')

  })
}

    return (
    <div>
      <h1>Livres disponibles</h1>
      <div className="list-container">
        {books.length === 0 ? "Pas de livres disponibles" : null}
        {books.map(book => (<div className="list-book-container">
        <Book title={book.title} category={book.category.label} lender={`${book.user.firstName} ${book.user.lastName}`} />
          <button className="btn btn-primary btn-sm" onClick={() => borrowBook(book.id)}>Emprunter</button>
        </div>
        ))}
      </div>
    </div>
       
    );
};

export default withRouter(ListBooks); 