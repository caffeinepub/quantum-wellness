import { Component, type ErrorInfo, type ReactNode } from "react";

interface Props {
  children: ReactNode;
}
interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("App crashed:", error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: 32,
            fontFamily: "sans-serif",
            background: "#0a0a1a",
            color: "#e0e0e0",
            minHeight: "100vh",
          }}
        >
          <h2 style={{ color: "#f59e0b", marginBottom: 16 }}>
            Quantum Wellness — App Error
          </h2>
          <p style={{ marginBottom: 8 }}>
            An error occurred loading the app. Please refresh the page.
          </p>
          <pre
            style={{
              background: "#111",
              padding: 16,
              borderRadius: 8,
              fontSize: 12,
              color: "#f87171",
              overflowX: "auto",
              whiteSpace: "pre-wrap",
            }}
          >
            {this.state.error?.message}
          </pre>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              marginTop: 16,
              padding: "8px 20px",
              background: "#f59e0b",
              color: "#000",
              border: "none",
              borderRadius: 6,
              cursor: "pointer",
              fontWeight: 600,
            }}
          >
            Refresh App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
