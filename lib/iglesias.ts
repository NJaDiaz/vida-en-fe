// lib/iglesias.ts
export interface Pastor {
  nombre: string;
  rol: string;
  foto?: string;
}

export interface Horario {
  dia: string;
  hora: string;
  actividad: string;
}

export interface Noticia {
  titulo: string;
  fecha: string;
  resumen: string;
  imagen?: string;
}

export interface Iglesia {
  id: string;
  nombre: string;
  ciudad: string;
  direccion: string;
  telefono?: string;
  email?: string;
  instagram?: string;
  foto: string;
  fotoHero: string;
  coordenadas?: { lat: number; lng: number };
  pastores: Pastor[];
  horarios: Horario[];
  actividades: string[];
  noticias: Noticia[];
  esMadre?: boolean;
  descripcion?: string;
  mapsUrl?: string;
  wssp?:string;
}

const noticiasPorDefecto: Noticia[] = [
  {
    titulo: "Campaña de Oración Comunitaria",
    fecha: "Marzo 2025",
    resumen: "Únete a nosotros en 21 días de oración y ayuno para buscar el rostro de Dios juntos como iglesia.",
    imagen: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80",
  },
  {
    titulo: "Retiro de Jóvenes",
    fecha: "Abril 2025",
    resumen: "Fin de semana de encuentro espiritual para jóvenes. Inscripciones abiertas. ¡No te lo pierdas!",
    imagen: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=600&q=80",
  },
];

const horariosPorDefecto: Horario[] = [
  { dia: "Domingo", hora: "10:00", actividad: "Culto de adoración" },
  { dia: "Miércoles", hora: "19:30", actividad: "Estudio bíblico" },
  { dia: "Viernes", hora: "20:00", actividad: "Reunión de jóvenes" },
];

const actividadesPorDefecto: string[] = [
  "Grupos de vida en hogares",
  "Ministerio de niños",
  "Ministerio de damas",
  "Ministerio de varones",
  "Alabanza y adoración",
];

