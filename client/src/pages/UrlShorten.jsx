import { useState } from "react";
import axios from "axios";
import { FiCopy, FiCheck } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function UrlShorten() {
  const [copied, setCopied] = useState(false);
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isloading, setIsLoading] = useState(false);

  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleShorten = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!originalUrl.trim()) return;

    try {
      const response = await axios.post(`${backendUrl}/api/shorten`, {
        originalUrl,
      });
      setShortUrl(response.data.shortUrl);
      setIsLoading(false);
      setOriginalUrl("");
    } catch (err) {
      setIsLoading(false);
      console.error("Error shortening URL:", err);
    }
  };

  return (
    <div className="h-[100vh] bg-[#0D1117] text-white flex flex-col">
      <Navbar />

      <section className="flex flex-col justify-center h-full items-center text-center px-4">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-transparent bg-clip-text">
          Shorten Your Loooong Links :)
        </h2>
        <p className="mt-4 text-gray-400 max-w-2xl">
          Linkly is an efficient and easy-to-use URL shortening service that
          streamlines your online experience.
        </p>

        <div className="mt-8 flex w-full max-w-2xl bg-[#1A1F2C] rounded-full overflow-hidden border border-gray-700">
          <input
            type="url"
            placeholder="Enter the link here"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="flex-grow px-6 py-1 md:py-3 bg-transparent text-white outline-none"
          />
          <button
            className={`px-6 py-1 md:py-3 font-semibold transition ${
              originalUrl.trim()
                ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
                : "bg-blue-600 cursor-not-allowed"
            }`}
            onClick={(e) => handleShorten(e)}
            disabled={!originalUrl.trim() || isloading}
          >
            {isloading ? "Loading..." : "Shorten Now!"}
          </button>
        </div>
        {shortUrl && (
          <div className="mt-6 flex items-center space-x-3 bg-[#1A1F2C] px-4 py-2 rounded-lg border border-gray-700">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline"
            >
              {shortUrl}
            </a>
            <button
              onClick={() => handleCopy(shortUrl)}
              className="text-gray-400 hover:text-white transition"
            >
              {copied ? <FiCheck className="text-green-500" /> : <FiCopy />}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}
