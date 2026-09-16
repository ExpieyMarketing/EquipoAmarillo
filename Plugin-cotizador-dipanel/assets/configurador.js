/* WordPress AJAX — no requiere configuración adicional */

/* ── CATÁLOGO COMPLETO (Excel Tarifa 2026) ── */
const CAT = {
  DP1:{label:'Puerta Pivotante Frigorífica Comercial',hasEsp:true,
    esps:['80 mm (0°C)','100 mm (BT)'],
    T:{

      '80 mm (0°C)':{1800:{700:1010,800:1020,900:1040,1000:1110,1100:1130,1200:1160,1300:1230,1400:1250},1900:{700:1030,800:1040,900:1060,1000:1120,1100:1150,1200:1180,1300:1240,1400:1260},2000:{700:1050,800:1060,900:1070,1000:1150,1100:1170,1200:1190,1300:1260,1400:1280},2100:{700:1100,800:1110,900:1130,1000:1180,1100:1210,1200:1230,1300:1290,1400:1340},2200:{700:1130,800:1150,900:1160,1000:1190,1100:1220,1200:1260,1300:1350,1400:1370},2300:{700:1160,800:1170,900:1180,1000:1230,1100:1270,1200:1300,1300:1360,1400:1380},2400:{700:1200,800:1210,900:1240,1000:1280,1100:1310,1200:1330,1300:1400,1400:1420}},
      '100 mm (BT)':{1800:{700:1040,800:1050,900:1070,1000:1140,1100:1180,1200:1220,1300:1290,1400:1320},1900:{700:1060,800:1080,900:1090,1000:1160,1100:1210,1200:1230,1300:1300,1400:1330},2000:{700:1080,800:1100,900:1110,1000:1180,1100:1220,1200:1250,1300:1320,1400:1340},2100:{700:1130,800:1140,900:1160,1000:1210,1100:1240,1200:1270,1300:1330,1400:1380},2200:{700:1170,800:1190,900:1200,1000:1230,1100:1250,1200:1300,1300:1390,1400:1410},2300:{700:1200,800:1210,900:1220,1000:1260,1100:1330,1200:1360,1300:1430,1400:1450},2400:{700:1240,800:1250,900:1280,1000:1310,1100:1360,1200:1390,1300:1460,1400:1490}}
    },
    ops:[
      {id:'capilla',n:'Capilla integrada para rail aéreo',u:'Ud.',p:265,m:'cant'},
      {id:'cierre3p',n:'Incremento por cierre de 3 puntos',u:'Ud.',p:112,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'marcoCorrido',n:'Suplemento marco corrido (paso normal)',u:'ML',p:80,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'pisadera',n:'Pisadera suelo cámara hasta 120mm (inox)',u:'ML',p:120,m:'ml'},
      {id:'antipanico',n:'Barra antipánico 1 punto de presión',u:'Ud.',p:300,m:'cant'},
      {id:'visor',n:'Visor fijo 400×400 alu para 0°C',u:'Ud.',p:300,m:'cant'},
    ]
  },
  DP2:{label:'Puerta Pivotante Frigorífica Industrial',hasEsp:true,
    esps:['100 mm (0°C)','125 mm (BT)','150 mm (BT)'],
    T:{
      '100 mm (0°C)':{2000:{900:1320,1000:1330,1100:1390,1200:1540,1300:1570,1400:1700,1500:1730,1600:1780},2100:{900:1340,1000:1350,1100:1410,1200:1550,1300:1580,1400:1710,1500:1790,1600:1810},2200:{900:1370,1000:1380,1100:1430,1200:1560,1300:1640,1400:1760,1500:1800,1600:1830},2300:{900:1390,1000:1400,1100:1530,1200:1670,1300:1700,1400:1830,1500:1870,1600:1980},2400:{900:1450,1000:1470,1100:1550,1200:1690,1300:1720,1400:1860,1500:1970,1600:2000},2500:{900:1580,1000:1590,1100:1660,1200:1700,1300:1730,1400:1870,1500:1980,1600:2010},2600:{900:1600,1000:1610,1100:1710,1200:1720,1300:1750,1400:1890,1500:2000,1600:2030}},
      '125 mm (BT)':{2000:{900:1500,1000:1520,1100:1590,1200:1740,1300:1780,1400:1920,1500:2010,1600:2060},2100:{900:1530,1000:1550,1100:1620,1200:1750,1300:1790,1400:1940,1500:2070,1600:2100},2200:{900:1560,1000:1580,1100:1640,1200:1780,1300:1850,1400:1990,1500:2080,1600:2120},2300:{900:1590,1000:1610,1100:1730,1200:1890,1300:1920,1400:2070,1500:2150,1600:2270},2400:{900:1650,1000:1680,1100:1760,1200:1910,1300:1940,1400:2090,1500:2250,1600:2290},2500:{900:1770,1000:1780,1100:1860,1200:1930,1300:1950,1400:2100,1500:2270,1600:2300},2600:{900:1790,1000:1810,1100:1880,1200:1940,1300:1970,1400:2130,1500:2290,1600:2320}},
      '150 mm (BT)':{2000:{900:1620,1000:1630,1100:1710,1200:1870,1300:1910,1400:2060,1500:2150,1600:2220},2100:{900:1650,1000:1660,1100:1740,1200:1890,1300:1930,1400:2080,1500:2220,1600:2250},2200:{900:1680,1000:1700,1100:1760,1200:1910,1300:1990,1400:2140,1500:2250,1600:2290},2300:{900:1710,1000:1730,1100:1870,1200:2030,1300:2070,1400:2220,1500:2330,1600:2440},2400:{900:1780,1000:1800,1100:1900,1200:2050,1300:2090,1400:2240,1500:2420,1600:2460},2500:{900:1900,1000:1920,1100:2010,1200:2080,1300:2100,1400:2260,1500:2440,1600:2480},2600:{900:1930,1000:1950,1100:2030,1200:2100,1300:2140,1400:2280,1500:2460,1600:2500}}
    },
    ops:[
      {id:'capilla',n:'Capilla integrada para rail aéreo',u:'Ud.',p:265,m:'cant'},
      {id:'cerradura',n:'Cerradura homologada + desbloqueo int.',u:'Ud.',p:285,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'marcoCorrido',n:'Suplemento marco corrido (paso normal)',u:'ML',p:80,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'pisadera',n:'Pisadera suelo cámara hasta 120mm (inox)',u:'ML',p:120,m:'ml'},
      {id:'antipanico',n:'Barra antipánico 1 punto de presión',u:'Ud.',p:300,m:'cant'},
      {id:'visor',n:'Visor fijo 400×400 alu para 0°C',u:'Ud.',p:300,m:'cant'},
    ]
  },
  DC1:{label:'Puerta Corredera Frigorífica Comercial',hasEsp:true,
    esps:['80 mm (0°C)','100 mm (BT)'],
    T:{
      '80 mm (0°C)':{1900:{900:1680,1000:1730,1100:1780,1200:1800,1300:1870,1400:1910,1500:2080,1600:2100},2000:{900:1700,1000:1750,1100:1810,1200:1830,1300:1910,1400:1930,1500:2130,1600:2150},2100:{900:1720,1000:1820,1100:1870,1200:1900,1300:1940,1400:1990,1500:2160,1600:2200},2200:{900:1810,1000:1910,1100:1950,1200:1980,1300:2030,1400:2060,1500:2190,1600:2220},2300:{900:1830,1000:1930,1100:1970,1200:2020,1300:2100,1400:2130,1500:2210,1600:2240},2400:{900:1850,1000:1960,1100:2010,1200:2040,1300:2120,1400:2150,1500:2230,1600:2260},2500:{900:1900,1000:1980,1100:2030,1200:2060,1300:2140,1400:2170,1500:2250,1600:2280},2600:{900:1920,1000:2010,1100:2060,1200:2080,1300:2160,1400:2190,1500:2280,1600:2300}},
      '100 mm (BT)':{1900:{900:1880,1000:1910,1100:1970,1200:2010,1300:2120,1400:2170,1500:2400,1600:2430},2000:{900:1900,1000:1940,1100:1990,1200:2030,1300:2140,1400:2190,1500:2420,1600:2450},2100:{900:1920,1000:1970,1100:2020,1200:2050,1300:2160,1400:2210,1500:2450,1600:2490},2200:{900:1950,1000:1990,1100:2040,1200:2070,1300:2180,1400:2250,1500:2480,1600:2510},2300:{900:2030,1000:2070,1100:2130,1200:2180,1300:2290,1400:2340,1500:2580,1600:2610},2400:{900:2050,1000:2110,1100:2160,1200:2200,1300:2310,1400:2360,1500:2600,1600:2630},2500:{900:2090,1000:2130,1100:2180,1200:2220,1300:2330,1400:2380,1500:2620,1600:2650},2600:{900:2120,1000:2160,1100:2200,1200:2240,1300:2350,1400:2400,1500:2640,1600:2670}}
    },
    ops:[
      {id:'capillaFr',n:'Capilla francesa (carril continuo) rail aéreo',u:'Ud.',p:650,m:'cant'},
      {id:'cerr9500',n:'Cerradura homologada mod.9500HP',u:'Ud.',p:200,m:'cant'},
      {id:'cerrAuto',n:'Cerradura homologada automatismos mod.9500HP',u:'Ud.',p:295,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'pisadera',n:'Pisadera suelo cámara hasta 120mm (inox)',u:'ML',p:160,m:'ml'},
      {id:'maneta',n:'Suplemento maneta interior 8530 (≤1200×2200h)',u:'Ud.',p:55,m:'cant'},
      {id:'visor',n:'Visor fijo 400×400 alu para 0°C',u:'Ud.',p:300,m:'cant'},
    ]
  },
  DC2:{label:'Puerta Corredera Frigorífica Industrial',hasEsp:true,
    esps:['100 mm (0°C)','125 mm (BT)','150 mm Túnel (BT)'],
    T:{
      '100 mm (0°C)':{2200:{1300:2560,1400:2640,1500:2670,1600:2700,1700:2800,1800:2850,1900:2880,2000:3020,2100:3040,2200:3070,2300:3150,2400:3240,2500:3290,2600:3750,2700:3780,2800:3880,2900:3990,3000:4030,3100:4060},2300:{1300:2610,1400:2690,1500:2720,1600:2750,1700:2860,1800:2910,1900:2940,2000:3080,2100:3110,2200:3140,2300:3220,2400:3310,2500:3360,2600:3830,2700:3860,2800:3960,2900:4070,3000:4120,3100:4150},2400:{1300:2620,1400:2710,1500:2740,1600:2770,1700:2870,1800:2920,1900:2960,2000:3100,2100:3130,2200:3160,2300:3240,2400:3330,2500:3380,2600:3840,2700:3870,2800:3980,2900:4090,3000:4140,3100:4200},2500:{1300:2640,1400:2730,1500:2760,1600:2790,1700:2890,1800:2940,1900:2970,2000:3110,2100:3140,2200:3170,2300:3260,2400:3350,2500:3400,2600:3860,2700:3890,2800:4000,2900:4100,3000:4190,3100:4210},2600:{1300:2660,1400:2740,1500:2780,1600:2810,1700:2910,1800:2960,1900:2990,2000:3130,2100:3160,2200:3190,2300:3280,2400:3370,2500:3420,2600:3880,2700:3910,2800:4020,2900:4160,3000:4200,3100:4230},2700:{1300:2720,1400:2810,1500:2840,1600:2870,1700:2980,1800:3030,1900:3060,2000:3200,2100:3230,2200:3270,2300:3350,2400:3400,2500:3450,2600:3920,2700:3950,2800:4090,2900:4190,3000:4240,3100:4270},2800:{1300:2820,1400:2910,1500:2940,1600:2980,1700:3080,1800:3130,1900:3170,2000:3310,2100:3340,2200:3370,2300:3460,2400:3510,2500:3560,2600:4030,2700:4100,2800:4200,2900:4300,3000:4350,3100:4380}},
      '125 mm (BT)':{2200:{1300:2800,1400:2890,1500:2950,1600:2990,1700:3100,1800:3150,1900:3190,2000:3330,2100:3410,2200:3450,2300:3540,2400:3630,2500:3680,2600:4100,2700:4140,2800:4250,2900:4360,3000:4410,3100:4440},2300:{1300:2850,1400:2940,1500:3010,1600:3050,1700:3160,1800:3220,1900:3250,2000:3400,2100:3490,2200:4090,2300:3610,2400:3710,2500:3770,2600:4190,2700:4230,2800:4340,2900:4450,3000:4510,3100:4540},2400:{1300:2870,1400:2960,1500:3030,1600:3070,1700:3180,1800:3230,1900:3270,2000:3420,2100:3510,2200:3540,2300:3630,2400:3730,2500:3780,2600:4210,2700:4240,2800:4360,2900:4470,3000:4530,3100:4600},2500:{1300:2890,1400:2980,1500:3050,1600:3090,1700:3200,1800:3250,1900:3290,2000:3440,2100:3520,2200:3560,2300:3650,2400:3750,2500:3800,2600:4220,2700:4260,2800:4380,2900:4490,3000:4580,3100:4620},2600:{1300:2910,1400:3000,1500:3070,1600:3110,1700:3220,1800:3280,1900:3310,2000:3460,2100:3550,2200:3590,2300:3680,2400:3770,2500:3830,2600:4250,2700:4290,2800:4400,2900:4550,3000:4600,3100:4640}},
      '150 mm Túnel (BT)':{2200:{1300:2950,1400:3040,1500:3110,1600:3150,1700:3270,1800:3330,1900:3370,2000:3520,2100:3610,2200:3650,2300:3750,2400:3850,2500:3910,2600:4340,2700:4380,2800:4490,2900:4610,3000:4670,3100:4710},2300:{1300:3000,1400:3100,1500:3170,1600:3220,1700:3340,1800:3400,1900:3450,2000:3600,2100:3690,2200:3740,2300:3830,2400:3940,2500:4000,2600:4430,2700:4470,2800:4590,2900:4710,3000:4780,3100:4820},2400:{1300:3020,1400:3120,1500:3200,1600:3240,1700:3360,1800:3420,1900:3470,2000:3620,2100:3710,2200:3760,2300:3850,2400:3960,2500:4020,2600:4450,2700:4490,2800:4610,2900:4730,3000:4800,3100:4890},2500:{1300:3040,1400:3140,1500:3220,1600:3260,1700:3380,1800:3440,1900:3490,2000:3640,2100:3730,2200:3780,2300:3880,2400:3980,2500:4040,2600:4470,2700:4510,2800:4630,2900:4750,3000:4870,3100:4900},2600:{1300:3070,1400:3170,1500:3240,1600:3290,1700:3400,1800:3470,1900:3510,2000:3670,2100:3760,2200:3810,2300:3900,2400:4000,2500:4070,2600:4500,2700:4540,2800:4660,2900:4830,3000:4890,3100:4930}}
    },
    ops:[
      {id:'capillaFr',n:'Capilla francesa (carril continuo) rail aéreo',u:'Ud.',p:650,m:'cant'},
      {id:'cerr9500',n:'Cerradura homologada mod.9500HP',u:'Ud.',p:200,m:'cant'},
      {id:'cerrAuto',n:'Cerradura homologada automatismos mod.9500HP',u:'Ud.',p:295,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'pisadera',n:'Pisadera suelo cámara hasta 120mm (inox)',u:'ML',p:160,m:'ml'},
      {id:'visor',n:'Visor fijo 400×400 alu para 0°C',u:'Ud.',p:300,m:'cant'},
    ]
  },
  DC3:{label:'Puerta Corredera de Servicio (40mm)',hasEsp:false,
    T:{_:{2000:{1000:1480,1100:1510,1200:1530,1300:1570,1400:1620,1500:1650,1600:1670,1700:1900,1800:1920,1900:1930,2000:1970,2100:1990,2200:2020,2300:2080,2400:2100,2500:2140},2100:{1000:1500,1100:1530,1200:1540,1300:1590,1400:1640,1500:1660,1600:1680,1700:1920,1800:1940,1900:1950,2000:1990,2100:2010,2200:2040,2300:2100,2400:2120,2500:2160},2200:{1000:1510,1100:1540,1200:1560,1300:1600,1400:1650,1500:1680,1600:1700,1700:1930,1800:1950,1900:1970,2000:2010,2100:2020,2200:2060,2300:2120,2400:2140,2500:2180},2300:{1000:1530,1100:1560,1200:1570,1300:1620,1400:1670,1500:1700,1600:1720,1700:1950,1800:1970,1900:1980,2000:2030,2100:2040,2200:2080,2300:2140,2400:2160,2500:2200},2400:{1000:1550,1100:1580,1200:1590,1300:1640,1400:1710,1500:1740,1600:1770,1700:2010,1800:2030,1900:2040,2000:2090,2100:2110,2200:2120,2300:2190,2400:2200,2500:2240},2500:{1000:1580,1100:1610,1200:1630,1300:1670,1400:1740,1500:1770,1600:1790,1700:2030,1800:2050,1900:2060,2000:2110,2100:2120,2200:2140,2300:2210,2400:2220,2500:2270},2600:{1000:1600,1100:1630,1200:1640,1300:1690,1400:1760,1500:1790,1600:1810,1700:2050,1800:2070,1900:2080,2000:2130,2100:2140,2200:2160,2300:2220,2400:2240,2500:2290},2700:{1000:1610,1100:1640,1200:1660,1300:1700,1400:1780,1500:1800,1600:1820,1700:2060,1800:2080,1900:2100,2000:2140,2100:2160,2200:2180,2300:2240,2400:2260,2500:2310},2800:{1000:1630,1100:1650,1200:1670,1300:1720,1400:1790,1500:1820,1600:1840,1700:2080,1800:2100,1900:2120,2000:2160,2100:2180,2200:2200,2300:2260,2400:2280,2500:2330},2900:{1000:1640,1100:1670,1200:1690,1300:1740,1400:1810,1500:1840,1600:1860,1700:2100,1800:2120,1900:2130,2000:2180,2100:2200,2200:2220,2300:2280,2400:2300,2500:2350},3000:{1000:1660,1100:1680,1200:1700,1300:1750,1400:1820,1500:1850,1600:1870,1700:2110,1800:2130,1900:2150,2000:2200,2100:2220,2200:2240,2300:2300,2400:2320,2500:2370}}},
    ops:[
      {id:'sinMarco',n:'Descuento: opción sin marco',u:'ML',p:-50,m:'ml'},
      {id:'cerr9500',n:'Cerradura homologada + desbloqueo int. mod.9500HP',u:'Ud.',p:200,m:'cant'},
      {id:'cerrAuto',n:'Cerradura homologada + desbloqueo int. automatismos',u:'Ud.',p:295,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'visorRedondo',n:'Visor inox redondo 300mm',u:'Ud.',p:135,m:'cant'},
      {id:'visorOval',n:'Visor ovalado 650×345 metacrilato',u:'Ud.',p:125,m:'cant'},
    ]
  },
  DB140:{label:'Puerta Vaivén Rígida (40mm)',hasEsp:false,
    T:{_:{1900:{700:910,800:920,900:930,1000:940,1100:980,1200:1280,1300:1300,1400:1380,1500:1390,1600:1400,1700:1410,1800:1410,1900:1430,2000:1430,2100:1490,2200:1510,2300:1520},2000:{700:930,800:940,900:950,1000:960,1100:1000,1200:1300,1300:1320,1400:1410,1500:1420,1600:1430,1700:1430,1800:1440,1900:1450,2000:1480,2100:1530,2200:1540,2300:1560},2100:{700:950,800:960,900:970,1000:980,1100:1020,1200:1320,1300:1340,1400:1440,1500:1440,1600:1450,1700:1460,1800:1490,1900:1490,2000:1500,2100:1570,2200:1570,2300:1580},2200:{700:970,800:980,900:990,1000:1000,1100:1040,1200:1340,1300:1360,1400:1460,1500:1470,1600:1490,1700:1500,1800:1510,1900:1530,2000:1540,2100:1590,2200:1600,2300:1610},2300:{700:990,800:1000,900:1010,1000:1020,1100:1060,1200:1360,1300:1380,1400:1500,1500:1510,1600:1520,1700:1540,1800:1550,1900:1560,2000:1560,2100:1620,2200:1620,2300:1630},2400:{700:1060,800:1070,900:1090,1000:1100,1100:1140,1200:1510,1300:1530,1400:1640,1500:1660,1600:1670,1700:1680,1800:1680,1900:1690,2000:1700,2100:1750,2200:1760,2300:1770},2500:{700:1080,800:1090,900:1110,1000:1140,1100:1180,1200:1530,1300:1560,1400:1680,1500:1680,1600:1690,1700:1700,1800:1710,1900:1720,2000:1730,2100:1780,2200:1790,2300:1790},2600:{700:1090,800:1110,900:1120,1000:1150,1100:1170,1200:1560,1300:1580,1400:1700,1500:1710,1600:1720,1700:1730,1800:1730,1900:1740,2000:1750,2100:1800,2200:1810,2300:1820},2700:{700:1120,800:1130,900:1140,1000:1170,1100:1190,1200:1580,1300:1610,1400:1730,1500:1730,1600:1740,1700:1750,1800:1760,1900:1770,2000:1780,2100:1830,2200:1840,2300:1850},2800:{700:1170,800:1180,900:1190,1000:1210,1100:1240,1200:1660,1300:1680,1400:1810,1500:1820,1600:1820,1700:1830,1800:1840,1900:1850,2000:1860,2100:1910,2200:1920,2300:1930},2900:{700:1190,800:1200,900:1210,1000:1220,1100:1250,1200:1680,1300:1700,1400:1840,1500:1840,1600:1850,1700:1860,1800:1870,1900:1880,2000:1890,2100:1940,2200:1950,2300:1950},3000:{700:1210,800:1220,900:1230,1000:1240,1100:1280,1200:1700,1300:1730,1400:1860,1500:1870,1600:1880,1700:1890,1800:1890,1900:1900,2000:1910,2100:1960,2200:1970,2300:1980}}},
    ops:[
      {id:'sinMarco',n:'Descuento: opción sin marco',u:'ML',p:-50,m:'ml'},
      {id:'capillaFr',n:'Capilla francesa (carril continuo) rail aéreo',u:'Ud.',p:180,m:'cant'},
      {id:'cerrLlave',n:'Cerradura llave ambos lados (precio por hoja)',u:'Ud.',p:110,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
      {id:'defensaPoli',n:'Defensa polietileno 5mm',u:'M²',p:60,m:'m2'},
      {id:'alavion',n:'Defensa ala de avión inox (1 Ud. × cara)',u:'Hj.',p:110,m:'cant'},
      {id:'bumper',n:'Bumper polietileno 250mm (1 Ud. × cara)',u:'Hj.',p:65,m:'cant'},
    ]
  },
  DS1:{label:'Puerta Pivotante de Servicio (40mm)',hasEsp:false,
    T:{_:{1900:{700:740,800:750,900:750,1000:760,1100:790,1200:1180,1300:1190,1400:1200,1500:1210,1600:1220,1700:1230,1800:1240,1900:1250,2000:1350,2100:1400,2200:1410,2300:1420},2000:{700:750,800:760,900:770,1000:770,1100:810,1200:1200,1300:1210,1400:1220,1500:1230,1600:1240,1700:1250,1800:1260,1900:1280,2000:1390,2100:1430,2200:1440,2300:1450},2100:{700:770,800:770,900:780,1000:790,1100:820,1200:1220,1300:1230,1400:1240,1500:1250,1600:1260,1700:1290,1800:1290,1900:1300,2000:1420,2100:1460,2200:1470,2300:1480},2200:{700:780,800:790,900:800,1000:810,1100:830,1200:1240,1300:1250,1400:1260,1500:1290,1600:1300,1700:1300,1800:1320,1900:1330,2000:1440,2100:1480,2200:1490,2300:1500},2300:{700:790,800:810,900:810,1000:820,1100:850,1200:1260,1300:1290,1400:1300,1500:1310,1600:1320,1700:1330,1800:1340,1900:1350,2000:1460,2100:1500,2200:1510,2300:1520},2400:{700:880,800:880,900:890,1000:900,1100:940,1200:1320,1300:1330,1400:1340,1500:1350,1600:1360,1700:1370,1800:1380,1900:1390,2000:1500,2100:1540,2200:1550,2300:1560},2500:{700:900,800:910,900:940,1000:940,1100:970,1200:1370,1300:1380,1400:1390,1500:1400,1600:1410,1700:1420,1800:1430,1900:1430,2000:1550,2100:1590,2200:1600,2300:1610},2600:{700:940,800:940,900:950,1000:960,1100:980,1200:1390,1300:1400,1400:1410,1500:1420,1600:1430,1700:1440,1800:1450,1900:1450,2000:1570,2100:1610,2200:1620,2300:1630},2700:{700:950,800:960,900:960,1000:970,1100:1000,1200:1410,1300:1420,1400:1430,1500:1440,1600:1450,1700:1460,1800:1470,1900:1470,2000:1590,2100:1630,2200:1640,2300:1650},2800:{700:960,800:970,900:980,1000:980,1100:1010,1200:1430,1300:1440,1400:1450,1500:1460,1600:1470,1700:1480,1800:1480,1900:1490,2000:1620,2100:1650,2200:1660,2300:1670},2900:{700:980,800:990,900:990,1000:1000,1100:1030,1200:1450,1300:1460,1400:1470,1500:1480,1600:1490,1700:1500,1800:1500,1900:1510,2000:1640,2100:1670,2200:1680,2300:1690},3000:{700:990,800:1000,900:1010,1000:1010,1100:1040,1200:1470,1300:1480,1400:1490,1500:1500,1600:1510,1700:1520,1800:1520,1900:1530,2000:1660,2100:1690,2200:1700,2300:1710}}},
    ops:[
      {id:'sinCerr',n:'Opción sin cerradura (sin llave)',u:'Ud.',p:-20,m:'cant'},
      {id:'visorRedondo',n:'Visor inox redondo 300mm',u:'Ud.',p:135,m:'cant'},
      {id:'visorOval',n:'Visor ovalado 650×345 metacrilato',u:'Ud.',p:125,m:'cant'},
      {id:'cierrapuertas',n:'Cierrapuertas aluminio tipo brazo',u:'Ud.',p:125,m:'cant'},
      {id:'antipanico1',n:'Barra antipánico superpuesta con cerradura (1 hoja)',u:'Ud.',p:270,m:'cant'},
      {id:'antipanico2',n:'Barra antipánico superpuesta con cerradura (2 hojas)',u:'Ud.',p:460,m:'cant'},
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'plastBlanco',n:'Acabado plastificado blanco ambas caras',u:'M²',p:50,m:'m2'},
      {id:'lacadoColor',n:'Acabado chapa lacada color (bajo pedido)',u:'M²',p:50,m:'m2'},
      {id:'inox',n:'Acabado panel inox + marco alu anodizado',u:'M²',p:140,m:'m2'},
    ]
  },
  DB215:{label:'Puerta Vaivén Polietileno (15mm)',hasEsp:false,
    T:{_:{1900:{700:1060,900:1070,1100:1080,1300:1590,1500:1710,1700:1750,1900:1750,2100:1760},2000:{700:1070,900:1080,1100:1090,1300:1600,1500:1720,1700:1760,1900:1770,2100:1780},2100:{700:1210,900:1220,1100:1230,1300:1750,1500:1890,1700:2130,1900:2130,2100:2140},2200:{700:1220,900:1230,1100:1240,1300:1760,1500:1910,1700:2140,1900:2150,2100:2160},2300:{700:1230,900:1240,1100:1250,1300:1800,1500:1920,1700:2150,1900:2160,2100:2170},2400:{700:1270,900:1280,1100:1290,1300:1870,1500:1990,1700:2220,1900:2230,2100:2240},2500:{700:1300,900:1310,1100:1350,1300:1940,1500:2060,1700:2290,1900:2300,2100:2310},2600:{700:1320,900:1330,1100:1370,1300:1950,1500:2070,1700:2300,1900:2310,2100:2320},2700:{700:1330,900:1360,1100:1380,1300:1960,1500:2080,1700:2320,1900:2330,2100:2330},2800:{700:1340,900:1380,1100:1390,1300:1980,1500:2100,1700:2330,1900:2340,2100:2350},2900:{700:1350,900:1390,1100:1400,1300:1990,1500:2110,1700:2340,1900:2350,2100:2360},3000:{700:1360,900:1400,1100:1410,1300:2010,1500:2130,1700:2360,1900:2370,2100:2370}}},
    ops:[
      {id:'marco110',n:'Suplemento marco panel 110–150mm',u:'ML',p:10,m:'ml'},
      {id:'marco160',n:'Suplemento marco panel 160–200mm',u:'ML',p:15,m:'ml'},
      {id:'marco210',n:'Suplemento marco panel 210–250mm',u:'ML',p:20,m:'ml'},
      {id:'defensaPoli',n:'Defensa polietileno 5mm',u:'M²',p:60,m:'m2'},
      {id:'alavion',n:'Defensa ala de avión inox (1 Ud. × cara)',u:'Hj.',p:110,m:'cant'},
      {id:'bumper',n:'Bumper polietileno 250mm (1 Ud. × cara)',u:'Hj.',p:65,m:'cant'},
    ]
  },
  DCL3:{label:'Cortina de Lamas PVC (200mm × 3mm)',hasEsp:false,
    T:{_:{1700:{700:172,800:182,900:209,1000:219,1100:245,1200:272,1300:282,1400:309,1500:319,1600:345,1700:372,1800:382,1900:409,2000:419,2100:446,2200:455,2300:482,2400:509,2500:519},1800:{700:177,800:187,900:214,1000:224,1100:252,1200:279,1300:289,1400:317,1500:326,1600:354,1700:382,1800:391,1900:419,2000:429,2100:456,2200:466,2300:494,2400:521,2500:531},1900:{700:181,800:191,900:220,1000:230,1100:258,1200:286,1300:296,1400:324,1500:334,1600:363,1700:391,1800:401,1900:429,2000:439,2100:467,2200:477,2300:506,2400:534,2500:544},2000:{700:186,800:196,900:225,1000:235,1100:264,1200:293,1300:303,1400:332,1500:342,1600:371,1700:400,1800:410,1900:439,2000:449,2100:478,2200:488,2300:517,2400:546,2500:556},2100:{700:191,800:201,900:231,1000:240,1100:270,1200:300,1300:310,1400:340,1500:350,1600:380,1700:410,1800:419,1900:449,2000:459,2100:489,2200:499,2300:529,2400:559,2500:569},2200:{700:195,800:205,900:236,1000:246,1100:277,1200:307,1300:317,1400:348,1500:358,1600:388,1700:419,1800:429,1900:459,2000:469,2100:500,2200:510,2300:541,2400:571,2500:581},2300:{700:200,800:210,900:241,1000:251,1100:283,1200:314,1300:324,1400:355,1500:365,1600:397,1700:428,1800:438,1900:470,2000:479,2100:511,2200:521,2300:552,2400:584,2500:594},2400:{700:205,800:215,900:247,1000:257,1100:289,1200:321,1300:331,1400:363,1500:373,1600:405,1700:438,1800:447,1900:480,2000:490,2100:522,2200:532,2300:564,2400:596,2500:606},2500:{700:209,800:219,900:252,1000:262,1100:295,1200:328,1300:338,1400:371,1500:381,1600:414,1700:447,1800:457,1900:490,2000:500,2100:533,2200:543,2300:576,2400:609,2500:618},2600:{700:214,800:224,900:258,1000:268,1100:301,1200:335,1300:345,1400:379,1500:389,1600:422,1700:456,1800:466,1900:500,2000:510,2100:544,2200:553,2300:587,2400:621,2500:631},2700:{700:219,800:229,900:263,1000:273,1100:308,1200:342,1300:352,1400:387,1500:396,1600:431,1700:466,1800:475,1900:510,2000:520,2100:554,2200:564,2300:599,2400:633,2500:643},2800:{700:223,800:233,900:269,1000:279,1100:314,1200:349,1300:359,1400:394,1500:404,1600:440,1700:475,1800:485,1900:520,2000:530,2100:565,2200:575,2300:611,2400:646,2500:656},2900:{700:228,800:238,900:274,1000:284,1100:320,1200:356,1300:366,1400:402,1500:412,1600:448,1700:484,1800:494,1900:530,2000:540,2100:576,2200:586,2300:622,2400:658,2500:668},3000:{700:233,800:243,900:280,1000:289,1100:326,1200:363,1300:373,1400:410,1500:420,1600:457,1700:494,1800:503,1900:540,2000:550,2100:587,2200:597,2300:634,2400:671,2500:681}}},
    ops:[]
  }
};

