export function Footer() {
  return (
    <footer className="bg-[#FAFAF7] py-12 border-t border-[#1A1A1A]/10">
      <div className="max-w-[1200px] mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-center">
          <p className="text-[#1A1A1A]/40 text-sm tracking-wide">
            © {new Date().getFullYear()} Betancourth & Co
          </p>
        </div>
      </div>
    </footer>
  );
}
