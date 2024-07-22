"use client";

import Link from "next/link";

import { useState } from "react";

export default function Login() {
  const [registrationDetails, setRegistrationDetails] = useState({});

  return (
    <div className="flex flex-col">
      <p>Login</p>
      <Link href="/split">
        <button>Press Here</button>
      </Link>
    </div>
  );
}
