import React from "react";
import { ChartBarIcon, ShieldCheckIcon, BellIcon } from "@heroicons/react/24/outline";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, title, subtitle, icon: Icon }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 dark:from-primary-900/20 dark:via-dark-background dark:to-secondary-900/20">
      <div className="flex min-h-screen">
        {/* Left Side - App Info & Benefits */}
        <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-primary-600 to-secondary-600 text-white p-12 items-center justify-center">
          <div className="max-w-lg">
            {/* App Logo & Name */}
            <div className="text-center mb-12">
              <div className="mx-auto w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-6 shadow-large backdrop-blur-sm">
                <ChartBarIcon className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-4xl font-display font-bold mb-4">
                ExpenseTracker
              </h1>
              <p className="text-xl text-white/90 leading-relaxed">
                Take control of your finances with intelligent expense tracking
              </p>
            </div>

            {/* Benefits */}
            <div className="space-y-6">
              <h3 className="text-2xl font-display font-semibold text-center mb-8">
                Why Choose ExpenseTracker?
              </h3>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <ChartBarIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Smart Analytics</h4>
                    <p className="text-white/80">Beautiful charts and insights to understand your spending patterns</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <ShieldCheckIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Secure & Private</h4>
                    <p className="text-white/80">Your financial data is encrypted and stays completely private</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                    <BellIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-1">Smart Insights</h4>
                    <p className="text-white/80">Get personalized recommendations to improve your financial health</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Form Content */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Form Header */}
            <div className="text-center mb-8">
              <div className="mx-auto w-20 h-20 bg-gradient-primary rounded-full flex items-center justify-center mb-6 shadow-large">
                <Icon className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-display font-bold text-text dark:text-dark-text mb-2">
                {title}
              </h2>
              <p className="text-text-muted dark:text-dark-text-muted">
                {subtitle}
              </p>
            </div>

            {/* Form Content */}
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