/* ── UTILS ── */
const $=id=>document.getElementById(id);
const fmt=n=>n.toLocaleString('es-ES',{minimumFractionDigits:0,maximumFractionDigits:0})+' €';
const m2=(a,w)=>+(a/1000*w/1000).toFixed(4);
const ml=(a,w)=>+((2*a+w)/1000).toFixed(3); /* 2×alto + 1×ancho en metros */
const closest=(arr,v)=>arr.reduce((p,c)=>Math.abs(c-v)<Math.abs(p-v)?c:p);
function price(tipo,esp,alto,ancho){
  const d=CAT[tipo]; if(!d) return null;
  const ek=d.hasEsp?esp:'_';
  const te=d.T[ek]; if(!te) return null;
  const altos=Object.keys(te).map(Number);
  const ca=closest(altos,alto);
  const row=te[ca]; if(!row) return null;
  const aw=Object.keys(row).map(Number);
  return row[closest(aw,ancho)]||null;
}

/* ── STATE ── */
const S={tipo:null,esp:null,alto:null,ancho:null,qty:1,opSel:{}};

/* ── NAV ── */
const steps=[1,2,3];
function goStep(n){
  steps.forEach(i=>{
    $('s'+i).className='step'+(i===n?' active':'');
    const p=$('pr'+i);
    p.className='prog-s'+(i===n?' active':i<n?' done':'');
  });
  document.querySelector('.app').scrollIntoView({behavior:'smooth',block:'start'});
}

