"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <header className="w-full border border-gray-200 rounded-2xl mt-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        <Link href="/">
          <h1 className="text-2xl font-bold">
            Renew<span className="text-red-600">Cred</span>
          </h1>
        </Link>

        <nav className="hidden md:flex gap-8 text-sm text-gray-700">

          <a href="#">Buyers</a>

          <a href="#">Suppliers</a>

          <a href="#">Climate & Us</a>

          <a href="#">Science</a>

          <Link
            href="/"
            className="text-red-600 font-medium"
          >
            Standards
          </Link>

          <a href="#">Contact Us</a>

        </nav>

        <Link
          href="/login"
          className="border px-5 py-2 rounded-lg hover:bg-black hover:text-white transition"
        >
          Registry
        </Link>

      </div>
    </header>
  );
}