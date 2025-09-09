import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error boundary specifically designed to catch and handle translation-related errors
 * Provides graceful fallback UI when translation system fails
 */
class TranslationErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Check if this is a translation-related error
    const isTranslationError = this.isTranslationRelatedError(error);
    
    if (isTranslationError) {
      console.group('🌐 Translation Error Boundary');
      console.error('Translation system error caught:', error);
      console.error('Error info:', errorInfo);
      console.groupEnd();
      
      // Store error info in state for potential display
      this.setState({ errorInfo });
      
      // Call custom error handler if provided
      if (this.props.onError) {
        this.props.onError(error, errorInfo);
      }
      
      // In development, provide more detailed logging
      if (process.env.NODE_ENV === 'development') {
        this.logDetailedError(error, errorInfo);
      }
    } else {
      // Re-throw non-translation errors to be handled by other error boundaries
      throw error;
    }
  }

  /**
   * Determine if an error is related to the translation system
   * @param error - The error to check
   * @returns boolean indicating if it's translation-related
   */
  private isTranslationRelatedError(error: Error): boolean {
    const translationKeywords = [
      'i18n',
      'i18next',
      'translation',
      'useTranslation',
      'namespace',
      'lng',
      'language',
      'locale'
    ];
    
    const errorMessage = error.message.toLowerCase();
    const errorStack = error.stack?.toLowerCase() || '';
    
    return translationKeywords.some(keyword => 
      errorMessage.includes(keyword) || errorStack.includes(keyword)
    );
  }

  /**
   * Log detailed error information for development
   * @param error - The error object
   * @param errorInfo - React error info
   */
  private logDetailedError(error: Error, errorInfo: ErrorInfo) {
    console.group('🔍 Detailed Translation Error Analysis');
    
    console.log('Error name:', error.name);
    console.log('Error message:', error.message);
    
    if (error.stack) {
      console.log('Stack trace:', error.stack);
    }
    
    console.log('Component stack:', errorInfo.componentStack);
    
    // Try to extract translation-specific information
    const possibleKey = this.extractTranslationKey(error.message);
    if (possibleKey) {
      console.log('Possible translation key:', possibleKey);
    }
    
    const possibleNamespace = this.extractNamespace(error.message);
    if (possibleNamespace) {
      console.log('Possible namespace:', possibleNamespace);
    }
    
    console.groupEnd();
  }

  /**
   * Try to extract translation key from error message
   * @param message - Error message
   * @returns Possible translation key or null
   */
  private extractTranslationKey(message: string): string | null {
    // Look for patterns like "key 'some.key' not found"
    const keyPattern = /key\s+['"`]([^'"`]+)['"`]/i;
    const match = message.match(keyPattern);
    return match ? match[1] : null;
  }

  /**
   * Try to extract namespace from error message
   * @param message - Error message
   * @returns Possible namespace or null
   */
  private extractNamespace(message: string): string | null {
    // Look for patterns like "namespace 'common' not found"
    const namespacePattern = /namespace\s+['"`]([^'"`]+)['"`]/i;
    const match = message.match(namespacePattern);
    return match ? match[1] : null;
  }

  /**
   * Reset the error boundary state
   */
  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center mb-4">
              <div className="flex-shrink-0">
                <svg
                  className="h-8 w-8 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Translation System Error
                </h3>
              </div>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                There was an issue with the language system. The application is still functional, 
                but some text might not display correctly.
              </p>
            </div>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800">
                <p className="text-xs font-mono text-red-800 dark:text-red-200 break-all">
                  {this.state.error.message}
                </p>
              </div>
            )}

            <div className="flex space-x-3">
              <button
                onClick={this.resetErrorBoundary}
                className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Try Again
              </button>
              <button
                onClick={() => window.location.reload()}
                className="flex-1 bg-gray-600 hover:bg-gray-700 dark:bg-gray-500 dark:hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors"
              >
                Reload Page
              </button>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                If this problem persists, please contact support.
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default TranslationErrorBoundary;

/**
 * Hook version of the error boundary for functional components
 * Note: This is a wrapper that uses the class-based error boundary
 */
export const withTranslationErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent = (props: P) => (
    <TranslationErrorBoundary fallback={fallback}>
      <Component {...props} />
    </TranslationErrorBoundary>
  );

  WrappedComponent.displayName = `withTranslationErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};