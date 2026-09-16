# MRW — Entrega Automática de Pedidos

Plugin de WordPress/WooCommerce que consulta el **TrackingServices** de MRW (SAGEC) y pasa automáticamente a **"Completado"** los pedidos cuyo envío MRW ya consta como **entregado** (código de estado `00`), sin que nadie tenga que hacerlo a mano.

## Cómo funciona

1. Un evento programado (WP-Cron) revisa periódicamente los pedidos en estado "Procesando" que tengan guardado un número de envío MRW (o una referencia de cliente).
2. Por cada uno, llama al webservice `GetEnvios` de MRW preguntando por su estado.
3. Si MRW responde `Estado = 00` (Entregado), el pedido pasa a "Completado" y se añade una nota interna con la fecha, hora y persona que recibió el envío.

Importante: el servicio de MRW es de **consulta** (nosotros preguntamos), no de aviso (MRW no nos llama). Por eso la revisión es periódica, no instantánea.

## Instalación

1. Sube la carpeta `Plugin-mrw-entrega-automatica` a `wp-content/plugins/` del sitio WooCommerce.
2. Actívalo desde **Plugins** en el escritorio de WordPress.
3. Ve al nuevo menú **📦 MRW Entregas**.

## Configuración

1. **Credenciales SAGEC**: usuario y contraseña que MRW os ha dado para los webservices (los mismos o distintos de los que usa el plugin que genera los envíos). Elige el entorno (pruebas o producción).
2. **Cómo identificar el envío de cada pedido**: hay dos formas de que este plugin sepa qué envío de MRW corresponde a cada pedido:
   - **Número de envío MRW** guardado como metadato del pedido (lo habitual si usáis un plugin de pago de MRW para WooCommerce). Para saber el nombre exacto del campo: abre un pedido ya enviado por MRW → baja hasta el panel de "Datos personalizados"/"Custom Fields" → copia el nombre del campo que contiene el número de envío/albarán.
   - **Referencia de cliente**: si al crear el envío en MRW se envía el número de pedido de WooCommerce como `Referencia`, se puede consultar directamente por esa referencia sin necesidad de guardar el número de envío.
3. **Reglas de sincronización**: qué estados de pedido revisar (normalmente solo "Procesando"), a qué estado pasar cuando se confirma la entrega (por defecto "Completado"), filtro opcional por texto del método de envío (por defecto `mrw`), antigüedad máxima de los pedidos a revisar, límite de pedidos por ejecución y frecuencia (15/30/60 min).
4. Marca **"Activar la revisión automática programada"** y guarda.

## Herramientas de la barra lateral

- **Probar conexión**: consulta MRW con un número de envío o referencia de prueba, para verificar que las credenciales y el entorno son correctos.
- **Sincronizar ahora**: ejecuta la revisión inmediatamente (sin esperar al cron).
- **Historial**: últimas 20 ejecuciones, con resumen y detalle por pedido.

## Requisitos del servidor

- WooCommerce activo.
- Extensión PHP `soap` habilitada (el plugin usa `SoapClient` para hablar con el WSDL de MRW). El aviso en el escritorio de WordPress indica si falta.

## Referencia técnica

Basado en la documentación de MRW:
- `Seguimiento de envíos por Webservices – TrackingServices` (consulta de estado, método `GetEnvios`).
- `SAGEC / TransmEnvioEC` (alta de envíos, campo `Referencia` de cliente).

Código de estado `00` = envío entregado. El resto de códigos (tránsito, incidencias, devoluciones, etc.) no modifican el pedido.
