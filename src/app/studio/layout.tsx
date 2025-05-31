export const metadata = {
  title: "InfluencerFlow Studio",
  description: "Content Management System for InfluencerFlow",
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="h-screen w-screen">{children}</div>;
}
