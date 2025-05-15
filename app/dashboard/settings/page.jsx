"use client";
import React, { useState, useEffect } from "react";
import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import toast from "react-hot-toast";
import {
  FiSettings,
  FiUser,
  FiLock,
  FiMail,
  FiCreditCard,
  FiBell,
  FiShield,
} from "react-icons/fi";
import Loading from "@/components/Loading";
import Footer from "@/components/seller/Footer";

const Settings = () => {
  const { user, getToken } = useAppContext();
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("profile");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    notificationEmail: true,
    notificationSMS: false,
    twoFactorAuth: false,
  });
  const [bankDetails, setBankDetails] = useState({
    accountName: "",
    accountNumber: "",
    bankName: "",
    ifscCode: "",
  });

  useEffect(() => {
    const fetchSellerData = async () => {
      try {
        const token = await getToken();
        const { data } = await axios.get("/api/seller/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (data.success) {
          setFormData((prev) => ({
            ...prev,
            name: data.seller.name || "",
            email: data.seller.email || "",
            phone: data.seller.phone || "",
            notificationEmail:
              data.seller.notificationPreferences?.email || true,
            notificationSMS: data.seller.notificationPreferences?.sms || false,
            twoFactorAuth: data.seller.twoFactorEnabled || false,
          }));

          if (data.seller.bankDetails) {
            setBankDetails(data.seller.bankDetails);
          }
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchSellerData();
    }
  }, [user, getToken]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleBankDetailsChange = (e) => {
    const { name, value } = e.target;
    setBankDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/seller/profile",
        {
          name: formData.name,
          phone: formData.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Profile updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      return toast.error("Passwords do not match");
    }

    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/seller/change-password",
        {
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Password updated successfully");
        setFormData((prev) => ({
          ...prev,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleNotificationUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/seller/notification-preferences",
        {
          email: formData.notificationEmail,
          sms: formData.notificationSMS,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Notification preferences updated");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleBankDetailsSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/seller/bank-details",
        bankDetails,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        toast.success("Bank details updated successfully");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleTwoFactorToggle = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.put(
        "/api/seller/toggle-two-factor",
        {
          enabled: !formData.twoFactorAuth,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (data.success) {
        setFormData((prev) => ({
          ...prev,
          twoFactorAuth: !prev.twoFactorAuth,
        }));
        toast.success(
          `Two-factor authentication ${
            !formData.twoFactorAuth ? "enabled" : "disabled"
          }`
        );
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full bg-black text-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex items-center gap-3 mb-8">
          <FiSettings className="text-2xl text-indigo-400" />
          <h1 className="text-2xl font-bold">Settings</h1>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-[#111318] rounded-lg p-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full flex items-center gap-3 p-3 rounded-md ${
                  activeTab === "profile"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <FiUser />
                <span>Profile</span>
              </button>
              <button
                onClick={() => setActiveTab("security")}
                className={`w-full flex items-center gap-3 p-3 rounded-md ${
                  activeTab === "security"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <FiLock />
                <span>Security</span>
              </button>
              <button
                onClick={() => setActiveTab("notifications")}
                className={`w-full flex items-center gap-3 p-3 rounded-md ${
                  activeTab === "notifications"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <FiBell />
                <span>Notifications</span>
              </button>
              <button
                onClick={() => setActiveTab("payments")}
                className={`w-full flex items-center gap-3 p-3 rounded-md ${
                  activeTab === "payments"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <FiCreditCard />
                <span>Payment Methods</span>
              </button>
              <button
                onClick={() => setActiveTab("privacy")}
                className={`w-full flex items-center gap-3 p-3 rounded-md ${
                  activeTab === "privacy"
                    ? "bg-gray-800 text-white"
                    : "text-gray-400 hover:bg-gray-800/50"
                }`}
              >
                <FiShield />
                <span>Privacy</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-[#111318] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiUser className="text-indigo-400" />
                  Profile Information
                </h2>
                <form onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 cursor-not-allowed"
                        disabled
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Update Profile
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="bg-[#111318] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiLock className="text-indigo-400" />
                  Security Settings
                </h2>
                <form onSubmit={handlePasswordUpdate} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Current Password
                    </label>
                    <input
                      type="password"
                      name="currentPassword"
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                      required
                    />
                  </div>
                  <div className="flex justify-between items-center pt-4">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-400">
                        {formData.twoFactorAuth ? "Enabled" : "Disabled"}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={handleTwoFactorToggle}
                      className={`px-4 py-2 rounded-lg ${
                        formData.twoFactorAuth
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-gray-700 hover:bg-gray-600"
                      } text-white transition-colors`}
                    >
                      {formData.twoFactorAuth ? "Disable" : "Enable"}
                    </button>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-[#111318] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiBell className="text-indigo-400" />
                  Notification Preferences
                </h2>
                <form onSubmit={handleNotificationUpdate}>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">Email Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Receive important updates via email
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notificationEmail"
                          checked={formData.notificationEmail}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">SMS Notifications</h3>
                        <p className="text-sm text-gray-400">
                          Receive order alerts via SMS
                        </p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          name="notificationSMS"
                          checked={formData.notificationSMS}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                      </label>
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Save Preferences
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Payments Tab */}
            {activeTab === "payments" && (
              <div className="bg-[#111318] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiCreditCard className="text-indigo-400" />
                  Payment Methods
                </h2>
                <form onSubmit={handleBankDetailsSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Bank Name
                      </label>
                      <input
                        type="text"
                        name="bankName"
                        value={bankDetails.bankName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Account Number
                      </label>
                      <input
                        type="text"
                        name="accountNumber"
                        value={bankDetails.accountNumber}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Account Holder Name
                      </label>
                      <input
                        type="text"
                        name="accountName"
                        value={bankDetails.accountName}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        IFSC Code
                      </label>
                      <input
                        type="text"
                        name="ifscCode"
                        value={bankDetails.ifscCode}
                        onChange={handleBankDetailsChange}
                        className="w-full px-4 py-2 rounded-lg bg-gray-900 border border-gray-800 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500 outline-none transition"
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-6">
                    <button
                      type="submit"
                      className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors"
                    >
                      Update Bank Details
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Privacy Tab */}
            {activeTab === "privacy" && (
              <div className="bg-[#111318] rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FiShield className="text-indigo-400" />
                  Privacy Settings
                </h2>
                <div className="space-y-6">
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-medium mb-2">Data Collection</h3>
                    <p className="text-sm text-gray-400">
                      We collect necessary data to provide and improve our
                      services. This includes order information, contact
                      details, and usage data.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-medium mb-2">Data Sharing</h3>
                    <p className="text-sm text-gray-400">
                      Your data is only shared with payment processors and
                      shipping partners as necessary to fulfill orders. We never
                      sell your personal information.
                    </p>
                  </div>
                  <div className="p-4 bg-gray-900/50 rounded-lg">
                    <h3 className="font-medium mb-2">Data Security</h3>
                    <p className="text-sm text-gray-400">
                      We use industry-standard encryption and security measures
                      to protect your information. All financial data is
                      processed through secure payment gateways.
                    </p>
                  </div>
                  <div className="mt-6">
                    <button className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors">
                      Download My Data
                    </button>
                    <button className="ml-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors">
                      Delete My Account
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Settings;
