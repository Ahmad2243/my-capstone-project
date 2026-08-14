type Props = {
  params: { id: string }
}

export default function TripDetail({ params }: Props) {
  const { id } = params

  return (
    <section className="mx-auto w-full max-w-[1280px] py-8">
      <div className="max-w-[375px] mx-auto px-4">
        <h2 className="text-xl font-semibold">Trip Detail</h2>
        <p className="text-sm text-gray-600 mt-2">Showing details for trip ID: <span className="font-mono">{id}</span></p>
        <div className="mt-6 border rounded-lg p-4 bg-white">
          <div className="h-40 bg-gray-100 rounded-md mb-3" />
          <p className="text-gray-500">This is a placeholder for the trip detail content.</p>
        </div>
      </div>
    </section>
  )
}
