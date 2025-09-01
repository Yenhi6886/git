const Header = () => {
  return (
    <header className="sticky top-0 z-30 border-b bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3">
          {/* Mobile: nút mở drawer */}
          <button
            className="inline-flex items-center justify-center rounded-lg border p-2 hover:bg-green-50 md:hidden"
            aria-label="Mở menu"
            onClick={() => setIsDrawerOpen(true)}
          >
            ☰
          </button>

          {/* Desktop: nút ẩn/hiện sidebar */}
          <button
            className="hidden items-center justify-center rounded-lg border px-3 py-2 text-sm hover:bg-green-50 md:inline-flex"
            aria-label="Ẩn/hiện sidebar"
            onClick={() => setIsSidebarOpen((v) => !v)}
          >
            {isSidebarOpen ? "Ẩn menu" : "Hiện menu"}
          </button>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-600 text-white">A</div>
            <div>
              <p className="text-xs font-medium text-gray-500">Clothing Admin</p>
              <h1 className="text-lg font-semibold">Bảng điều khiển</h1>
            </div>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <input className="w-56 rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-green-600/20" placeholder="Tìm nhanh…" />
            <button className="rounded-xl border px-3 py-2 text-sm hover:bg-green-50">VN</button>
            <button className="rounded-full border p-2 hover:bg-green-50" aria-label="Thông báo">🔔</button>
            <button className="rounded-full border p-2 hover:bg-green-50" aria-label="Tài khoản">👤</button>
          </div>
        </div>
      </header>
  );
};

export default Header;
