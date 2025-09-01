// src/pages/admin/AdminHome.jsx
// Admin UI (green & white): Quản lý Người dùng • Sản phẩm • Đơn hàng
// - Header, Sidebar có thể ẩn/hiện bằng nút (desktop) + Drawer (mobile)
// - Footer luôn ở cuối trang
// - Mock hành động: khóa/mở user, ẩn/xóa mềm sản phẩm, cập nhật trạng thái đơn
// Cách dùng: <Route path="/admin" element={<AdminHome />} />

import { useMemo, useState } from "react";

/* --------------------------------- Helpers -------------------------------- */
const money = (n) => n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

function Toast({ msg, onClose }) {
  if (!msg) return null;
  return (
    <div className="fixed top-4 right-4 z-50 max-w-sm rounded-xl border border-green-200 bg-white px-4 py-3 shadow-lg">
      <div className="flex items-start gap-3">
        <span className="mt-0.5 text-xl">✅</span>
        <div className="text-sm">
          <p className="font-semibold text-green-800">Thành công</p>
          <p className="text-gray-700">{msg}</p>
        </div>
        <button onClick={onClose} className="ml-auto text-gray-400 hover:text-gray-600" aria-label="Đóng">✕</button>
      </div>
    </div>
  );
}

/* ------------------------------- Sidebar Nav ------------------------------- */
function SidebarNav({ tab, setTab, stats, onItemClick }) {
  const Item = ({ value, label, badge }) => (
    <li>
      <button
        onClick={() => {
          setTab(value);
          onItemClick && onItemClick();
        }}
        className={`w-full rounded-xl px-3 py-2 text-left transition hover:bg-green-50 ${tab === value ? "bg-green-600 text-white hover:bg-green-600" : ""}`}
      >
        {label}
        {typeof badge !== "undefined" && (
          <span className="ml-2 rounded-full bg-green-50 px-2 py-0.5 text-xs text-green-700">{badge}</span>
        )}
      </button>
    </li>
  );

  return (
    <ul className="space-y-1 text-sm">
      <Item value="dashboard" label="📊 Tổng quan" />
      <Item value="users" label="👥 Người dùng" badge={stats.users} />
      <Item value="products" label="🛒 Sản phẩm" badge={stats.products} />
      <Item value="orders" label="📦 Đơn hàng" badge={stats.orders} />
    </ul>
  );
}

