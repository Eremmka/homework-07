import { Component } from 'react'

export class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.location?.key !== prevProps.location?.key && this.state.hasError) {
      this.setState({ hasError: false, error: null });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2 style={{
            display:'flex',
            justifyContent:'center',
            marginTop:'1rem',
          }}>Что-то пошло не так</h2>
        </div>
      );
    }
    
    return this.props.children;
  }
}