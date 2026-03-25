import { cn } from "@/lib/utils";
import { AlertTriangle, RotateCcw, Home, Bug } from "lucide-react";
import { Component, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: string | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: error.message || null };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({ errorInfo: errorInfo.componentStack });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen p-4" 
          style={{ background: 'linear-gradient(135deg, #0D1B3E 0%, #1565C0 50%, #0D6E8A 100%)' }}>
          <div className="flex flex-col items-center w-full max-w-lg p-6 rounded-sm"
            style={{ 
              background: 'var(--card)', 
              border: '3px solid #B71C1C',
              boxShadow: '4px 4px 0 rgba(0,0,0,0.3)'
            }}>
            {/* Pixel art error icon */}
            <div className="text-6xl mb-4">💥</div>
            
            <h2 className="font-pixel text-center mb-2" 
              style={{ fontSize: '1rem', color: '#B71C1C', textShadow: '2px 2px 0 rgba(0,0,0,0.3)' }}>
              OOPS! SOMETHING WENT WRONG
            </h2>
            
            <p className="font-game text-center text-sm mb-4" style={{ color: 'var(--muted-foreground)' }}>
              The Agent encountered an unexpected error. Don't worry — your progress is saved!
            </p>

            {/* Error details (collapsible in production) */}
            <div className="w-full mb-6">
              <details className="text-left">
                <summary className="font-game text-xs cursor-pointer flex items-center gap-2 mb-2"
                  style={{ color: 'var(--muted-foreground)' }}>
                  <Bug size={14} /> Technical Details
                </summary>
                <div className="p-3 rounded-sm overflow-auto max-h-40" 
                  style={{ background: 'var(--muted)', border: '2px solid var(--border)' }}>
                  <pre className="text-xs font-mono whitespace-pre-wrap" 
                    style={{ color: 'var(--foreground)' }}>
                    {this.state.error?.message}
                    {'\n\n'}
                    {this.state.error?.stack?.slice(0, 500)}...
                  </pre>
                </div>
              </details>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="pixel-btn flex items-center gap-2 px-4 py-2"
                style={{
                  background: '#5DA832',
                  borderColor: '#3d7a20',
                  color: 'white',
                  fontSize: '0.55rem'
                }}
              >
                <RotateCcw size={14} />
                TRY AGAIN
              </button>
              
              <button
                onClick={this.handleGoHome}
                className="pixel-btn flex items-center gap-2 px-4 py-2"
                style={{
                  background: 'var(--muted)',
                  borderColor: 'var(--border)',
                  color: 'var(--foreground)',
                  fontSize: '0.55rem'
                }}
              >
                <Home size={14} />
                GO HOME
              </button>
            </div>

            {/* Helpful tip */}
            <div className="mt-6 p-3 rounded-sm text-center w-full"
              style={{ background: 'rgba(93,168,50,0.1)', border: '2px solid rgba(93,168,50,0.3)' }}>
              <p className="font-game text-xs" style={{ color: '#5DA832' }}>
                💡 <strong>Tip:</strong> If this keeps happening, try clearing your browser cache or contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