/* ── LOAD TIPO ── */
function loadTipo(t){
  S.tipo=t; S.opSel={};
  const d=CAT[t];
  $('s2title').textContent=d.label;
  $('s2sub').textContent='Código '+t+' · Configura medidas y opciones';
  $('sBadge').textContent=t;
  $('sProd').textContent=d.label;
  document.querySelectorAll('.type-card').forEach(c=>c.classList.toggle('sel',c.dataset.type===t));

  // Espesor
  $('fEspField').style.display=d.hasEsp?'block':'none';
  $('sEsp').innerHTML='';
  if(d.hasEsp){
    d.esps.forEach(e=>{const o=document.createElement('option');o.value=e;o.textContent=e;$('sEsp').appendChild(o);});
    S.esp=d.esps[0];
  } else S.esp='_';

  buildAltoAncho(); buildOps(); updateHojaIndicator(); calc(); goStep(2);
}

function buildAltoAncho(){
  const d=CAT[S.tipo], ek=S.esp||'_', te=d.T[ek]; if(!te) return;
  const altos=Object.keys(te).map(Number).sort((a,b)=>a-b);
  $('sAlto').innerHTML='';
  altos.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a+' mm';$('sAlto').appendChild(o);});
  S.alto=altos[0]; buildAncho();
}
function buildAncho(){
  const d=CAT[S.tipo], ek=S.esp||'_', te=d.T[ek]; if(!te) return;
  const altos=Object.keys(te).map(Number).sort((a,b)=>a-b);
  const ca=closest(altos,S.alto||altos[0]);
  const row=te[ca]; const aw=Object.keys(row).map(Number).sort((a,b)=>a-b);
  $('sAncho').innerHTML='';
  aw.forEach(a=>{const o=document.createElement('option');o.value=a;o.textContent=a+' mm';$('sAncho').appendChild(o);});
  S.ancho=aw[0];
  updateHojaIndicator();
}

