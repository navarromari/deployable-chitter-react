import axiosMock from "axios";

import * as api from "../asyncFunctions/chitterAPICalls";

import mockPeeps from "../../public/mockPeeps.json";

import PeepModel from "../Components/utils/Peep.model";

jest.mock("axios");

const testError = { message: `Test Error` };
let functionResult;

describe("getPeeps tests", () => {
  describe("Normal data returned", () => {
    const expectedReturn = { peeps: mockPeeps, status: 200 };
    const resolvedRequestWithData = { data: mockPeeps, status: 200 };

    beforeEach(async () => {
      axiosMock.get.mockResolvedValueOnce(resolvedRequestWithData);
      functionResult = await api.getPeeps();
    });

    test("should make a get request via axios", () => {
      expect(axiosMock.get).toHaveBeenCalledTimes(1);
      expect(axiosMock.get).toHaveBeenCalledWith("mockPeeps.json"); //Change this test when data path change
    });

    test("should return peeps when valid data is returned from server", () => {
      expect(functionResult).toStrictEqual(expectedReturn);
    });
  });

  describe("Empty array returned", () => {
    test("should throw error when empty array is returned from server", async () => {
      const returnedError = {
        peeps: [],
        status: 204,
        error: {
          type: `get`,
          message: `Data not available from the server: There are no peeps to retrieve, please add one`,
        },
      };

      axiosMock.get.mockResolvedValueOnce({ data: [], status: 204 });
      functionResult = await api.getPeeps();

      expect(functionResult).toStrictEqual(returnedError);
    });
  });

  describe("Error returned", () => {
    test("should return appropriate error message when error is returned from server", async () => {
      const message = `Data not available from the server: ${testError.message}`;
      const expectedReturn = {
        peeps: [],
        status: 400,
        error: {
          type: `get`,
          message,
        },
      };

      axiosMock.get.mockRejectedValueOnce({
        response: { status: 400, message: `Test Error` },
      });
      functionResult = await api.getPeeps();

      expect(functionResult).toStrictEqual(expectedReturn);
    });
  });
});

describe("submitPeep tests", () => {
  const testNewPeep = new PeepModel(
    `Mariana`,
    `2019-11-27T15:30:00.000Z`,
    `Peep Sample Message`,
    `1`
  );

  describe("Base Request", () => {
    beforeEach(() => {
      api.submitPeep(testNewPeep);
    });

    test("should have made a post request to axios", () => {
      expect(axiosMock.post).toHaveBeenCalledTimes(1);
    });

    test('should make a request to the "/add" url with the peep to add', () => {
      expect(axiosMock.post).toHaveBeenCalledWith(
        `${process.REACT_APP_CHITTERURL}/add`,
        testNewPeep
      );
    });
  });

  describe("Successful POST requests", () => {
    //write tests for a successful POST request
  });

  describe("Unsuccessful POST requests", () => {
    test.skip("should return an error property in the response when unsuccessful POST is made", async () => {
      const expectedResponse = {
        response: { status: 400, message: testError.message },
      };
      const expectedReturn = {
        status: 400,
        error: { type: `post`, message: testError.message },
      };

      axiosMock.post.mockRejectedValueOnce(expectedResponse);
      functionResult = await api.submitPeep(testNewPeep);

      expect(functionResult).toStrictEqual(expectedReturn);
    });
  });
});
