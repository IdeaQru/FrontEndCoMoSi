import { io, Socket } from 'socket.io-client';

const WS_URL = import.meta.env.VITE_WS_URL as string;

export type SensorUpdate = {
  counterInput: number;
  counterOutput: number;
  statusInput?: boolean;
  statusOutput?: boolean;
  timestamp?: string;
  plcConnected?: boolean;
};

export const socket: Socket = io(WS_URL, {
  transports: ['websocket'],
  autoConnect: true,
});
