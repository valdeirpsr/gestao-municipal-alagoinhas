/**
 * Event Bus para comunicação desacoplada entre componentes
 * Implementa o padrão Observer/Pub-Sub
 */

export interface DomainEvent {
    type: string;
    timestamp: Date;
}

export interface ContractSelectedEvent extends DomainEvent {
    type: 'contract:selected';
    contractId: string;
}

export type EventListener = (event: DomainEvent) => void;

export class EventBus {
    private listeners = new Map<string, EventListener[]>();

    /**
     * Inscreve listener para um tipo de evento
     */
    subscribe(eventType: string, listener: EventListener): () => void {
        if (!this.listeners.has(eventType)) {
            this.listeners.set(eventType, []);
        }
        this.listeners.get(eventType)!.push(listener);

        // Retorna função para desinscrever
        return () => {
            const listeners = this.listeners.get(eventType) || [];
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        };
    }

    /**
     * Publica um evento para todos os listeners inscritos
     */
    publish(event: DomainEvent): void {
        const listeners = this.listeners.get(event.type) || [];
        listeners.forEach((listener) => {
            try {
                listener(event);
            } catch (error) {
                console.error(`Error in event listener for ${event.type}:`, error);
            }
        });
    }

    /**
     * Remove todos os listeners de um tipo de evento
     */
    unsubscribeAll(eventType: string): void {
        this.listeners.delete(eventType);
    }

    /**
     * Limpa todos os listeners
     */
    clear(): void {
        this.listeners.clear();
    }
}
