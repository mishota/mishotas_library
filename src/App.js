import React from "react";
import "./App.css";
import BooksContainer from "./components/Books/BooksContainer";

class App extends React.Component {
  catchAllUnhandledErrors = (PromiseRejectionEvent) => {
    window.alert("Some error");
  };

  componentDidMount() {
    window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
  }
  componentWillUnmount() {
    window.removeEventListener(
      "unhandledrejection",
      this.catchAllUnhandledErrors
    );
  }
  render() {
    return (
      <div className="App">
        <BooksContainer />
      </div>
    );
  }
}

export default App;
