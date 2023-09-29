import { useRouter } from "next/router";
import { useEffect } from "react";
import { tokenService } from "../api/autenticacaoService/tokenService";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

function Autenticacao() {
  const router = useRouter();
  let isAuthenticated = router.query.slug;
  useEffect(() => {
    if (isAuthenticated) {
      tokenService.save(isAuthenticated);
      router.push(`/PainelInterno`, undefined, { shallow: true });
    }
  }, [isAuthenticated, router]);
}

export default function Page() {
  Autenticacao();
  return (
    <Backdrop open={true}>
      <CircularProgress color="primary" />
    </Backdrop>
  );
}
