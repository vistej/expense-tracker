import { FC } from "react";
import { MESSAGES } from "../constants";

const Loading: FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="text-center">
        {/* Animated loading spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 border-4 border-primary-100 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-primary-500 rounded-full border-t-transparent animate-spin"></div>
          <div className="absolute inset-2 bg-primary-50 rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-primary-500 rounded-full animate-pulse"></div>
          </div>
        </div>

        {/* Loading text */}
        <h2 className="text-xl font-display font-semibold text-text mb-2">
          Loading...
        </h2>
        <p className="text-text-muted">
          {MESSAGES.loading}
        </p>

        {/* Animated dots */}
        <div className="flex justify-center mt-4 space-x-1">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;