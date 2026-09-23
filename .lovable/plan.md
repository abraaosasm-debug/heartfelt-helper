# Animações fluidas e otimização da landing page

## Objetivo
Deixar a página mais viva e sofisticada, mantendo o conteúdo, a estrutura e a aparência atual, com movimentos leves e carregamento mais rápido.

## O que será feito
- Adicionar entradas progressivas durante a rolagem em títulos, cartões, benefícios, preços e perguntas.
- Dar profundidade ao destaque inicial com movimentos lentos e independentes nas capas, selos e elementos decorativos.
- Refinar botões, capas e cartões com respostas rápidas ao toque e ao passar o cursor.
- Fazer as animações ocorrerem apenas quando os elementos estiverem visíveis e interrompê-las fora da tela.
- Preservar a preferência de movimento reduzido do aparelho.
- Reduzir trabalho visual pesado, priorizando `transform` e `opacity`, isolamento de áreas fora da tela e carregamento tardio das imagens secundárias.
- Manter textos, preços, links de compra, seções e identidade visual sem alterações.

## Detalhes técnicos
- Um observador leve marcará os blocos visíveis, sem acompanhar continuamente a rolagem.
- As animações usarão somente propriedades aceleradas pela placa gráfica e tempos curtos, evitando filtros animados e reposicionamento de layout.
- A capa principal continuará priorizada; imagens complementares permanecerão carregadas sob demanda.
- A página será conferida no celular e no desktop, incluindo ausência de cortes laterais e respeito a movimento reduzido.
