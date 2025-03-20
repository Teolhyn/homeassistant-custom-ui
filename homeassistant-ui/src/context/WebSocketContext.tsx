import { createContext, useContext, useEffect, useState } from "react";
import {
  getAuth,
  subscribeEntities,
  createConnection,
  Auth,
  HassEntities,
  callService,
  Connection
} from "home-assistant-js-websocket";

interface WebSocketContextType {
  entities: HassEntities | null;
  sendServiceCommand: (domain: string, service: string, entityId: string, serviceData?: object) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(undefined);

export const WebSocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [entities, setEntities] = useState<HassEntities | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);

  useEffect(() => {
    async function connect() {
      try {
        const auth: Auth = await getAuth({ hassUrl: "http://192.168.11.55:8123" });
        const conn = await createConnection({ auth });
        setConnection(conn);

        subscribeEntities(conn, (updatedEntities) => {
          console.log("Entities updated:", updatedEntities);
          setEntities(updatedEntities);
        });

      } catch (error) {
        console.error("WebSocket connection failed:", error);
      }
    }

    connect();
  }, []);

  const sendServiceCommand = (domain: string, service: string, entityId: string, serviceData = {}) => {
    if (!connection) {
      console.error("WebSocket connection not available.");
      return;
    }

    callService(connection, domain, service, { entity_id: entityId, ...serviceData })
      .then(() => console.log(`${service} command sent to ${entityId}`))
      .catch((error) => console.error("Failed to call service:", error));
  };

  return (
    <WebSocketContext.Provider value={{ entities, sendServiceCommand }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocket must be used within a WebSocketProvider");
  }
  return context;
};

