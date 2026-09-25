import { createFileRoute, Link } from "@tanstack/react-router";

import { CookieSettingsButton } from "@/components/meta-pixel-consent";

function PrivacyPage() {
  return (
    <main className="v42-privacy-page">
      <article className="v42-privacy-content">
        <Link className="v42-privacy-back" to="/">
          Voltar para a página principal
        </Link>
        <span className="v3-kicker">PRIVACIDADE</span>
        <h1>Política de privacidade</h1>
        <p className="v42-privacy-updated">Última atualização: 25 de setembro de 2026.</p>

        <section>
          <h2>Como usamos seus dados</h2>
          <p>
            Este site usa informações técnicas necessárias para funcionar. Com sua autorização,
            também usamos o Pixel da Meta para entender visitas e resultados de anúncios.
          </p>
        </section>

        <section>
          <h2>Dados compartilhados com a Meta</h2>
          <p>
            Quando você aceita, o navegador pode enviar à Meta informações como páginas visitadas,
            horário, endereço IP, características do navegador e identificadores usados pela
            plataforma. Não enviamos dados de crianças ao Pixel nem incluímos informações pessoais
            nos endereços das páginas ou nos eventos comuns.
          </p>
        </section>

        <section>
          <h2>Finalidades</h2>
          <p>
            Esses dados são usados para medir a eficiência de anúncios e ajudar na otimização das
            campanhas. A Meta trata os dados conforme suas próprias políticas de privacidade.
          </p>
        </section>

        <section>
          <h2>Sua escolha</h2>
          <p>
            Em regiões que exigem consentimento, o Pixel permanece bloqueado até você aceitar. A
            recusa é registrada e respeitada. Você pode reabrir as opções abaixo e mudar sua escolha
            a qualquer momento; a alteração vale para novos acessos e eventos, sem reenviar eventos
            anteriores.
          </p>
          <CookieSettingsButton />
        </section>

        <section>
          <h2>Compra e pagamento</h2>
          <p>
            Ao escolher um kit, você é direcionado ao checkout da Cakto. O processamento do
            pagamento e a entrega do produto seguem os termos e a política da plataforma de
            checkout.
          </p>
        </section>
      </article>
    </main>
  );
}

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Política de privacidade | Kit de Atividades" },
      {
        name: "description",
        content: "Saiba como o Kit de Atividades usa dados, o Pixel da Meta e suas preferências.",
      },
      { property: "og:title", content: "Política de privacidade | Kit de Atividades" },
      {
        property: "og:description",
        content: "Informações sobre dados, publicidade e preferências de privacidade.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      {
        rel: "canonical",
        href: "https://kitcompletoautismoeinfantil.lovable.app/privacidade",
      },
    ],
  }),
  component: PrivacyPage,
});