export default function PokesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section style={{ padding: "20px" }}>
      <h2>Pokémon Menu</h2>
      {children}
    </section>
  );
}
