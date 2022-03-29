import { UsuarioSocket } from './../../../shared/models/auth/usuario.interface';
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socketStatus: boolean = false;
  private socket: Socket;

  constructor() {
    this.socket = io(environment.socketConfig.url, { multiplex: false });
    this.checkStatus();
  }

  // ==========> server status
  public checkStatus() {
    const usuarioToken = localStorage.getItem('token-liraki') || null;
    const usuarioSocket: UsuarioSocket = {
      usuarioToken,
      from: 'liraki',
    };

    this.socket.on('connect', () => {
      console.log('Socket connected');
      this.socketStatus = true;

      this.socket.emit('ws:logIn', usuarioSocket, () => {
        console.log('login successfuly');
      });
    });

    this.socket.on('disconnect', () => {
      console.log('Socket disconnected');
      this.socketStatus = true;
    });
  }

  // ==========> emit function
  public emit(event: string, payload?: any, callback?: Function) {
    this.socket.emit(event, payload, callback);
  }

  // ==========> listen function
  public listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data) => {
        subscriber.next(data);
      });
    });
  }
}
