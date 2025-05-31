export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="mx-auto h-12 w-auto text-center text-3xl font-bold tracking-tight text-gray-900">
          InfluencerFlow
        </h1>
        <h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Welcome to InfluencerFlow
        </h2>
      </div>
      {children}
    </div>
  );
}
