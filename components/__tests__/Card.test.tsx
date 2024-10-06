import React from "react";
import { render } from "@testing-library/react-native";
import Card from "../Card";
import { Text } from "react-native";
import expect from "expect";
import { describe } from "jest-circus";
import { it } from "@jest/globals";

describe("Card Component", () => {
  it("renders children correctly", () => {
    const { getByText } = render(
      <Card>
        <Text>Card Content</Text>
      </Card>
    );

    expect(getByText("Card Content")).toBeTruthy();
  });
});
