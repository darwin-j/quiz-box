import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const shareLink = () => {
  const router = useRouter();
  const userId = router.query.uid;

  useEffect(() => {}, []);

  return <></>;
};

export default shareLink;
