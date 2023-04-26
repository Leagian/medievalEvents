import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import { DataContextProvider } from "./contexts/DataContext";

import "./App.css";

function App() {
  return (
    <div className="App">
      <DataContextProvider>
        <Header />
        <Main />
        <Footer />
      </DataContextProvider>
    </div>
  );
}

export default App;
