// import auth from "services/auth.service";
import "styles/index.css";
import "wdyr";
import { createRoot } from "react-dom/client";
import App from "./App";

// auth.renderApp({ RootComponent: App });

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
