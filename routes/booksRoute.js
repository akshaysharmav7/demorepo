import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

//Creating new Book  in db
router.post("/", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response.status(400).send({
        message: "Send all required fields!",
      });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };

    const book = await Book.create(newBook);

    return response.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Retrieving all the books from db
router.get("/", async (request, response) => {
  try {
    const books = await Book.find({});
    return response.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Retriving book by id
router.get("/:id", async (request, response) => {
  // semicolon is used to write dynamic value in a url ':id'
  try {
    const { id } = request.params; //params is a way to capture dynamic values from URLs

    const books = await Book.findById(id);
    return response.status(200).json(books);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

//Updating book by id
router.put("/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      return response
        .status(400)
        .send({ message: "please fill all the details" });
    }

    const { id } = request.params;
    const book = await Book.findByIdAndUpdate(id, request.body);

    if (!book) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(200).send({ message: "Book updated successfully!" });
  } catch (error) {
    console.log(error.message);
    return response.status(500).send({ message: error.message });
  }
});

//Deleting book by id
router.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);

    if (!result) {
      return response.status(404).json({ message: "Book not found!" });
    }
    return response.status(204).send()
    
  } catch (error) {
    console.log(error.message);
    
    return response.status(500).json({ message: "Theres an error" });
  }
});

export default router;