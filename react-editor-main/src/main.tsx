import ReactDOM from "react-dom/client";
import Provider from "./Provider";
import Router from "./Router";
import Container from "./Container";
import AuthProvider from "./contexts/AuthContext" // Import the AuthProvider
import "./styles/styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider>
    <AuthProvider> {/* Wrap the application with AuthProvider */}
      <Container>
        <Router />
      </Container>
    </AuthProvider>
  </Provider>
);
