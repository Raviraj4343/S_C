const Footer = () => (
  <footer className="mt-20 border-t border-edge bg-card py-8">
    <div className="section-shell flex flex-col items-center justify-between gap-3 text-center text-sm text-muted md:flex-row md:text-left">
      <p>She Can Foundation - Women Empowerment Through Education & Action</p>
      <p>© {new Date().getFullYear()} She Can Foundation. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
