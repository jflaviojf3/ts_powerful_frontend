import { useRouter } from 'next/router'
import { useEffect } from "react";
import { tokenService } from "../api/autenticacaoService/tokenService";
 
function Autenticacao() {
    const router = useRouter();
    let isAuthenticated = router.query.slug;;
    useEffect(() => {
      if (isAuthenticated) {
        tokenService.save(isAuthenticated)
        router.push(`/PainelInterno`, undefined, { shallow: true });
      } 
    }, [isAuthenticated, router]);
  }

export default function Page() {
    Autenticacao()
    return <p>Carregando...</p>
}