export const iglesias: Iglesia[] = [
  {
    id: "madre",
    nombre: "Vida en Fe",
    ciudad: "San Luis Capital",
    direccion: "Av. Lafinur 654, San Luis",
    telefono: "+54 266 400-0000",
    email: "info@vidaenfe.com",
    instagram: "@vidaenfe",
    foto: "/fon.webp",
    fotoHero: "/fon.webp",
    esMadre: true,
    descripcion: "La iglesia central de Vida en Fe, un lugar donde cada persona es bienvenida a encontrarse con Dios y crecer en comunidad.",
    mapsUrl: "https://maps.google.com/?q=San+Luis+Capital+Argentina",
    pastores: [
      { nombre: "Pastor Principal", rol: "Pastor General", foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80" },
      { nombre: "Pastora Asistente", rol: "Pastora de Mujeres", foto: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80" },
    ],
    horarios: [
      { dia: "Domingo", hora: "09:30", actividad: "Reunión General" },
      { dia: "Jueves", hora: "20:30", actividad: "Reunión General" },    ],
    actividades: [
      "Escuela dominical para niños",
      "Grupos de vida en hogares",
      "Ministerio de jóvenes",
      "Ministerio de mujeres",
      "Ministerio de varones",
      "Equipo de adoración",
      "Alcance comunitario",
      "Escuela de liderazgo",
    ],
    noticias: [
      {
        titulo: "Nueva Sede en el norte de la ciudad",
        fecha: "Marzo 2025",
        resumen: "Estamos creciendo. Pronto abriremos una nueva sede para alcanzar más familias en el norte de San Luis.",
        imagen: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=600&q=80",
      },
      {
        titulo: "Congreso Anual 2025",
        fecha: "Mayo 2025",
        resumen: "Nuestro congreso anual reunirá a todas las iglesias de la red. ¡Un evento histórico que no querrás perderte!",
        imagen: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=600&q=80",
      },
      {
        titulo: "Proyecto de Alimentación Comunitaria",
        fecha: "Febrero 2025",
        resumen: "Lanzamos nuestro comedor comunitario para servir a las familias vulnerables del barrio.",
        imagen: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
      },
    ],
  },
  {
    id: "la-toma",
    nombre: "Vida en Fe La Toma",
    ciudad: "La Toma",
    direccion: "Av. Mármol Onix y San Luis Rey, La Toma, San Luis",
    foto: "/templos/latoma.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=La+Toma+San+Luis+Argentina",
    wssp: "542664111111",
    pastores: [
      { nombre: "Sebastian Soria", rol: "Pastor", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
      { nombre: "Debora Soria", rol: "Pastora", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" },
    ],
    horarios: [
      { dia: "Sábado", hora: "21:00", actividad: "Reunión General" },
      { dia: "Viernes", hora: "20:00", actividad: "Jóvenes" },
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "villa-mercedes",
    nombre: "Vida en Fe Villa Mercedes",
    ciudad: "Villa Mercedes",
    direccion: "Colon 175, Villa Mercedes, San Luis",
    foto: "/templos/villa-mercedes.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1431440869543-efaf3388c585?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Villa+Mercedes+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Marcos Díaz", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80" },
      { nombre: "Pastora Ana Díaz", rol: "Pastora", foto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80" },
    ],
    horarios: [
      { dia: "Domingo", hora: "19:00", actividad: "Primera reunión" },
      { dia: "Jueves", hora: "19:30", actividad: "Estudio y oración" },
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "la-punta",
    nombre: "Vida en Fe - La Punta",
    ciudad: "Ciudad de la Punta",
    direccion: "Av. Serrana s/n, La Punta, San Luis",
    foto: "/templos/LaPunta.png",
    fotoHero: "https://images.unsplash.com/photo-1472791108553-c9405341e398?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Villa+de+Merlo+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor David Medero", rol: "Pastor", foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
      { nombre: "Pastora Lourdes Medero", rol: "Pastora", foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80" },
    ],
    horarios: [
      { dia: "Sabado", hora: "20:00", actividad: "Reunión General" },
      { dia: "Martes", hora: "19:30", actividad: "Estudio bíblico" },
      { dia: "Viernes", hora: "20:00", actividad: "Reunión de jóvenes" },
      { dia: "Sábado", hora: "18:00", actividad: "Grupos de vida" },
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "san-francisco",
    nombre: "Vida en Fe San Francisco",
    ciudad: "San Francisco",
    direccion: "Av. Alberdi y Concejal Camargo, San Francisco, San Luis",
    foto: "/templos/san-francisco.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1418065460487-3e41a6c84dc5?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Juana+Koslay+San+Luis+Argentina",
    pastores: [
      { nombre: "Gabriel Amieva", rol: "Pastor", foto: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=300&q=80" },
      { nombre: "Laura Amieva", rol: "Pastora", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" }
    ],
    horarios: [
      {dia: "Sábado", hora: "09:30", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "Saladillo",
    nombre: "Vida en Fe Saladillo",
    ciudad: "Saladillo",
    direccion: "San Martín s/n, Saladillo, San Luis",
    foto: "/templos/saladillo.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=El+Trapiche+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Miguel Ramos", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora:"20:30", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "lujan",
    nombre: "Vida en Fe Lujan",
    ciudad: "Lujan",
    direccion: "Av. Centenario y Patricias Mendocinas, Lujan, San Luis",
    foto: "/templos/lujan.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Potrero+de+los+Funes+San+Luis+Argentina",
    pastores: [
      { nombre: "Adolfo Salinas", rol: "Pastor", foto: "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?w=300&q=80" },
      { nombre: "Johana Rojas", rol: "Pastora", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80"},
    ],
    horarios: [
      {dia: "Sábado", hora: "20:30", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "villa-de-la-quebrada",
    nombre: "Vida en Fe Villa de la Quebrada",
    ciudad: "Villa de la Quebrada",
    direccion: "Obispo Orzali s/n, Villa de la Quebrada, San Luis",
    foto: "/templos/villa-quebrada.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Naschel+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Fernando Molina", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "20:00", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "alto-pencoso",
    nombre: "Vida en Fe Alto Pencoso",
    ciudad: "Alto Pencoso",
    direccion: "Rivadavia y Pedernera, Alto Pencoso, San Luis",
    foto: "/templos/alto-pencoso.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1455156218388-5e61b526818b?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=San+Francisco+del+Monte+de+Oro+San+Luis+Argentina",
    pastores: [
      { nombre: "Hector ", rol: "Pastor", foto: "https://images.unsplash.com/photo-1527980965255-d3b416303d12?w=300&q=80" },
      { nombre: "Gladys Moyano", rol: "Pastora", foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80" }
    ],
    horarios: [
      {dia: "Sábado", hora: "19:00", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "fraga",
    nombre: "Vida en Fe Fraga",
    ciudad: "Fraga",
    direccion: "Rivadavia 600, Fraga",
    foto: "/templos/Fraga.jpg",
    fotoHero: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Fraga+San+Luis+Argentina",
    pastores: [
      { nombre: "Nelson Rossi", rol: "Pastor", foto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&q=80" },
      { nombre: "Silvia Gutierrez", rol: "Pastora", foto: "https://images.unsplash.com/photo-1566492031773-4f4e44671857?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "20:00", actividad:"Reunión General"},
      {dia: "Martes", hora: "17:00", actividad:"Reunión de oración"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "leandro-alem",
    nombre: "Vida en Fe Leandro Alem",
    ciudad: "Leandro N Alem",
    direccion: "Salón vecinal municipal, Tilisarao",
    foto: "/templos/leandro-alem.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Tilisarao+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Alejandro Cruz", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1504257432389-52343af06ae3?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "21:00", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "la-calera",
    nombre: "Vida en Fe La Calera",
    ciudad: "La Calera",
    direccion: "Salón Municial, La Calera",
    foto: "/templos/la-calera.webp",
    fotoHero: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Santa+Rosa+del+Conlara+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Pablo Núñez", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1548449112-96a38a643324?w=300&q=80" },
    ],
    horarios: [
      {dia: "Jueves", hora: "19:30", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "el-morro",
    nombre: "Vida en Fe El Morro",
    ciudad: "El Morro",
    direccion: "Viviendas Productivas, El Morro, San Luis",
    foto: "/templos/el-morro.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Concaran+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Andrés Romero", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80" },
    ],
    horarios: [
      {dia: "Sábado", hora: "15:30", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "san-martin",
    nombre: "Vida en Fe San Martin",
    ciudad: "San Martin",
    direccion: "Belgrano s/n, San Martin, San Luis",
    foto: "/templos/san-martin.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Papagayos+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Sebastián Flores", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1559718062-361155fad299?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "16:00", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "paso-grande",
    nombre: "Vida en Fe Paso Grande",
    ciudad: "Paso Grande",
    direccion: "San Jose s/n, Paso Grande",
    foto: "/templos/paso-grande.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Quines+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Daniel Torres", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1507081323647-4d250478b919?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "19:00", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "chosmes",
    nombre: "Vida en Fe Chosmes",
    ciudad: "Chosmes",
    direccion: "Chosmes, San Luis",
    foto: "/templos/chosmes.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1510784722466-f2aa240a4a12?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=San+Jose+del+Morro+San+Luis+Argentina",
    pastores: [
      { nombre: "Pastor Luis Agüero", rol: "Pastor Principal", foto: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=300&q=80" },
    ],
    horarios: [
      {dia: "Viernes", hora: "19:00", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "campamento",
    nombre: "Vida en Fe Campamento",
    ciudad: "Campamento",
    direccion: "Campamento, San Luis",
    foto: "https://images.unsplash.com/photo-1501084817091-a4f3d1d19e07?w=800&q=80",
    fotoHero: "https://images.unsplash.com/photo-1520962922320-2038eebab146?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Villa+del+Carmen+San+Luis+Argentina",
    pastores: [
      { nombre: "Equipo Misionero", rol: "", foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80" },
    ],
    horarios: [
      {dia: "Miércoles", hora: "19:30", actividad: "Reunión General"},
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "balde-de-la-isla",
    nombre: "Vida en Fe Balde de la Isla",
    ciudad: "Balde de la Isla",
    direccion: "Balde de la Isla, San Luis",
    foto: "/templos/balde-isla.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1490750967868-88df5691cc80?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Nogoli+San+Luis+Argentina",
    pastores: [
      { nombre: "Equipo Misionero", rol: "", foto: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=300&q=80" },
    ],
    horarios: [
      {dia: "Martes", hora: "19:30", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
  {
    id: "salinas-del-bebedero",
    nombre: "Vida en Fe Salinas del Bebedero",
    ciudad: "Salinas del Bebedero",
    direccion: "Salinas del Bebedero, San Luis",
    foto: "/templos/salinas-bebedero.jpeg",
    fotoHero: "https://images.unsplash.com/photo-1490750967868-88df5691cc80?w=1600&q=80",
    mapsUrl: "https://maps.google.com/?q=Nogoli+San+Luis+Argentina",
    pastores: [
      { nombre: "Equipo Misionero", rol: "", foto: "https://images.unsplash.com/photo-1557862921-37829c790f19?w=300&q=80" },
    ],
    horarios: [
      {dia: "Lunes", hora: "19:30", actividad: "Reunión General"}
    ],
    actividades: actividadesPorDefecto,
    noticias: noticiasPorDefecto,
  },
];

export const iglesiasMadre = iglesias.find(i => i.esMadre)!;
export const iglesiasSede = iglesias.filter(i => !i.esMadre);
