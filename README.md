# Custom React Homeassistant UI

React user interface for homeassistant. It uses WebSocket connection to transfer data between client and homeassistant server. WebSocket authentication works through the native homeassistant login, which opens up when first connecting from a new client.

## Important

This is not a plug and play UI that works for anyones and everyones instance of Homeassistant. It is very much tailored to what I use homeassistant for and what devices I have. However, it can be easily modified to work with whatever you may have. The main thing is that the React context handles entity fetching and therefore all existing and to-be-developed components can access your entities through the context. To access the entities in context and to send service commands in your component, simply:

```typescript
import { useWebSocket } from "../context/WebSocketContext";

const Foo = () => {
  const { entities, sendServiceCommand } = useWebSocket();
};
```
