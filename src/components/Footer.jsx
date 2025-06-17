function Footer() {
  return (
    <footer className="bg-dark text-white mt-5 py-4">
      <div className="container text-center">
        <p className="mb-1">&copy; {new Date().getFullYear()} BikeCompare</p>
        <p className="mb-1">Via delle Ruote 42, Milano</p>
        <p className="mb-0">Email: info@bikecompare.com | Tel: +39 0123 456789</p>
      </div>
    </footer>
  );
}

export default Footer;
