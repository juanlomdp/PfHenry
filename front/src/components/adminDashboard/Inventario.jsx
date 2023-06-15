import React, { useEffect, useState } from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Table,
    Tabs,
    Tab,
    Modal,
} from "react-bootstrap";
import { FormCreateBook } from "../formCreateBook/formCreateBook";
import FormEditBook from "./FormEditBook";
import { useDispatch, useSelector } from "react-redux";
import { getAllBooks, deleteBook } from "../../redux/action";

const Inventario = () => {
    const books = useSelector((state) => state.allBooks);

    const libros = books.filter((book) => book.id !== 58)

    const allBooks = libros.sort((a, b) =>
        a.id > b.id ? 1 : -1
    )

    const [addBookModalShow, setAddBookModalShow] = useState(false);
    const [descriptionModalshow, setDescriptionModalshow] = useState(
        Array.from({ length: allBooks.length }, () => false)
    );
    const [editModalshow, seteditModalshowModalshow] = useState(
        Array.from({ length: allBooks.length }, () => false)
    );
    const [filterText, setFilterText] = useState("");
    const [filterGenre, setFilterGenre] = useState("");
    const [filterAuthor, setFilterAuthor] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllBooks());
        //console.log("se hace el dispatch para buscar allBooks");  
    }, [dispatch]);

    const handleGenreFilterChange = (e) => {
        const genreValue = e.target.value;
        setFilterGenre(genreValue);
    };

    const handleAuthorFilterChange = (e) => {
        const authorValue = e.target.value;
        setFilterAuthor(authorValue);
    };

    const handleFilterChange = (e) => {
        const inputValue = e.target.value;
        setFilterText(inputValue);

        const filteredBooks = allBooks.filter((book) => {
            const titleMatch = book.title
                .toLowerCase()
                .includes(inputValue.toLowerCase());
            const genreMatch = book.genders.some((genre) =>
                genre.toLowerCase().includes(filterGenre.toLowerCase())
            );
            const authorMatch = book.authors.some((author) =>
                author.toLowerCase().includes(filterAuthor.toLowerCase())
            );

            return titleMatch && genreMatch && authorMatch;
        });

        // setFilteredBooks(filteredBooks);
    };

    const filteredBooks = filterText
        ? allBooks.filter((book) =>
              book.title.toLowerCase().includes(filterText.toLowerCase())
          )
        : allBooks;

    const filteredBooksByGenre = filterGenre
        ? filteredBooks.filter((book) =>
              book.genders.some((genre) =>
                  genre.toLowerCase().includes(filterGenre.toLowerCase())
              )
          )
        : filteredBooks;

    const filteredBooksByAuthor = filterAuthor
        ? filteredBooksByGenre.filter((book) =>
              book.authors.some((author) =>
                  author.toLowerCase().includes(filterAuthor.toLowerCase())
              )
          )
        : filteredBooksByGenre;

    const addBookModal = () => {
        return (
            <Modal
                show={addBookModalShow}
                onHide={() => setAddBookModalShow(false)}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Agregar libro al inventario:
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormCreateBook/>
                </Modal.Body>
                {/* <Modal.Footer>
                    <Button onClick={() => setAddBookModalShow(false)}>Cerrar</Button>
                </Modal.Footer> */}
            </Modal>
        );
    };

    const descriptionModal = (bookIndex, book) => {
        return (
            <>
                <Button
                    variant="primary"
                    onClick={() => {
                        const updatedDescriptionModalshow = [
                            ...descriptionModalshow,
                        ];
                        updatedDescriptionModalshow[bookIndex] = true;
                        setDescriptionModalshow(updatedDescriptionModalshow);
                    }}
                >
                    Ver
                </Button>
                <Modal
                    show={descriptionModalshow[bookIndex]}
                    onHide={() => setDescriptionModalshow(bookIndex, false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton={false}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Descripción de {book.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{book.description}</Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                const otherUpdatedDescriptionModalshow = [
                                    ...descriptionModalshow,
                                ];
                                otherUpdatedDescriptionModalshow[
                                    bookIndex
                                ] = false;
                                setDescriptionModalshow(
                                    otherUpdatedDescriptionModalshow
                                );
                            }}
                        >
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    const editModal = (bookIndex, book) => {
        return (
            <>
                <Button
                    variant="primary"
                    onClick={() => {
                        const updatededitModalshow = [...editModalshow];
                        updatededitModalshow[bookIndex] = true;
                        seteditModalshowModalshow(updatededitModalshow);
                    }}
                >
                    Editar
                </Button>
                <Modal
                    show={editModalshow[bookIndex]}
                    onHide={() => seteditModalshowModalshow(bookIndex, false)}
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header closeButton={false}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Editando {book.title}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormEditBook book={book} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button
                            onClick={() => {
                                const newUpdatededitModalshow = [
                                    ...editModalshow,
                                ];
                                newUpdatededitModalshow[bookIndex] = false;
                                seteditModalshowModalshow(
                                    newUpdatededitModalshow
                                );
                            }}
                        >
                            Cerrar
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        );
    };

    const ableButtonHandler = async (bookId) => {
        //console.log("Estoy modificando el deleted de este libro: " + bookId )
        await deleteBook(bookId,dispatch)
        dispatch(getAllBooks());
    };

    const inventarioMap = filteredBooksByAuthor.map((book, index) => {
        return (
            <tr key={index}>
                <td>{book.id}</td>
                <td>
                    <img
                        style={{ width: "110px", height: "150px" }}
                        src={`${book.image}`}
                    />
                </td>
                <td>{book.title}</td>
                <td>
                    {book.authors.map((author, index) => {
                        return (
                            <div key={index}>
                                {author}
                                <br />
                            </div>
                        );
                    })}
                </td>
                <td>
                    {book.genders.map((genre, index) => {
                        return (
                            <div key={index}>
                                {genre}
                                <br />
                            </div>
                        );
                    })}
                </td>
                <td>{book.publisher}</td>
                <td>{descriptionModal(index, book)}</td>
                <td>{book.price}</td>
                <td>{book.stock}</td>
                <td>
                    {editModal(index, book)}
                    <Button
                        onClick={() => ableButtonHandler(book.id)}
                        variant={book.deleted ? "success m-2" : "danger m-2"}
                    >
                        {book.deleted ? "Habilitar" : "Deshabilitar"}
                    </Button>
                </td>
            </tr>
        );
    });

    return (
        <Container>
            <Row>
                <Col>
                    <h1>Gestión del Inventario</h1>
                    <p>
                        En este panel podrás ver el inventario completo, agregar
                        y editar los productos, además de habilitarlos y
                        deshabilitarlos.
                    </p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Button
                        variant="primary"
                        onClick={() => setAddBookModalShow(true)}
                        style={{ marginBottom: "15px", width: "100%" }}
                    >
                        AGREGAR LIBRO
                    </Button>
                    {addBookModal()}
                    <Tabs className="mb-3" fill>
                        <Tab eventKey="titulo" title="Filtrar por título">
                            <Form.Group
                                style={{ marginBottom: "15px" }}
                                controlId="filterInput"
                            >
                                <Form.Control
                                    type="text"
                                    value={filterText}
                                    onChange={handleFilterChange}
                                    placeholder="Escribí aquí para filtrar..."
                                    autoFocus
                                />
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="genero" title="Filtrar por género">
                            <Form.Group
                                style={{ marginBottom: "15px" }}
                                controlId="genreFilterInput"
                            >
                                <Form.Control
                                    type="text"
                                    value={filterGenre}
                                    onChange={handleGenreFilterChange}
                                    placeholder="Escribí aquí para filtrar..."
                                    autoFocus
                                />
                            </Form.Group>
                        </Tab>
                        <Tab eventKey="autor" title="Filtrar por autor">
                            <Form.Group controlId="authorFilterInput">
                                <Form.Control
                                    style={{ marginBottom: "15px" }}
                                    type="text"
                                    value={filterAuthor}
                                    onChange={handleAuthorFilterChange}
                                    placeholder="Escribí aquí para filtrar..."
                                    autoFocus
                                />
                            </Form.Group>
                        </Tab>
                    </Tabs>
                </Col>
            </Row>
            <Row>
                <Col className="d-flex justify-content-center text-center">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#Id</th>
                                <th>Portada</th>
                                <th>Título</th>
                                <th>Autor</th>
                                <th>Género</th>
                                <th>Editorial</th>
                                <th>Descripción</th>
                                <th>Precio</th>
                                <th>Stock</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>{inventarioMap}</tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};

export default Inventario;