/* Tipos con lógica de hojas: umbral a partir del cual pasa a 2 hojas */
const HOJA_UMBRAL = {DB140:1200, DS1:1200, DB215:1300};

function updateHojaIndicator(){
  const ind=$('hojaIndicator');
  const umbral = HOJA_UMBRAL[S.tipo];
  if(!umbral){ ind.style.display='none'; updateDisabledOps(); return; }
  const ancho = parseInt($('sAncho').value) || S.ancho || 0;
  const dos = ancho >= umbral;
  ind.style.display = 'block';
  ind.innerHTML = dos
    ? `<div class="hoja-badge two"><svg viewBox="0 0 12 12" fill="none"><rect x="1" y="1" width="4" height="10" rx=".5" stroke="currentColor" stroke-width="1.2"/><rect x="7" y="1" width="4" height="10" rx=".5" stroke="currentColor" stroke-width="1.2"/></svg>2 hojas (ancho ≥ ${umbral} mm)</div>`
    : `<div class="hoja-badge one"><svg viewBox="0 0 12 12" fill="none"><rect x="3" y="1" width="6" height="10" rx=".5" stroke="currentColor" stroke-width="1.2"/></svg>1 hoja (ancho < ${umbral} mm)</div>`;
  updateDisabledOps();
}

function updateDisabledOps(){
  /* Solo DS1 tiene opciones que se bloquean según hojas */
  if(S.tipo !== 'DS1') return;
  const ancho = parseInt($('sAncho').value) || S.ancho || 0;
  const dos = ancho >= 1200;
  /* antipanico1 = solo 1 hoja · antipanico2 = solo 2 hojas */
  const items = document.querySelectorAll('#opsList .op-item');
  items.forEach(item => {
    const cb = item.querySelector('input[type=checkbox]');
    if(!cb) return;
    const id = cb.dataset.id;
    if(id === 'antipanico1'){
      /* disponible solo en 1 hoja */
      item.classList.toggle('disabled', dos);
      if(dos){ cb.checked=false; S.opSel[id]=false; }
    }
    if(id === 'antipanico2'){
      /* disponible solo en 2 hojas */
      item.classList.toggle('disabled', !dos);
      if(!dos){ cb.checked=false; S.opSel[id]=false; }
    }
  });
  calc();
}

