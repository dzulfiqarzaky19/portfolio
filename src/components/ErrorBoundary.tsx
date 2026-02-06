import { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error: Error | null
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo)
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[hsl(var(--surface-1))] flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[hsl(var(--surface-2))] p-6 rounded-2xl border border-[hsl(var(--border))] shadow-xl text-center">
            <h2 className="text-xl font-bold mb-2 text-[hsl(var(--primary))]">
              Something went wrong
            </h2>
            <p className="text-[hsl(var(--muted))] mb-4">
              We encountered an unexpected error. Please try reloading the page.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-[hsl(var(--primary))] text-[hsl(var(--surface-1))] rounded-full font-bold hover:bg-[hsl(var(--primary-hover))] transition-colors"
            >
              Reload Page
            </button>
            {this.state.error && (
              <pre className="mt-4 p-2 bg-black/10 rounded text-left text-xs overflow-auto max-h-32 text-[hsl(var(--ink))]">
                {this.state.error.toString()}
              </pre>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
