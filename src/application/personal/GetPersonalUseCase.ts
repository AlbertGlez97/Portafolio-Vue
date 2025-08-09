// Caso de uso para obtener la información personal
// Se comunica con un repositorio que implementa el puerto del dominio
import type { PersonalData } from '../../domain/personal/Personal'
import type { PersonalRepository } from '../../domain/personal/PersonalRepository'

export class GetPersonalUseCase {
  constructor(private repository: PersonalRepository) {}

  // Ejecuta la lógica de aplicación para recuperar los datos personales
  execute(): PersonalData {
    return this.repository.getPersonal()
  }
}