function buildOps(){
  const d=CAT[S.tipo]; const list=$('opsList');
  list.innerHTML='';
  $('opsWrap').style.display=(d.ops&&d.ops.length)?'block':'none';
  (d.ops||[]).forEach(op=>{
    S.opSel[op.id]=false;
    const div=document.createElement('div'); div.className='op-item';
    const sign=op.p<0?'–':'+';
    const pc=op.p<0?'op-price disc':'op-price';
    div.innerHTML=`<input type="checkbox" id="ck_${op.id}" data-id="${op.id}">
      <div class="op-info"><div class="op-name">${op.n}</div><div class="op-unit">por ${op.u}</div></div>
      <span class="${pc}">${sign}${Math.abs(op.p)} €/${op.u}</span>`;
    div.querySelector('input').addEventListener('change',function(){S.opSel[op.id]=this.checked;calc();});
    list.appendChild(div);
  });
}

/* ── CALC ── */
/* Opciones cuyo precio es por hoja (se duplican en doble hoja) */
const POR_HOJA = ['alavion','bumper'];

function getHojas(){
  const umbral = HOJA_UMBRAL[S.tipo];
  if(!umbral) return 1;
  return (parseInt($('sAncho').value)||S.ancho||0) >= umbral ? 2 : 1;
}

