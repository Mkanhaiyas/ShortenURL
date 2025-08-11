import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

export default function UrlsPage() {
  const [urls, setUrls] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    axios
      .get(`${backendUrl}/url/details`)
      .then((res) => setUrls(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-900 text-white">
      <Navbar />
      <section className="flex flex-col items-center px-4 pb-10 pt-[110px]">
        <h1 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 text-center">
          Shortened URLs
        </h1>

        {/* Table for medium+ screens */}
        <div className="hidden md:block w-full max-w-6xl overflow-x-auto rounded-xl shadow-lg bg-gray-800">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-700 text-gray-300 uppercase text-sm">
                <th className="px-6 py-3">Short Code</th>
                <th className="px-6 py-3">Original URL</th>
                <th className="px-6 py-3">Visits</th>
                <th className="px-6 py-3">Created At</th>
              </tr>
            </thead>
            <tbody>
              {urls.length > 0 ? (
                urls.map((url, index) => (
                  <tr
                    key={url._id}
                    className={`transition-colors duration-200 ${
                      index % 2 === 0 ? "bg-gray-800" : "bg-gray-850"
                    } hover:bg-gray-700`}
                  >
                    <td className="px-6 py-4 font-mono text-purple-400">
                      {url.shortCode}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      <a
                        href={url.originalUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:underline"
                      >
                        {url.originalUrl}
                      </a>
                    </td>
                    <td className="px-6 py-4">{url.visits}</td>
                    <td className="px-6 py-4 text-gray-400">
                      {new Date(url.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="4"
                    className="px-6 py-6 text-center text-gray-400"
                  >
                    No URLs found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Card layout for small screens */}
        <div className="grid gap-4 w-full md:hidden">
          {urls.length > 0 ? (
            urls.map((url) => (
              <div
                key={url._id}
                className="bg-gray-800 rounded-lg p-4 shadow-md hover:shadow-lg transition"
              >
                <p className="font-mono text-purple-400">{url.shortCode}</p>
                <a
                  href={url.originalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline break-all"
                >
                  {url.originalUrl}
                </a>
                <div className="flex justify-between text-sm text-gray-400 mt-3">
                  <span>Visits: {url.visits}</span>
                  <span>{new Date(url.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">No URLs found</p>
          )}
        </div>
      </section>
    </div>
  );
}
