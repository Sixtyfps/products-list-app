import { render, screen } from "@testing-library/react";
import Home from "@/app/page";

jest.mock("@/server/products", () => ({
    getProducts: jest.fn().mockResolvedValue([]),
}));

test("Home component renders the main title", async () => {
    const jsx = await Home();
    render(jsx);
    const title = screen.getByText("Products List");
    expect(title).toBeInTheDocument();
});




