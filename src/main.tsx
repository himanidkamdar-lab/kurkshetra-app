
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import "./styles/index.css";

  createRoot(document.getElementById("root")!).render(
    <div style={{ width: 375, height: "100dvh", position: "relative", margin: "0 auto", transform: "translateZ(0)", overflow: "hidden" }}>
      <App />
    </div>
  );
