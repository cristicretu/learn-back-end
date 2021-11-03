import Container from "components/Container";
import Link from "next/link";

export default function Home() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-2">
        <div className="text-6xl  font-extrabold tracking-tight flex flex-col items-center">
          Welcome to the home page.
          <Link href="/register" >
            <a className="font-normal text-lg underline">Register</a>
          </Link>
        </div>
      </div>
    </Container>
  );
}
