export default class PeepModel {
  constructor(peepAuthor, peepDateCreated, peepMessage, _id = null) {
    this.peepAuthor = peepAuthor;
    this.peepDateCreated = peepDateCreated;
    this.peepMessage = peepMessage;
    this._id = _id;
  }
}
