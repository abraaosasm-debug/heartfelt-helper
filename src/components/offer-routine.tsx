import { BookOpen, Printer, Target } from "lucide-react";

export function OfferRoutine() {
  return (
    <section className="v11-section v11-use-cases">
      <div className="v11-shell">
        <span className="v11-kicker">NA SUA ROTINA</span>
        <h2>
          Uma atividade de cada vez.
          <br />
          Sem começar do zero.
        </h2>
        <ol className="routine-sequence">
          <li>
            <span className="routine-number">01</span>
            <Target size={22} aria-hidden="true" />
            <div>
              <h3>Defina o objetivo.</h3>
              <p>Pense na proposta educativa para aquele momento.</p>
            </div>
          </li>
          <li>
            <span className="routine-number">02</span>
            <BookOpen size={22} aria-hidden="true" />
            <div>
              <h3>Escolha o volume e a atividade.</h3>
              <p>Consulte os temas e as páginas da coleção.</p>
            </div>
          </li>
          <li>
            <span className="routine-number">03</span>
            <Printer size={22} aria-hidden="true" />
            <div>
              <h3>Imprima apenas o necessário.</h3>
              <p>Separe as folhas que serão usadas em casa ou no contexto educacional.</p>
            </div>
          </li>
        </ol>
        <p className="routine-guidance">
          Cada responsável ou profissional deve selecionar as atividades adequadas ao nível, à
          necessidade e ao contexto da criança.
        </p>
      </div>
    </section>
  );
}

export function DigitalDelivery() {
  return (
    <section className="v11-section digital-delivery">
      <div className="v11-shell digital-delivery-grid">
        <div>
          <span className="v11-kicker">DA COMPRA À IMPRESSÃO</span>
          <h2>
            O acesso é digital.
            <br />O uso cabe na sua rotina.
          </h2>
        </div>
        <ol>
          <li>
            <strong>Conclua a compra na Cakto.</strong>
            <p>Confira os dados e as condições no checkout.</p>
          </li>
          <li>
            <strong>Siga as instruções de acesso.</strong>
            <p>Após a confirmação do pagamento, a plataforma orienta como acessar o material.</p>
          </li>
          <li>
            <strong>Escolha o que deseja imprimir.</strong>
            <p>Consulte os PDFs e separe somente as atividades necessárias.</p>
          </li>
        </ol>
      </div>
    </section>
  );
}
