import { act, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";
import { describe, it } from "vitest";

import { getProps } from "./getProps";
import { Shelf } from "./Shelf";

export const props = await getProps();

describe("Shelf", () => {
  it("renders", ({ expect }) => {
    const { asFragment } = render(<Shelf {...props} />);

    expect(asFragment()).toMatchSnapshot();
  });

  it("can filter by title", async ({ expect }) => {
    expect.hasAssertions();
    render(<Shelf {...props} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(screen.getByLabelText("Title"), "Lawyer Man");
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by not-found title", async ({ expect }) => {
    expect.hasAssertions();
    render(<Shelf {...props} />);

    // eslint-disable-next-line testing-library/no-unnecessary-act
    await act(async () => {
      await userEvent.type(
        screen.getByLabelText("Title"),
        "This movie doesn't exist",
      );
      await new Promise((r) => setTimeout(r, 500));
    });

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by author", async ({ expect }) => {
    expect.hasAssertions();
    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Author"),
      "Bram Stoker",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by author then show all", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Author"),
      "Bram Stoker",
    );
    await userEvent.selectOptions(screen.getByLabelText("Author"), "All");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by kind", async ({ expect }) => {
    expect.hasAssertions();
    render(<Shelf {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Kind"), "Novel");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by kind then show all", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(screen.getByLabelText("Kind"), "Novel");
    await userEvent.selectOptions(screen.getByLabelText("Kind"), "All");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title a->z", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (A → Z)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by title z->a", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Title (Z → A)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by author z->a", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Author (Z → A)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by year published with oldest first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Year Published (Oldest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can sort by year published with newest first", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.selectOptions(
      screen.getByLabelText("Order By"),
      "Year Published (Newest First)",
    );

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can filter by year published", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    const fieldset = screen.getByRole("group", { name: "Year Published" });
    const fromInput = within(fieldset).getByLabelText("From");
    const toInput = within(fieldset).getByLabelText("to");

    await userEvent.selectOptions(fromInput, "1980");
    await userEvent.selectOptions(toInput, "1989");

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });

  it("can show more titles", async ({ expect }) => {
    expect.hasAssertions();

    render(<Shelf {...props} />);

    await userEvent.click(screen.getByText("Show More..."));

    expect(screen.getByTestId("list")).toMatchSnapshot();
  });
});
