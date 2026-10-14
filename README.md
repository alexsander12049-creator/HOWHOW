# Howhow — landing page (site + app)

Dois projetos com o mesmo conteúdo:

| Pasta | O que é | Tecnologia |
|---|---|---|
| `web/` | O site (landing page) | Next.js 15 (App Router) + CSS próprio |
| `mobile/` | O app | React Native com Expo (roda em iPhone, Android e web) |
| `shared/content.ts` | **Todo o texto e os números** dos dois | TypeScript |

O layout segue a referência Reelo (fundo cinza-claro, cards brancos, pílulas pretas, Manrope).
As cores e o logo são os da Howhow: laranja `#FF4D00`, azul `#0096DC`, foguete e "HOWHOW" em Russo One.

## Para mudar um texto
Edite só `shared/content.ts`. Os comandos de rodar copiam ele para `web/lib/` e `mobile/src/`.
Os itens que ainda precisam de confirmação estão marcados com `[CONFIRMAR]` no arquivo.

## Rodar o site
```bash
cd web && npm install && npm run dev
```
Abre em http://localhost:3000. Para publicar: `npm run build` (dá para subir na Vercel direto).

## Rodar o app
```bash
cd mobile && npm install && npm start
```
Escaneie o QR code com o app **Expo Go** no celular, ou aperte `i` (iPhone) / `a` (Android) / `w` (navegador).

## Antes de publicar
- **Formulário de contato:** ainda não envia para lugar nenhum (só mostra "Recebido!"). Ligar a uma API, CRM ou e-mail
  em `web/components/ContactForm.tsx` e em `Contact` de `mobile/src/sections.tsx`.
- **Ordem das seções:** segue a narrativa do sideshift.app (promessa → logos → números → como funciona → conteúdo real → cases → objetivo → planos → comparação → gerenciado → como começar → FAQ → CTA final). Os prints do painel continuam em `public/howhow/` para uso futuro.
  O print da Home mostra nomes e fotos de creators reais: confirme se pode ou troque por uma conta de demonstração.
- **Números do perfil da Hope** são ilustrativos (está escrito no card).

## Vídeos dos cases
- Ficam em `web/public/howhow/videos/` (site) e `mobile/assets/howhow/videos/` (app): `video-1/2/3.mp4` + `capa-1/2/3.jpg`.
- Para trocar, substitua o arquivo mantendo o nome, ou mude o número `video` do case em `shared/content.ts`.
- Os três somam ~51 MB. No site eles só carregam quando alguém passa o mouse (`preload="none"`).
  No app eles vão dentro do pacote: antes de publicar na loja, vale hospedar os vídeos (CDN/Supabase Storage) e usar a URL.

## VSL do topo
- `web/public/howhow/vsl.mp4` e `mobile/assets/howhow/vsl.mp4` (720p, 47 MB, comprimido do original de 125 MB) + capa `vsl-capa.jpg`.
- No site, o player é próprio (`web/components/VslPlayer.tsx`): capa com play, barra de progresso, som, tela cheia e chamada no fim.
- O vídeo começa a tocar antes de baixar inteiro. Para um site com muito tráfego, vale hospedar a VSL num serviço de vídeo (Vimeo, Bunny, Mux) para qualidade adaptativa.
