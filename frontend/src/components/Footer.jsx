const Footer = () => {
  return (
 <footer className="border-t bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 text-sm text-gray-600">
          <p>© {new Date().getFullYear()} Clothing Admin. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a className="hover:text-green-700" href="#">Điều khoản</a>
            <a className="hover:text-green-700" href="#">Bảo mật</a>
            <a className="hover:text-green-700" href="#">Hỗ trợ</a>
          </div>
        </div>
      </footer>
  );
};

export default Footer;
