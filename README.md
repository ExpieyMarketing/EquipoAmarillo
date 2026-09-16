# Panel de captación de leads

Panel para medir objetivos de captación de leads desde publicidad, combinando **Meta Ads** (Facebook/Instagram) y **Google Ads** en un único dashboard: leads totales, coste por lead, inversión, tendencia diaria, comparativa por canal, embudo de conversión y desglose por campaña, con un objetivo de leads configurable y proyección de ritmo.

Construido con Next.js (App Router) + TypeScript + Tailwind. Las llamadas a las APIs de Meta y Google se hacen **desde el servidor** (App Router route handler), así que los tokens nunca llegan al navegador.

## Arranque rápido (con datos de ejemplo)

Sin ninguna variable de entorno configurada, el panel funciona igualmente mostrando **datos de ejemplo** (lo indica un aviso amarillo en la parte superior), para poder ver el diseño y la funcionalidad de inmediato:

```bash
npm install
npm run dev
```

Abre http://localhost:3000.

## Conectar datos reales

Copia `.env.example` a `.env.local` y rellena las variables del canal que quieras conectar. Puedes configurar solo Meta, solo Google Ads, o ambos — cada canal cae a datos de ejemplo de forma independiente si le faltan credenciales o si la llamada a la API falla (verás el motivo en el aviso).

### Meta Ads (Facebook/Instagram)

1. Necesitas un **token de acceso** con permiso `ads_read` sobre la cuenta publicitaria. Lo más estable es crear un **usuario de sistema** en Business Settings (business.facebook.com → Configuración del negocio → Usuarios → Usuarios del sistema), asignarle la cuenta publicitaria y generar un token de larga duración con el permiso `ads_read`.
   - Para pruebas rápidas también puedes generar un token temporal en el [Explorador de la Graph API](https://developers.facebook.com/tools/explorer/), pero caduca en pocas horas.
2. Copia el **ID de la cuenta publicitaria** (con o sin el prefijo `act_`, ambos funcionan) desde Ads Manager.
3. Variables:
   ```
   META_ACCESS_TOKEN=...
   META_AD_ACCOUNT_ID=...
   ```

Leads: se suman las `actions` de tipo lead (`lead`, `onsite_conversion.lead_grouped`, `offsite_conversion.fb_pixel_lead`, `leadgen.other`, etc.) que devuelve el endpoint `insights` de la Marketing API. Si usas un evento de conversión personalizado para tus leads, revisa `lib/meta-ads.ts` (`LEAD_ACTION_TYPES`) y añade su `action_type`.

### Google Ads

1. Solicita un **developer token** desde tu cuenta de administrador (MCC) en Herramientas y configuración → Configuración → Centro de la API. Mientras esté en modo *test* solo podrás consultar cuentas de prueba.
2. Crea unas credenciales OAuth de tipo **Aplicación de escritorio** en [Google Cloud Console](https://console.cloud.google.com/apis/credentials) (habilita antes la Google Ads API en el proyecto).
3. Genera un **refresh token** una vez, siguiendo el flujo OAuth de escritorio de Google (por ejemplo con el script de ejemplo de la librería oficial `google-ads-api`, o cualquier herramienta OAuth2 de Google para "cuentas de escritorio").
4. Variables:
   ```
   GOOGLE_ADS_DEVELOPER_TOKEN=...
   GOOGLE_ADS_CLIENT_ID=...
   GOOGLE_ADS_CLIENT_SECRET=...
   GOOGLE_ADS_REFRESH_TOKEN=...
   GOOGLE_ADS_CUSTOMER_ID=...      # cuenta a consultar, sin guiones
   GOOGLE_ADS_LOGIN_CUSTOMER_ID=... # solo si esa cuenta cuelga de un MCC
   ```

Leads: se consultan las conversiones cuya categoría (`segments.conversion_action_category`) es `LEAD`. Si en tu cuenta los leads están configurados con otra categoría de conversión, ajusta la consulta en `lib/google-ads.ts`.

## Despliegue

Cualquier plataforma compatible con Next.js (Vercel, etc.) sirve. Configura las mismas variables de entorno como *secrets* del proyecto — nunca las subas al repositorio (`.env*` ya está en `.gitignore`).

## Estructura

```
app/page.tsx              Dashboard (client component): filtros, KPIs, gráficos, tabla
app/api/dashboard/route.ts Aggrega Meta + Google (o mock) del lado del servidor
lib/meta-ads.ts            Cliente de la Marketing API de Meta
lib/google-ads.ts          Cliente de la Google Ads API (REST + OAuth)
lib/mock-data.ts           Generador determinista de datos de ejemplo
lib/aggregate.ts           Agregaciones compartidas (totales, fusión por fecha, campañas)
components/                Piezas del dashboard (KPI cards, gráficos, tabla, objetivo)
```

## Objetivo de leads

El objetivo mensual/del periodo y el tema claro/oscuro se guardan en `localStorage` del navegador (no hay base de datos); cada persona que abra el panel puede fijar su propio objetivo.
