import React from 'react'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-earth-dark flex flex-col items-center justify-center p-8 text-center text-ui-cream">
          <div className="max-w-md bg-black/40 border border-rust-red/50 rounded-2xl p-8 backdrop-blur-md">
            <svg className="w-16 h-16 text-rust-red mx-auto mb-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
            </svg>
            <h2 className="text-2xl font-bold text-sand-light mb-4">Something went wrong</h2>
            <p className="text-haze-grey text-sm mb-6 leading-relaxed">
              We encountered a rendering issue. This can happen with 3D canvas drivers or map tiles.
            </p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 rounded-full bg-dust-brown text-earth-dark font-bold hover:bg-sand-light transition-colors text-sm"
            >
              Reload Page
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}
