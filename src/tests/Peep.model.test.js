import PeepModel from "../Components/utils/Peep.model";

describe("PeepModel tests", () => {
  const [peepAuthor, peepDateCreated, peepMessage, _id] = [
    `Mariana`,
    `2019-11-27T15:30:00.000Z`,
    `Peep Sample Message`,
    `1`,
  ];

  test("creates the expected object", () => {
    const testPeep = new PeepModel(
      peepAuthor,
      peepDateCreated,
      peepMessage,
      _id
    );
    expect(testPeep.peepAuthor).toBe(peepAuthor);
    expect(testPeep.peepDateCreated).toBe(peepDateCreated);
    expect(testPeep.peepMessage).toBe(peepMessage);
    expect(testPeep._id).toBe(_id);
    expect(testPeep).toBeInstanceOf(PeepModel);
  });
});
