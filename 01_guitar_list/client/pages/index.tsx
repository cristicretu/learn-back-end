import Container from "components/Container";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-6xl  font-extrabold tracking-tight flex flex-col items-center">
          Welcome to the home page.
        </div>
      </div>
    </Container>
  );
}