/* ---------------------------------- App ----------------------------------- */
export default function AdminHome() {
  const [tab, setTab] = useState("dashboard"); // dashboard | users | products | orders
  const [toast, setToast] = useState("");

  // Toggle sidebar
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // desktop
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);   // mobile

  // Mock Users
  const [users, setUsers] = useState([
    { id: 1, fullName: "Alice Nguyen", email: "alice@shop.vn", phone: "0901 234 567", status: "ACTIVE" },
    { id: 2, fullName: "Bob Tran", email: "bob@shop.vn", phone: "0902 345 678", status: "LOCKED" },
    { id: 3, fullName: "Charlie Le", email: "charlie@shop.vn", phone: "0903 456 789", status: "ACTIVE" },
  ]);

  // Mock Products
  const [products, setProducts] = useState([
    { id: 101, name: "Áo thun basic", price: 120000, stock: 50, status: "ACTIVE", isDeleted: false },
    { id: 102, name: "Quần jeans xanh", price: 420000, stock: 0, status: "OUT_OF_STOCK", isDeleted: false },
    { id: 103, name: "Áo sơ mi trắng", price: 320000, stock: 12, status: "HIDDEN", isDeleted: false },
  ]);

  // Mock Orders
  const [orders, setOrders] = useState([
    { id: 2001, code: "ODR-0001", customer: "alice@shop.vn", total: 540000, status: "PENDING" },
    { id: 2002, code: "ODR-0002", customer: "bob@shop.vn", total: 120000, status: "PAID" },
    { id: 2003, code: "ODR-0003", customer: "charlie@shop.vn", total: 320000, status: "SHIPPED" },
  ]);

  const stats = useMemo(() => ({
    users: users.length,
    products: products.filter(p => !p.isDeleted).length,
    hidden: products.filter(p => p.status === "HIDDEN" && !p.isDeleted).length,
    outOfStock: products.filter(p => p.stock === 0 && !p.isDeleted).length,
    orders: orders.length,
    pending: orders.filter(o => o.status === "PENDING").length,
  }), [users, products, orders]);

  /* ------------------------------- User Actions ------------------------------ */
  const toggleLockUser = (id) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "LOCKED" ? "ACTIVE" : "LOCKED" } : u));
    setToast("Cập nhật trạng thái tài khoản thành công.");
  };

  /* ----------------------------- Product Actions ----------------------------- */
  const toggleHideProduct = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, status: p.status === "HIDDEN" ? "ACTIVE" : "HIDDEN" } : p));
    setToast("Cập nhật hiển thị sản phẩm thành công.");
  };
  const softDeleteProduct = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isDeleted: true } : p));
    setToast("Đã ẩn (xóa mềm) sản phẩm vi phạm.");
  };
  const restoreProduct = (id) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, isDeleted: false, status: "ACTIVE" } : p));
    setToast("Khôi phục sản phẩm thành công.");
  };

  /* ------------------------------- Order Actions ----------------------------- */
  const nextOrder = (status) => {
    switch (status) {
      case "PENDING": return "PAID";
      case "PAID": return "SHIPPED";
      case "SHIPPED": return "COMPLETED";
      default: return status;
    }
  };
  const advanceOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: nextOrder(o.status) } : o));
    setToast("Cập nhật trạng thái đơn hàng thành công.");
  };
  const cancelOrder = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "CANCELLED" } : o));
    setToast("Đơn hàng đã được hủy.");
  };

  /* --------------------------------- Layout --------------------------------- */
  return (
    // Layout: flex-col + flex-1 để footer luôn ở đáy; sidebar toggle được
    <div className="min-h-screen flex flex-col bg-white text-gray-900">
      <Toast msg={toast} onClose={() => setToast("")} />

      {/* Header */}
 <Header />

      {/* Content wrapper (grow để đẩy footer xuống cuối) */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-4 px-4 py-6">
        {/* Sidebar - Desktop (ẩn/hiện) */}
        {isSidebarOpen && (
          <aside className="hidden w-64 shrink-0 md:block">
            <nav className="sticky top-20 rounded-2xl border bg-white p-3 shadow-sm">
              <SidebarNav tab={tab} setTab={setTab} stats={stats} />
            </nav>
          </aside>
        )}

        {/* Main */}
        <main className="flex-1 space-y-4">
          {tab === "dashboard" && (
            <section className="space-y-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Người dùng</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.users}</p>
                </div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Sản phẩm</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.products}</p>
                  <p className="text-xs text-gray-500">Ẩn: {stats.hidden} • Hết hàng: {stats.outOfStock}</p>
                </div>
                <div className="rounded-2xl border bg-white p-4 shadow-sm">
                  <p className="text-sm text-gray-500">Đơn hàng</p>
                  <p className="mt-1 text-2xl font-semibold">{stats.orders}</p>
                  <p className="text-xs text-gray-500">Chờ xử lý: {stats.pending}</p>
                </div>
              </div>

              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <h2 className="mb-3 text-lg font-semibold">Hoạt động gần đây</h2>
                <ul className="list-disc space-y-1 pl-5 text-sm text-gray-600">
                  <li>Khóa tài khoản Bob Tran.</li>
                  <li>Ẩn sản phẩm "Áo sơ mi trắng" do vi phạm mô tả.</li>
                  <li>Đơn ODR-0003 chuyển sang trạng thái SHIPPED.</li>
                </ul>
              </div>
            </section>
          )}

          {tab === "users" && (
            <section className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-end justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Quản lý người dùng</h2>
                  <p className="text-sm text-gray-500">Khóa / mở tài khoản.</p>
                </div>
                <div className="rounded-xl bg-green-50 px-3 py-1 text-sm text-green-700">Tổng: {users.length}</div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-green-50 text-gray-700">
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Họ tên</th>
                      <th className="px-3 py-2">Email</th>
                      <th className="px-3 py-2">Điện thoại</th>
                      <th className="px-3 py-2">Trạng thái</th>
                      <th className="px-3 py-2 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.id} className="border-b last:border-0">
                        <td className="px-3 py-2">{u.id}</td>
                        <td className="px-3 py-2 font-medium">{u.fullName}</td>
                        <td className="px-3 py-2">{u.email}</td>
                        <td className="px-3 py-2">{u.phone || "—"}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${u.status === "ACTIVE" ? "bg-green-100 text-green-700" : u.status === "LOCKED" ? "bg-yellow-100 text-yellow-700" : "bg-red-100 text-red-700"}`}>
                            {u.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <button onClick={() => toggleLockUser(u.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">
                            {u.status === "LOCKED" ? "Mở khóa" : "Khóa"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === "products" && (
            <section className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-4 flex items-end justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">Quản lý sản phẩm</h2>
                  <p className="text-sm text-gray-500">Ẩn / xóa mềm sản phẩm vi phạm.</p>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="rounded-xl bg-green-50 px-3 py-1 text-green-700">Hiện: {products.filter(p => !p.isDeleted).length}</span>
                  <span className="rounded-xl bg-green-50 px-3 py-1 text-green-700">Đã ẩn: {products.filter(p => p.isDeleted).length}</span>
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-green-50 text-gray-700">
                      <th className="px-3 py-2">#</th>
                      <th className="px-3 py-2">Tên</th>
                      <th className="px-3 py-2">Giá</th>
                      <th className="px-3 py-2">Tồn</th>
                      <th className="px-3 py-2">Trạng thái</th>
                      <th className="px-3 py-2">Xóa mềm</th>
                      <th className="px-3 py-2 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className={`border-b last:border-0 ${p.isDeleted ? "opacity-50" : ""}`}>
                        <td className="px-3 py-2">{p.id}</td>
                        <td className="px-3 py-2 font-medium">{p.name}</td>
                        <td className="px-3 py-2">{money(p.price)}</td>
                        <td className="px-3 py-2">{p.stock}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${p.status === "ACTIVE" ? "bg-green-100 text-green-700" : p.status === "OUT_OF_STOCK" ? "bg-yellow-100 text-yellow-700" : p.status === "HIDDEN" ? "bg-gray-100 text-gray-700" : "bg-red-100 text-red-700"}`}>
                            {p.status}
                          </span>
                        </td>
                        <td className="px-3 py-2">{p.isDeleted ? "Đã ẩn" : "—"}</td>
                        <td className="px-3 py-2 text-right">
                          <div className="inline-flex gap-2">
                            <button onClick={() => toggleHideProduct(p.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">
                              {p.status === "HIDDEN" ? "Bỏ ẩn" : "Ẩn"}
                            </button>
                            {!p.isDeleted ? (
                              <button onClick={() => softDeleteProduct(p.id)} className="rounded-xl border px-3 py-1.5 text-xs text-green-700 hover:bg-green-50">
                                Xóa (ẩn)
                              </button>
                            ) : (
                              <button onClick={() => restoreProduct(p.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">
                                Khôi phục
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {tab === "orders" && (
            <section className="rounded-2xl border bg-white p-4 shadow-sm">
              <div className="mb-4">
                <h2 className="text-lg font-semibold">Quản lý đơn hàng</h2>
                <p className="text-sm text-gray-500">Xem & cập nhật trạng thái đơn.</p>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                  <thead>
                    <tr className="border-b bg-green-50 text-gray-700">
                      <th className="px-3 py-2">Mã</th>
                      <th className="px-3 py-2">Khách</th>
                      <th className="px-3 py-2">Tổng</th>
                      <th className="px-3 py-2">Trạng thái</th>
                      <th className="px-3 py-2 text-right">Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id} className="border-b last:border-0">
                        <td className="px-3 py-2 font-medium">{o.code}</td>
                        <td className="px-3 py-2">{o.customer}</td>
                        <td className="px-3 py-2">{money(o.total)}</td>
                        <td className="px-3 py-2">
                          <span className={`rounded-full px-2 py-0.5 text-xs ${o.status === "PENDING" ? "bg-yellow-100 text-yellow-700" : o.status === "PAID" ? "bg-blue-100 text-blue-700" : o.status === "SHIPPED" ? "bg-indigo-100 text-indigo-700" : o.status === "COMPLETED" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                            {o.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right">
                          <div className="inline-flex flex-wrap gap-2">
                            {o.status === "PENDING" && (
                              <>
                                <button onClick={() => advanceOrder(o.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">Đã thanh toán</button>
                                <button onClick={() => cancelOrder(o.id)} className="rounded-xl border px-3 py-1.5 text-xs text-green-700 hover:bg-green-50">Hủy</button>
                              </>
                            )}
                            {o.status === "PAID" && (
                              <button onClick={() => advanceOrder(o.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">Giao hàng</button>
                            )}
                            {o.status === "SHIPPED" && (
                              <button onClick={() => advanceOrder(o.id)} className="rounded-xl border px-3 py-1.5 text-xs hover:bg-green-50">Hoàn tất</button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}
        </main>
      </div>

      {/* Drawer Sidebar - Mobile */}
      {isDrawerOpen && (
        <div className="fixed inset-0 z-40 md:hidden" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/30" onClick={() => setIsDrawerOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-72 overflow-y-auto rounded-r-2xl border-r bg-white p-3 shadow-xl">
            <div className="mb-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-600 text-white">A</div>
                <span className="text-sm font-semibold">Clothing Admin</span>
              </div>
              <button className="rounded-lg border px-2 py-1 text-sm hover:bg-green-50" onClick={() => setIsDrawerOpen(false)} aria-label="Đóng menu">✕</button>
            </div>
            <nav className="pt-2">
              <SidebarNav tab={tab} setTab={setTab} stats={stats} onItemClick={() => setIsDrawerOpen(false)} />
            </nav>
          </aside>
        </div>
      )}

      {/* Footer luôn ở cuối */}
      <Footer />
    </div>
  );
}
