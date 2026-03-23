// Tipos que coinciden con las tablas de Supabase

export interface Noticia {
  id: string
  titulo: string
  resumen: string
  contenido?: string
  imagen_url?: string
  fecha: string           // ej: "Marzo 2025"
  publicada: boolean
  iglesia_id: string | null  // null = noticia de la iglesia madre
  created_at: string
  updated_at: string
}

export interface Predica {
  id: string
  titulo: string
  pastor: string
  fecha: string           // ej: "15 jun 2025"
  youtube_id?: string     // ID del video de YouTube
  spotify_url?: string    // URL del episodio de Spotify
  imagen_url?: string     // thumbnail
  duracion?: string       // ej: "47:23"
  descripcion?: string
  publicada: boolean
  created_at: string
  updated_at: string
}

export interface IglesiaRow {
  id: string              // coincide con el id del array estático
  nombre: string
  ciudad: string
  direccion: string
  telefono?: string
  email?: string
  instagram?: string
  foto_url?: string
  foto_hero_url?: string
  maps_url?: string
  es_madre: boolean
}

export interface Contacto {
  id: string
  nombre: string
  email: string
  telefono?: string
  mensaje: string
  iglesia_id?: string | null
  leido: boolean
  archivado: boolean
  created_at: string
}
