import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

const shareLink = () => {
  const router = useRouter();
  const userId = router.query.uid;

  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  const link = `${origin}/frds-quiz/${userId}`;

  return (
    <>
      <p>copy link</p>
      <p suppressHydrationWarning>{link}</p>
    </>
  );
};

export default shareLink;
