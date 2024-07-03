"use client";

import React from "react";
import Link from "next/link";

//? import hooks
import { useGetUser } from "@/hooks/useAuth";

function LoginCheck() {
  const { data, isPending } = useGetUser();
  const { results: user } = data || {};
  if (isPending) return <p>Loading ... </p>;
  if (user) return <Link href="/profile">{user.first_name}</Link>;
  return <Link href="/auth">Login</Link>;
}

export default LoginCheck;
