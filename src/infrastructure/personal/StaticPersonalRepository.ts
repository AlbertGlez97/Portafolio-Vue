// Implementación del repositorio que obtiene los datos desde un archivo estático
import type { PersonalData } from '../../domain/personal/Personal'
import type { PersonalRepository } from '../../domain/personal/PersonalRepository'
import personalData from '../../data/personal.json'

export class StaticPersonalRepository implements PersonalRepository {
  // Retorna los datos cargados desde el archivo JSON
  getPersonal(): PersonalData {
    return personalData
  }
}
