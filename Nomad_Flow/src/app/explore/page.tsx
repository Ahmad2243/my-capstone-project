export default function ExplorePage() {
  const spots = Array.from({ length: 8 }, (_, i) => i + 1)

  return (
    <section className="mx-auto w-full max-w-[1280px] py-8">
      <div className="max-w-[375px] mx-auto px-4">
        <h2 className="text-lg font-semibold mb-4">Explore Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {spots.map((s) => (
            <div key={s} className="border rounded-lg p-4 bg-white flex items-center space-x-3">
              <div className="w-16 h-12 bg-gray-100 rounded-md" />
              <div>
                <div className="font-medium">Destination {s}</div>
                <div className="text-sm text-gray-500">Short teaser text</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