function calc(){
  if(!S.tipo||!S.alto||!S.ancho) return;
  const pUd=price(S.tipo,S.esp,S.alto,S.ancho)||0;
  const qty=parseInt($('qn').value)||1;
  const am2=m2(S.alto,S.ancho), aml=ml(S.alto,S.ancho);
  const hojas=getHojas();
  const base=pUd*qty;
  let opT=0;
  (CAT[S.tipo].ops||[]).forEach(op=>{
    if(!S.opSel[op.id]) return;
    let med=1;
    if(op.m==='cant') med=qty;
    else if(op.m==='m2') med=am2*qty;
    else if(op.m==='ml') med=aml*qty;
    /* duplicar precio si la opción es por hoja y hay 2 hojas */
    const factor = POR_HOJA.includes(op.id) ? hojas : 1;
    opT+=op.p*med*factor;
  });
  /* Cortina de lamas: precio final × 1.5 */
  const multiplier = S.tipo === 'DCL3' ? 1.5 : 1;
  const baseF = base * multiplier;
  const opTF  = opT  * multiplier;
  const tot=Math.max(0,baseF+opTF);
  $('sEspesor').textContent=S.esp!=='_'?S.esp:'—';
  $('sMedidas').textContent=S.alto+' × '+S.ancho+' mm';
  $('sM2').textContent=am2.toFixed(2)+' m²';
  $('sCant').textContent=qty+' ud.';
  $('pBase').textContent=fmt(baseF);
  $('pOps').textContent=fmt(opTF);
  $('pTotal').textContent=fmt(tot);
  /* actualizar etiqueta de precio en cada opción por hoja */
  updateHojaPriceLabels(hojas);
}

