import React from 'react';
import axios from 'axios';
import { withAuth0 } from '@auth0/auth0-react';
import Button from 'react-bootstrap/Button';
import CardColumns from 'react-bootstrap/CardColumns';
import Card from 'react-bootstrap/Card';
import BookFormModel from './BookFormModel';
import UpdateBooks from './UpdateBooks';

let server = process.env.REACT_APP_SERVER_URL


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
            showUpdateForm:false,
            books: [],
            bookName: "",
            index: 0,
            bookDiscription: "",
            bookImageUrl: "",
            showBooksComponent: false,
            showModel: false,
            showUpdates: false
        }
    }


    componentDidMount = async () => {

        // const {user} = this.props.auth0;
        const books = await axios.get(`${server}/books`, { params: { email: this.props.auth0.user.email } });

        this.setState({
            books: books.data,
            showBooksComponent: true,
        });
    }




    addBooks = async (event) => {
        event.preventDefault();

        const bookFormData = {
            bookName: this.state.bookName,
            bookDiscription: this.state.bookDiscription,
            bookImageUrl: this.state.bookImageUrl,
            email: this.props.auth0.user.email

        }

        const newBook = await axios.post(`${server}/addBooks`, bookFormData)

        this.setState({
            books: newBook.data,

        })
    }


    updateBookName = (event) => {
        this.setState({
            bookName: event.target.value
        })
    }

    updateBookDiscription = (event) => {
        this.setState({
            bookDiscription: event.target.value
        })
    }

    updateBookImageUrl = (event) => {
        this.setState({
            bookImageUrl: event.target.value
        })
    }


    handleShowUpdate = () => {
        this.setState({
            showUpdateForm:true, 
        })
    }

    handleCloseUpdate =() => {
        this.setState({
            showUpdates:false,
        })
    }

    handleShow = () => {
        this.setState({
            show: true,
        
        })
    }

    handleClose = () => {
        this.setState({
            show: false,
        })
    }

    deleteBook = async (index) => {
        const email = {
            email: this.props.auth0.user.email
        }

        let newBookreq = await axios.delete(`${server}/deleteBook/${index}`, { params: email })

        this.setState({
            books: newBookreq.data
        })
    }

    updateBooks = async (event) => {
        event.preventDefault();

        const updateBooks = {
            name: this.state.bookName,
            discription: this.state.bookDiscription,
            imge: this.state.bookImageUrl,
            email: this.props.auth0.user.email
        }
        let updatedData = await axios.put(`${server}/updateBook/${this.state.index}`, updateBooks)

        this.setState({
            books: updatedData.data,
            showUpdates:false
        })

    }

    showUpdatedBooks = (idx) => {

        const selectedBook = this.state.books.filter((value, index) => {
            return idx === index;
        })

        this.setState({
            showUpdates: true,
            index: idx,
            bookName: selectedBook[0].name,
            bookDiscription: selectedBook[0].discription,
            bookImageUrl: selectedBook[0].imge

        })


    }



    // const books = await axios.get('http://localhost:3001/books', { params: { email: this.props.auth0.user.email } })
    // console.log('books', books.data)
    // this.setState({
    //   books: books.data,

    render() {
        return (
            <>

                <Button variant="primary" onClick={this.handleShow} >
                    Add Book
              </Button>

                <BookFormModel
                    showvalue={this.state.show}
                    hideValue={this.handleClose}
                    updateBookName={this.updateBookName}
                    updateBookDiscription={this.updateBookDiscription}
                    updateBookImageUrl={this.updateBookImageUrl}
                    addBooks={this.addBooks}
                />


                 <UpdateBooks
                    showvalueUpdate={this.state.showUpdateForm}
                    showUpdates={this.state.showUpdates}
                    handleCloseUpdate={this.handleCloseUpdate}
                    updateBookName={this.updateBookName}
                    updateBookDiscription={this.updateBookDiscription}
                    updateBookImageUrl={this.updateBookImageUrl}
                    updateBooks={this.updateBooks}
                />



                {this.state.showBooksComponent &&
                    <CardColumns>

                        {this.state.books.map((item, idx) => {
                            return (
                                <div key={idx}>
                                    <Card style={{ width: '18rem' }}>
                                        <Card.Img variant="top" src={item.imge} style={{ width: '15rem', height: '16rem', margin: 'auto' }} />
                                        <Card.Body>
                                            <Card.Title>{item.name}</Card.Title>
                                            <Card.Text style={{ overflow: 'auto', height: '5rem' }}>
                                                {item.dicription}
                                            </Card.Text>
                                            <Button variant="primary" onClick={() => this.deleteBook(idx)}>Delete</Button>
                                            <br/>


                              

                                            <Button variant="primary" onClick={() => this.showUpdatedBooks(idx)}>Update</Button>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })
                        }
                    </CardColumns >


                }

            </>
        )
    }



}

export default withAuth0(BestBooks);