import Link from "next/link"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold text-center mb-8">
          🚀 SaaS Starter
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Built with Loopcod UI
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Authentication</h3>
            <p className="text-gray-600 mb-4">
              Pre-built auth flows with validation
            </p>
            <Link 
              href="/login"
              className="inline-block px-4 py-2 border rounded hover:bg-gray-100"
            >
              View Login
            </Link>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Dashboard</h3>
            <p className="text-gray-600 mb-4">
              Admin dashboard with navigation
            </p>
            <Link 
              href="/dashboard"
              className="inline-block px-4 py-2 border rounded hover:bg-gray-100"
            >
              View Dashboard
            </Link>
          </div>

          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-2">Pricing</h3>
            <p className="text-gray-600 mb-4">
              Pricing table with tiers
            </p>
            <Link 
              href="/pricing"
              className="inline-block px-4 py-2 border rounded hover:bg-gray-100"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
