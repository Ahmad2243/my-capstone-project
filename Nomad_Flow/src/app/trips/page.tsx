export default function TripsPage() {
  const placeholders = Array.from({ length: 6 }, (_, i) => i + 1)

  return (
    <section className="mx-auto w-full max-w-[1280px] py-8">
      <div className="max-w-[375px] mx-auto px-4">
        <h2 className="text-lg font-semibold mb-4">My Trips</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholders.map((p) => (
            <div key={p} className="border rounded-lg p-4 bg-white">
              <div className="h-36 bg-gray-100 rounded-md mb-3" />
              <h3 className="font-medium">Trip #{p}</h3>
              <p className="text-sm text-gray-500 mt-1">Placeholder trip summary</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
