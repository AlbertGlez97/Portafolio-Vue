// Puerto del dominio para obtener datos personales
// Define las operaciones que cualquier repositorio de datos personales debe implementar
import type { PersonalData } from './Personal'

export interface PersonalRepository {
  // Devuelve la información personal completa
  getPersonal(): PersonalData
}
