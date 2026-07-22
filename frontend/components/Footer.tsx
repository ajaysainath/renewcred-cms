export default function Footer() {
  return (
    <footer className="bg-[#232323] text-white mt-32 rounded-t-3xl">

      <div className="max-w-7xl mx-auto px-8 py-16 grid md:grid-cols-3 gap-12">

        <div>

          <h2 className="text-3xl font-bold mb-6">
            Renew<span className="text-red-500">Cred</span>
          </h2>

          <p className="text-gray-300">
            Indiranagar,
            Bengaluru,
            Karnataka,
            India
          </p>

          <p className="text-gray-300 mt-2">
            yp@renewcred.com
          </p>

        </div>

        <div>

          <h3 className="font-semibold mb-5">
            Navigation
          </h3>

          <ul className="space-y-3 text-gray-300">

            <li>Buyer</li>

            <li>Supplier</li>

            <li>Science</li>

            <li>Standards</li>

          </ul>

        </div>

        <div>

          <h3 className="italic text-lg">
            No spam. Just pure climate intelligence.
          </h3>

          <div className="mt-6 flex">

            <input
              placeholder="Your Email Address"
              className="flex-1 rounded-l-full px-5 py-3 text-black bg-white"
            />

            <button className="bg-red-600 px-6 rounded-r-full">
              Subscribe
            </button>

          </div>

        </div>

      </div>

    </footer>
  );
}