export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-5xl md:text-6xl font-bold text-[#FFD700] drop-shadow-[0_0_10px_#FFD700]">
        MARKILIA
      </h1>
      <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-2xl">
        From Trends to Empire — <span className="text-[#FFD700] font-semibold">Powered by Justin</span>
      </p>
      <button className="mt-8 bg-[#FFD700] text-black font-semibold py-3 px-8 rounded-full hover:scale-105 transition-transform">
        Explore the Empire
      </button>
    </main>
  )
}