function updateHojaPriceLabels(hojas){
  const items=document.querySelectorAll('#opsList .op-item');
  items.forEach(item=>{
    const cb=item.querySelector('input[type=checkbox]');
    if(!cb||!POR_HOJA.includes(cb.dataset.id)) return;
    const d=CAT[S.tipo]; if(!d) return;
    const op=d.ops.find(o=>o.id===cb.dataset.id); if(!op) return;
    const priceEl=item.querySelector('.op-price');
    if(!priceEl) return;
    const efectivo=op.p*hojas;
    const sign=efectivo<0?'–':'+';
    priceEl.textContent=sign+Math.abs(efectivo)+' €/'+op.u;
    /* añadir nota ×2 hojas si aplica */
    let nota=item.querySelector('.hoja-nota');
    if(hojas===2){
      if(!nota){ nota=document.createElement('span'); nota.className='hoja-nota'; item.querySelector('.op-info').appendChild(nota); }
      nota.textContent='× 2 hojas';
    } else {
      if(nota) nota.remove();
    }
  });
}

/* ── CTA DATA ── */
function buildCta(){
  const d=CAT[S.tipo], qty=parseInt($('qn').value)||1;
  const am2=m2(S.alto,S.ancho), aml=ml(S.alto,S.ancho);
  const pUd=price(S.tipo,S.esp,S.alto,S.ancho)||0;
  const base=pUd*qty; let opT=0; const opNames=[];
  (d.ops||[]).forEach(op=>{
    if(!S.opSel[op.id]) return;
    let med=1;
    if(op.m==='cant') med=qty; else if(op.m==='m2') med=am2*qty; else if(op.m==='ml') med=aml*qty;
    opT+=op.p*med; opNames.push(op.n);
  });
  /* Cortina de lamas: precio final × 1.5 */
  const multiplier = S.tipo === 'DCL3' ? 1.5 : 1;
  const baseF = base * multiplier;
  const opTF  = opT  * multiplier;
  const tot=Math.max(0,baseF+opTF);
  const rows=[[S.tipo+' — '+d.label,''],[S.esp!=='_'?'Espesor: '+S.esp:'',''],[S.alto+' × '+S.ancho+' mm',''],[qty+' ud.','']].filter(r=>r[0]);
  $('ctaRows').innerHTML=[
    ['Tipo',S.tipo+' — '+d.label],
    ...(S.esp!=='_'?[['Espesor',S.esp]]:[]),
    ['Medidas',S.alto+' × '+S.ancho+' mm'],
    ['Cantidad',qty+' ud.'],
  ].map(([k,v])=>`<div class="cta-spec"><span class="k">${k}</span><span class="v">${v}</span></div>`).join('');
  $('ctaTotal').textContent=fmt(tot);
  $('fCfg').value=JSON.stringify({tipo:S.tipo,tipo_label:d.label,esp:S.esp,alto:S.alto,ancho:S.ancho,cantidad:qty,total:tot});
  $('fOpNames').value=opNames.join(', ')||'Ninguna';
}

