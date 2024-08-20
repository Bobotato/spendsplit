import { ReactElement } from "react";
import Link from "next/link";
import Image from "next/image";
import SpendSplitLogo from "/public/images/SpendSplitLogo.png";

export default function Logout(): ReactElement {
  return (
    <main className="not-found flex flex-col gap-8 mx-auto w-screen h-screen justify-center items-center max-w-lg">
      <Image src={SpendSplitLogo} alt="Spendsplit Logo" priority={true} />

      <div className="flex flex-col justify-center items-center">
        <h2 className="text-base">You have been successfully logged out.</h2>
        <Link href="/" className="hover:text-green-500">
          Press here to go home.
        </Link>
      </div>
    </main>
  );
}
