const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-100 p-4 border-r min-h-screen">
      <ul className="space-y-2">
        <li><a href="/" className="block p-2 hover:bg-gray-200 rounded">Dashboard</a></li>
        <li><a href="/profile" className="block p-2 hover:bg-gray-200 rounded">Profile</a></li>
        <li><a href="/settings" className="block p-2 hover:bg-gray-200 rounded">Settings</a></li>
      </ul>
    </aside>
  );
};

export default Sidebar;
