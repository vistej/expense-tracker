import { FC, useState } from "react";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";
import { useCategories } from "../context/categoryContext";
import {
  UserIcon,
  Cog6ToothIcon,
  ShieldCheckIcon,
  ChartBarIcon,
  BellIcon,
  KeyIcon,
  TrashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  SunIcon,
  MoonIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

export const Profile: FC = () => {
  const { user } = useUser();
  const { theme, setTheme } = useTheme();
  const { categories } = useCategories();

  const [activeTab, setActiveTab] = useState("profile");
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weekly: true,
    monthly: true,
  });

  // Mock user data - in real app this would come from API
  const userProfile = {
    ...user,
    email: "user@example.com",
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    joinDate: "2024-01-15",
    lastLogin: "2024-01-20",
    totalExpenses: 156,
    totalAmount: 2847.50,
    favoriteCategory: "Food & Dining",
    timezone: "UTC-5",
    language: "English",
  };

  const tabs = [
    { id: "profile", label: "Profile", icon: UserIcon },
    { id: "settings", label: "Settings", icon: Cog6ToothIcon },
    { id: "security", label: "Security", icon: ShieldCheckIcon },
    { id: "statistics", label: "Statistics", icon: ChartBarIcon },
  ];

  const handleThemeChange = (newTheme: "light" | "dark") => {
    setTheme(newTheme);
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="card">
        <div className="flex items-center space-x-6">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center">
            <UserIcon className="w-12 h-12 text-white" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-display font-bold text-text dark:text-dark-text mb-2">
              {userProfile.fullName}
            </h2>
            <p className="text-text-muted dark:text-dark-text-muted mb-1">
              @{userProfile.username}
            </p>
            <p className="text-text-muted dark:text-dark-text-muted text-sm">
              Member since {new Date(userProfile.joinDate).toLocaleDateString()}
            </p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="btn-outline flex items-center space-x-2"
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? "Cancel" : "Edit Profile"}</span>
          </button>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Personal Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Full Name
            </label>
            <input
              type="text"
              defaultValue={userProfile.fullName}
              disabled={!isEditing}
              className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Username
            </label>
            <input
              type="text"
              defaultValue={userProfile.username}
              disabled
              className="input-field opacity-50 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Email
            </label>
            <input
              type="email"
              defaultValue={userProfile.email}
              disabled={!isEditing}
              className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Phone
            </label>
            <input
              type="tel"
              defaultValue={userProfile.phone}
              disabled={!isEditing}
              className="input-field disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-border dark:border-dark-border">
            <button
              onClick={() => setIsEditing(false)}
              className="btn-outline"
            >
              Cancel
            </button>
            <button className="btn-primary">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );

  const renderSettingsTab = () => (
    <div className="space-y-6">
      {/* Theme Settings */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Appearance
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-3">
              Theme
            </label>
            <div className="flex space-x-3">
              <button
                onClick={() => handleThemeChange("light")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${theme === "light"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                    : "border-border dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600"
                  }`}
              >
                <SunIcon className="w-5 h-5" />
                <span>Light</span>
                {theme === "light" && <CheckIcon className="w-4 h-4" />}
              </button>
              <button
                onClick={() => handleThemeChange("dark")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${theme === "dark"
                    ? "border-primary-500 bg-primary-50 dark:bg-primary-900/20 text-primary-700 dark:text-primary-300"
                    : "border-border dark:border-dark-border hover:border-primary-300 dark:hover:border-primary-600"
                  }`}
              >
                <MoonIcon className="w-5 h-5" />
                <span>Dark</span>
                {theme === "dark" && <CheckIcon className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Settings */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Notifications
        </h3>
        <div className="space-y-4">
          {Object.entries(notifications).map(([key, value]) => (
            <div key={key} className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-text dark:text-dark-text capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </label>
                <p className="text-xs text-text-muted dark:text-dark-text-muted">
                  {key === "email" && "Receive email notifications"}
                  {key === "push" && "Push notifications in browser"}
                  {key === "weekly" && "Weekly expense summaries"}
                  {key === "monthly" && "Monthly financial reports"}
                </p>
              </div>
              <button
                onClick={() => handleNotificationChange(key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ${value ? "bg-primary-600" : "bg-neutral-200 dark:bg-dark-border"
                  }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ${value ? "translate-x-6" : "translate-x-1"
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Preferences */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Language
            </label>
            <select className="input-field">
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Timezone
            </label>
            <select className="input-field">
              <option value="UTC-5">Eastern Time (UTC-5)</option>
              <option value="UTC-6">Central Time (UTC-6)</option>
              <option value="UTC-7">Mountain Time (UTC-7)</option>
              <option value="UTC-8">Pacific Time (UTC-8)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      {/* Password Change */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Change Password
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="input-field pr-10"
                placeholder="Enter current password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="w-5 h-5 text-text-muted dark:text-dark-text-muted" />
                ) : (
                  <EyeIcon className="w-5 h-5 text-text-muted dark:text-dark-text-muted" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              New Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Enter new password"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-text dark:text-dark-text mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              className="input-field"
              placeholder="Confirm new password"
            />
          </div>
          <button className="btn-primary">
            Update Password
          </button>
        </div>
      </div>

      {/* Two-Factor Authentication */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Two-Factor Authentication
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text dark:text-dark-text font-medium">2FA Status</p>
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              Add an extra layer of security to your account
            </p>
          </div>
          <button className="btn-outline">
            Enable 2FA
          </button>
        </div>
      </div>

      {/* Account Deletion */}
      <div className="card border-danger/20">
        <h3 className="text-lg font-display font-semibold text-danger mb-4">
          Danger Zone
        </h3>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-text dark:text-dark-text font-medium">Delete Account</p>
            <p className="text-sm text-text-muted dark:text-dark-text-muted">
              Permanently delete your account and all data
            </p>
          </div>
          <button className="btn-outline border-danger text-danger hover:bg-danger-50 dark:hover:bg-danger-900/20">
            <TrashIcon className="w-4 h-4 mr-2" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );

  const renderStatisticsTab = () => (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card text-center">
          <div className="w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <ChartBarIcon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
          </div>
          <h3 className="text-2xl font-display font-bold text-text dark:text-dark-text mb-1">
            {userProfile.totalExpenses}
          </h3>
          <p className="text-text-muted dark:text-dark-text-muted">Total Expenses</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-secondary-100 dark:bg-secondary-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <KeyIcon className="w-8 h-8 text-secondary-600 dark:text-secondary-400" />
          </div>
          <h3 className="text-2xl font-display font-bold text-text dark:text-dark-text mb-1">
            ${userProfile.totalAmount.toLocaleString()}
          </h3>
          <p className="text-text-muted dark:text-dark-text-muted">Total Spent</p>
        </div>

        <div className="card text-center">
          <div className="w-16 h-16 bg-accent-100 dark:bg-accent-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <BellIcon className="w-8 h-8 text-accent-600 dark:text-accent-400" />
          </div>
          <h3 className="text-2xl font-display font-bold text-text dark:text-dark-text mb-1">
            {categories.length}
          </h3>
          <p className="text-text-muted dark:text-dark-text-muted">Categories</p>
        </div>
      </div>

      {/* Activity Summary */}
      <div className="card">
        <h3 className="text-lg font-display font-semibold text-text dark:text-dark-text mb-4">
          Activity Summary
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-border dark:border-dark-border last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
              <span className="text-text dark:text-dark-text">Last Login</span>
            </div>
            <span className="text-text-muted dark:text-dark-text-muted">
              {new Date(userProfile.lastLogin).toLocaleDateString()}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border dark:border-dark-border last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-secondary-500 rounded-full"></div>
              <span className="text-text dark:text-dark-text">Favorite Category</span>
            </div>
            <span className="text-text-muted dark:text-dark-text-muted">
              {userProfile.favoriteCategory}
            </span>
          </div>

          <div className="flex items-center justify-between py-3 border-b border-border dark:border-dark-border last:border-b-0">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-accent-500 rounded-full"></div>
              <span className="text-text dark:text-dark-text">Member Since</span>
            </div>
            <span className="text-text-muted dark:text-dark-text-muted">
              {new Date(userProfile.joinDate).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case "profile":
        return renderProfileTab();
      case "settings":
        return renderSettingsTab();
      case "security":
        return renderSecurityTab();
      case "statistics":
        return renderStatisticsTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background p-4 sm:p-6 lg:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold text-text dark:text-dark-text mb-2">
            Profile & Settings
          </h1>
          <p className="text-text-muted dark:text-dark-text-muted text-lg">
            Manage your account, preferences, and security settings
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <nav className="flex space-x-1 bg-background-card dark:bg-dark-background-card rounded-xl p-1 border border-border dark:border-dark-border">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${activeTab === tab.id
                      ? "bg-primary-500 text-white shadow-soft"
                      : "text-text dark:text-dark-text hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20"
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="animate-fade-in">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
