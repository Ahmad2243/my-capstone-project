export default function Home() {
  return (
    <section className="mx-auto w-full max-w-[1280px]">
      <div className="max-w-[375px] mx-auto py-12 sm:py-20 px-4">
        <div className="rounded-lg bg-gradient-to-r from-brand-500 to-brand-700 text-white p-6">
          <h1 className="text-2xl sm:text-4xl font-bold">Welcome to Nomad Flow</h1>
          <p className="mt-3 text-sm sm:text-base text-brand-100">Manage trips, discover destinations, and keep systems healthy.</p>
          <div className="mt-6">
            <a href="/trips" className="inline-block bg-white text-brand-700 font-semibold px-4 py-2 rounded-md">View Trips</a>
          </div>
        </div>
      </div>
    </section>
  )
}
