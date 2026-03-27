import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { InternetIdentityProvider } from "./hooks/useInternetIdentity";
import "./index.css";

BigInt.prototype.toJSON = function () {
  return this.toString();
};

declare global {
  interface BigInt {
    toJSON(): string;
  }
}

window.addEventListener("error", (e) => {
  const root = document.getElementById("root");
  if (root && root.innerHTML === "") {
    root.innerHTML = `<div style="padding:32px;font-family:sans-serif;background:#0a0a1a;color:#e0e0e0;min-height:100vh"><h2 style="color:#f59e0b">Quantum Wellness — Loading Error</h2><p>An error occurred. Please refresh.</p><pre style="color:#f87171;background:#111;padding:16px;border-radius:8px;font-size:12px;white-space:pre-wrap">${e.message}</pre><button onclick="location.reload()" style="margin-top:16px;padding:8px 20px;background:#f59e0b;color:#000;border:none;border-radius:6px;cursor:pointer;font-weight:600">Refresh App</button></div>`;
  }
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <InternetIdentityProvider>
        <App />
      </InternetIdentityProvider>
    </QueryClientProvider>
  </ErrorBoundary>,
);
