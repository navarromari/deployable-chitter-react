import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import AddPeep from "../Components/AddPeep";

describe("AddPeep", () => {
  test("should submit peep when form is submitted", () => {
    const submitActionMock = jest.fn();
    const user = {
      username: "testuser",
    };
    const { getByText, getByTestId } = render(
      <AddPeep submitAction={submitActionMock} user={user} />
    );
    const messageTextarea = getByTestId("message-textarea");
    const addButton = getByText(/add peep/i);

    fireEvent.change(messageTextarea, {
      target: { value: "Test peep message" },
    });
    fireEvent.click(addButton);

    expect(submitActionMock).toHaveBeenCalledTimes(1);
    expect(submitActionMock).toHaveBeenCalledWith(
      expect.objectContaining({
        peepAuthor: "testuser",
        peepMessage: "Test peep message",
      })
    );
  });
});
