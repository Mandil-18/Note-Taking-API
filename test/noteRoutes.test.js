// test/noteRoutes.test.js
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app'); // Replace with the actual path to your app.js

chai.use(chaiHttp);
const expect = chai.expect;

describe('Note API', () => {
  let noteId; // To store the ID of a note created during testing

  // Test the POST endpoint
  describe('POST /notes', () => {
    it('should create a new note', async () => {
      const response = await chai
        .request(app)
        .post('/notes')
        .send({ title: 'Test Note', content: 'This is a test note.' });

      expect(response).to.have.status(201);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('title', 'Test Note');
      expect(response.body).to.have.property('content', 'This is a test note');

      // Save the noteId for later use
      noteId = response.body._id;
    });

    it('should return an error when title is missing', async () => {
      const response = await chai
        .request(app)
        .post('/notes')
        .send({ content: 'This is a test note.' });

      expect(response).to.have.status(400);
      expect(response.body).to.have.property('error', 'Title and content are required.');
    });
  });

  // Test the GET endpoints
  describe('GET /notes', () => {
    it('should retrieve all notes', async () => {
      const response = await chai.request(app).get('/notes');

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('array');
    });

    it('should retrieve a single note', async () => {
      const response = await chai.request(app).get(`/notes/${noteId}`);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('_id', noteId);
    });

    it('should return an error for a non-existent note', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';
      const response = await chai.request(app).get(`/notes/${nonExistentNoteId}`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property('error', 'Note not found.');
    });
  });

  // Test the PUT endpoint
  describe('PUT /notes/:id', () => {
    it('should update an existing note', async () => {
      const updatedNote = { title: 'Updated Test Note', content: 'This is an updated test note.' };
      const response = await chai
        .request(app)
        .put(`/notes/${noteId}`)
        .send(updatedNote);

      expect(response).to.have.status(200);
      expect(response.body).to.be.an('object');
      expect(response.body).to.have.property('_id', noteId);
      expect(response.body).to.have.property('title', updatedNote.title);
      expect(response.body).to.have.property('content', updatedNote.content);
    });

    it('should return an error for a non-existent note', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';
      const response = await chai
        .request(app)
        .put(`/notes/${nonExistentNoteId}`)
        .send({ title: 'Updated Note', content: 'This is an updated note.' });

      expect(response).to.have.status(404);
      expect(response.body).to.have.property('error', 'Note not found.');
    });
  });

  // Test the DELETE endpoint
  describe('DELETE /notes/:id', () => {
    it('should delete an existing note', async () => {
      const response = await chai.request(app).delete(`/notes/${noteId}`);

      expect(response).to.have.status(200);
      expect(response.body).to.have.property('message', 'Note deleted successfully.');
    });

    it('should return an error for deleting a non-existent note', async () => {
      const nonExistentNoteId = 'nonexistentnoteid';
      const response = await chai.request(app).delete(`/notes/${nonExistentNoteId}`);

      expect(response).to.have.status(404);
      expect(response.body).to.have.property('error', 'Note not found.');
    });
  });
});
