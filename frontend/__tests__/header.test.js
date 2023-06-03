require("dotenv").config({ path: ".env.test" });
import { render, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthContext } from "../src/contexts/AuthContext";
import Header from "../src/components/Header";
import profileAPI from "../src/services/profileAPI.js";

jest.mock("../src/services/profileAPI.js");

describe("Header", () => {
  it("displays the correct links when not logged in", () => {
    const { getByText } = render(
      <AuthContext.Provider value={{ user: null }}>
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    );

    // Verify that the correct links are displayed when not logged in
    expect(getByText("AJOUTER UN EVENEMENT")).not.toBeInTheDocument();
    expect(getByText("ESCALE MEDIEVALE")).toBeInTheDocument();
    expect(getByText("EVENEMENTS")).toBeInTheDocument();
    expect(getByText("Connexion")).toBeInTheDocument();
    expect(getByText("Inscription")).toBeInTheDocument();
  });

  it("displays the correct links when logged in", () => {
    const user = { id: 1, avatar: "", role: "user" };

    const { getByText } = render(
      <AuthContext.Provider value={{ user }}>
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    );

    // Verify that the correct links are displayed when logged in
    expect(getByText("AJOUTER UN EVENEMENT")).toBeInTheDocument();
    expect(getByText("ESCALE MEDIEVALE")).toBeInTheDocument();
    expect(getByText("EVENEMENTS")).toBeInTheDocument();
    expect(getByText("Déconnexion")).toBeInTheDocument();
  });

  it("calls logout API when logout button is clicked", async () => {
    const user = { id: 1, avatar: "", role: "user" };
    const setUser = jest.fn();

    profileAPI.get.mockResolvedValue({ data: {} });

    const { getByText } = render(
      <AuthContext.Provider value={{ user, setUser }}>
        <Router>
          <Header />
        </Router>
      </AuthContext.Provider>
    );

    fireEvent.click(getByText("Déconnexion"));

    // Verify that the logout API is called when the logout button is clicked
    await waitFor(() =>
      expect(profileAPI.get).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND_URL}/api/logout`
      )
    );

    // Verify that the setUser function is called with null
    expect(setUser).toHaveBeenCalledWith(null);
  });
});
