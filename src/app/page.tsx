"use client";
import { useEffect } from "react";
import Button from "@/components/Button/Button";

export async function healthcheck() {
  try {
    const response = await fetch("/api/healthcheck", {
      method: "GET",
    });

    if (response) {
      const { server } = await response.json();
      console.log("server health status:", server);
    }
  } catch (error) {
    console.log(error);
  }
}

export default function App() {
  useEffect(() => {
    healthcheck();
  }, []);

  return (
    <>
      <h1>Get Pokemon API</h1>
      <Button>Button</Button>
    </>
  );
}
