import { useState, useRef } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import {ProfileSettings}  from './components/ProfileSettings';
import { Menu } from 'lucide-react';
import MyEvents from './components/MyEvents';
import Discover from './components/Discover';
import ProfileView from './components/ProfileView';

function UnsavedChangesModal({ open, onDiscard, onStay }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-[#181c23] rounded-xl shadow-lg p-6 w-full max-w-sm border border-gray-800 relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-white" onClick={onStay}>&times;</button>
        <h2 className="text-lg font-bold text-purple-400 mb-2">Unsaved Changes</h2>
        <p className="text-gray-300 mb-6">You have unsaved changes in your profile. What would you like to do?</p>
        <div className="flex gap-3">
          <button
            className="flex-1 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 rounded-lg transition-colors"
            onClick={onDiscard}
          >
            Discard Changes
          </button>
          <button
            className="flex-1 border border-gray-600 text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition-colors"
            onClick={onStay}
          >
            Stay on Profile
          </button>
        </div>
      </div>
    </div>
  );
}

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [showUnsavedModal, setShowUnsavedModal] = useState(false);
  const pendingTab = useRef(null);

  const handleTabChange = (tab) => {
    if (activeTab === 'profile' && unsavedChanges) {
      pendingTab.current = tab;
      setShowUnsavedModal(true);
    } else {
      setActiveTab(tab);
      setMobileOpen(false);
    }
  };

  const handleDiscard = () => {
    setShowUnsavedModal(false);
    setUnsavedChanges(false);
    setActiveTab(pendingTab.current);
    setMobileOpen(false);
    pendingTab.current = null;
  };

  const handleStay = () => {
    setShowUnsavedModal(false);
    pendingTab.current = null;
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'events':
        return <MyEvents/>;
      case 'discover':
        return <Discover />;
      case 'profile':
        return <ProfileView onUnsavedChanges={setUnsavedChanges} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background dark">
      {!mobileOpen && (
        <button
          className="lg:hidden absolute top-4 left-4 z-50 text-foreground"
          onClick={() => setMobileOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>
      )}

      <Sidebar
        activeTab={activeTab}
        onTabChange={handleTabChange}
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
      />

      <div className="flex-1 overflow-y-auto transition-all duration-300 min-w-0">
        <main className="p-8 w-full">{renderContent()}</main>
      </div>

      <UnsavedChangesModal
        open={showUnsavedModal}
        onDiscard={handleDiscard}
        onStay={handleStay}
      />
    </div>
  );
};

export default HomePage;
