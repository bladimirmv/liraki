import { Usuario } from '../../shared/models/auth/usuario.interface';

export class RoleValidator {
  isAdmin(usr: Usuario): boolean {
    return usr.rol === 'administrador';
  }
  isArquitecto(usr: Usuario): boolean {
    return usr.rol === 'arquitecto';
  }
  isVendedor(usr: Usuario): boolean {
    return usr.rol === 'vendedor';
  }
  isCliente(usr: Usuario): boolean {
    return usr.rol === 'cliente';
  }
}