/* ── EVENTS — mobile compatible ── */
function bindTap(el, fn){
  var moved = false;
  el.addEventListener('touchstart', function(){ moved=false; }, {passive:true});
  el.addEventListener('touchmove',  function(){ moved=true;  }, {passive:true});
  el.addEventListener('touchend',   function(e){ if(!moved){ e.preventDefault(); fn(); } });
  el.addEventListener('click', fn);
}
document.querySelectorAll('.type-card').forEach(function(c){
  bindTap(c, function(){ loadTipo(c.dataset.type); });
});
$('sEsp').addEventListener('change',()=>{S.esp=$('sEsp').value;buildAltoAncho();calc();});
$('sAlto').addEventListener('change',()=>{S.alto=parseInt($('sAlto').value);buildAncho();calc();});
$('sAncho').addEventListener('change',()=>{S.ancho=parseInt($('sAncho').value);updateHojaIndicator();calc();});
$('qn').addEventListener('change',()=>{S.qty=Math.max(1,parseInt($('qn').value)||1);$('qn').value=S.qty;calc();});
bindTap($('qm'), function(){$('qn').value=Math.max(1,(parseInt($('qn').value)||1)-1);$('qn').dispatchEvent(new Event('change'));});
bindTap($('qp'), function(){$('qn').value=(parseInt($('qn').value)||1)+1;$('qn').dispatchEvent(new Event('change'));});
bindTap($('back1'), function(){ goStep(1); });
bindTap($('back2'), function(){ goStep(2); });
bindTap($('btnSolicitar'), function(){ buildCta(); goStep(3); });
bindTap($('btnNueva'), function(){
  $('fSuccess').style.display='none';$('qForm').style.display='block';$('qForm').reset();
  $('btnSub').disabled=false;$('btnSub').textContent='Solicitar presupuesto con descuento';goStep(1);
});

/* ── TOAST ── */
function toast(msg,type){const t=$('toast');t.textContent=msg;t.className='toast '+type+' show';setTimeout(()=>t.classList.remove('show'),4500);}

/* ── VALIDATE ── */
function validate(){
  let ok=true;
  [{id:'fNom',err:'eNom',fn:v=>v.trim().length>0},
   {id:'fApe',err:'eApe',fn:v=>v.trim().length>0},
   {id:'fEmp',err:'eEmp',fn:v=>v.trim().length>0},
   {id:'fMail',err:'eMail',fn:v=>/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())},
   {id:'fTel',err:'eTel',fn:v=>v.trim().length>5},
   {id:'fCp',err:'eCp',fn:v=>/^\d{5}$/.test(v.trim())},
  ].forEach(({id,err,fn})=>{
    const el=$(id),em=$(err),v=fn(el.value);
    el.classList.toggle('err',!v); em.classList.toggle('show',!v); if(!v) ok=false;
  });
  return ok;
}
['fNom','fApe','fEmp','fMail','fTel','fCp'].forEach(id=>{
  $(id).addEventListener('input',()=>{$(id).classList.remove('err');});
});

/* ── SUBMIT VIA WordPress AJAX ── */
$('qForm').addEventListener('submit', async function(e){
  e.preventDefault();
  if(!validate()) return;

  const btn = $('btnSub');
  btn.disabled = true;
  btn.textContent = 'Enviando...';

  const cfg = JSON.parse($('fCfg').value || '{}');
  const fd = new FormData();
  fd.append('action',      'dippanel_presupuesto');
  fd.append('nonce',       typeof dpAjax !== 'undefined' ? dpAjax.nonce : '');
  fd.append('nombre',      $('fNom').value.trim() + ' ' + $('fApe').value.trim());
  fd.append('empresa',     $('fEmp').value.trim());
  fd.append('email',       $('fMail').value.trim());
  fd.append('telefono',    $('fTel').value.trim());
  fd.append('cod_postal',  $('fCp').value.trim());
  fd.append('tipo',        (cfg.tipo||'') + ' — ' + (cfg.tipo_label||''));
  fd.append('espesor',     cfg.esp && cfg.esp !== '_' ? cfg.esp : 'N/A');
  fd.append('alto',        (cfg.alto||'') + ' mm');
  fd.append('ancho',       (cfg.ancho||'') + ' mm');
  fd.append('cantidad',    (cfg.cantidad||1) + ' ud.');
  fd.append('opciones',    $('fOpNames').value || 'Ninguna');
  fd.append('total',       (cfg.total||0).toLocaleString('es-ES') + ' € (sin IVA)');
  fd.append('comentarios', $('fMsg').value.trim() || '—');

  try {
    const ajaxUrl = typeof dpAjax !== 'undefined' ? dpAjax.ajaxurl : '/wp-admin/admin-ajax.php';
    const res = await fetch(ajaxUrl, { method:'POST', body:fd, credentials:'same-origin' });
    const data = await res.json();
    if(data.success){
      $('qForm').style.display = 'none';
      $('fSuccess').style.display = 'block';
      toast('✅ Solicitud enviada correctamente', 'ok');
    } else {
      throw new Error(data.data || 'Error al enviar');
    }
  } catch(err) {
    console.error(err);
    toast('❌ Error: ' + err.message, 'err');
    btn.disabled = false;
    btn.textContent = 'Solicitar presupuesto con descuento';
  }
});