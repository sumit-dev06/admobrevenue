import React, { StrictMode, Component, ErrorInfo, ReactNode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error in React render tree:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: "40px 20px", maxWidth: "600px", margin: "0 auto", fontFamily: "monospace", textAlign: "center" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "bold", color: "#ef4444" }}>Something went wrong</h2>
          <p style={{ fontSize: "12px", color: "#71717a", margin: "10px 0 20px" }}>
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            type="button"
            onClick={() => {
              try {
                localStorage.clear();
              } catch {
                // Ignore storage errors
              }
              window.location.href = window.location.pathname;
            }}
            style={{
              padding: "8px 16px",
              background: "#18181b",
              color: "#ffffff",
              border: "1px dashed #52525b",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "12px",
            }}
          >
            Reset & Reload Calculator
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>
  );
}
