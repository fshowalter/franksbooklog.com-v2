import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it } from "vitest";

import { Author } from "./Author";
import { getProps } from "./getProps";

const props = await getProps("richard-laymon");

describe("Author", () => {
  it("can filter by title", async ({ expect }) => {
    expect.hasAssertions();
    render(<Author {...props} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "The Cellar");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title a->z", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (A → Z)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title z->a", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (Z → A)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by year published with oldest first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Work Year (Oldest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by year published with newest first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Work Year (Newest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by grade with best first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Best First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by grade with worst first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Grade (Worst First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by kind", async ({ expect }) => {
    expect.hasAssertions();
    render(<Author {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Kind"), "Novel");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by year published", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    const fieldset = screen.getByRole("group", { name: "Work Year" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1980");
    await userEvent.selectOptions(toInput, "1985");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can hide reviewed titles", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can show hidden reviewed titles", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.click(screen.getByText("Hide Reviewed"));
    await userEvent.click(screen.getByText("Show Reviewed"));

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can view more titles", async ({ expect }) => {
    expect.hasAssertions();

    render(<Author {...props} />);

    await userEvent.click(screen.getByText("Show More..."));

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });
});
