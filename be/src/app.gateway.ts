import {
  MessageBody,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { OnModuleInit } from '@nestjs/common';

interface Message {
  button: string;
}

interface Data {
  green: number;
  yellow: number;
}

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private data: Data;

  constructor() {
    this.data = { green: 0, yellow: 0 };
  }

  @SubscribeMessage('click')
  handleClick(@MessageBody() message: Message) {
    if (message.button == 'Green') {
      this.data.green += 1;
    } else {
      this.data.yellow += 1;
    }

    this.server.emit('update_data', this.data);
  }

  handleDisconnect(client: any): any {
    this.data = { green: 0, yellow: 0 };
    this.server.emit('update_data', this.data);
  }
}
