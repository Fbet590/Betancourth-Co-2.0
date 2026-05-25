import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-[#0a1f1f] py-12 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <p className="text-white/40 text-sm">
            © {new Date().getFullYear()} Betancourth & Co. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
