"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import LinkButton from "@/components/LinkButton";

export default function Dashboard() {
  return (
    <div>
      <Typography variant="h4">Dashboard Page</Typography>
      <Link href="/setting" passHref>
        <Button variant="contained">Go to Setting</Button>
      </Link>

      <Link href="/profile" passHref>
        <Button variant="contained">Go to Profile</Button>
      </Link>

      <LinkButton href="/">Go to Home Page by LinkButton Component</LinkButton>
    </div>
  );
}
