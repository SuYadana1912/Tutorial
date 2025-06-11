"use client";

import { Button, Typography } from "@mui/material";
import Link from "next/link";
import LinkButton from "@/components/LinkButton";

export default function AboutPages() {
  return (
    <div>
      <Typography variant="h4">About Pages</Typography>
      <Link href="/" passHref>
        <Button variant="contained">Go to Home Page</Button>
      </Link>
    </div>
  );
}
