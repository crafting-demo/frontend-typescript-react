import {
  Consumer,
  ConsumerSubscribeTopic,
  EachBatchPayload,
  EachMessagePayload,
  Kafka,
} from "kafkajs";

import { Topic } from "common/types";

export class ConsumerFactory {
  private consumer: Consumer;

  private brokers: string[];

  constructor(brokers?: string[]) {
    this.consumer = this.createConsumer();
    this.brokers = brokers || [
      `${process.env.REACT_APP_KAFKA_SERVICE_HOST}:${process.env.REACT_APP_KAFKA_SERVICE_PORT}`,
    ];
  }

  public async start(t: Topic): Promise<string[]> {
    const messages = [];

    const topic: ConsumerSubscribeTopic = {
      topic: t.toString(),
      fromBeginning: false,
    };

    try {
      await this.consumer.connect();
      await this.consumer.subscribe(topic);

      await this.consumer.run({
        eachMessage: async (payload: EachMessagePayload) => {
          const { message } = payload;
          messages.push(JSON.stringify(message.value));
        },
      });
    } catch (e) {
      messages.push(`${e}`);
    }

    return messages;
  }

  public async startBatch(t: Topic): Promise<string[]> {
    const messages = [];

    const topic: ConsumerSubscribeTopic = {
      topic: t.toString(),
      fromBeginning: false,
    };

    try {
      await this.consumer.connect();
      await this.consumer.subscribe(topic);

      await this.consumer.run({
        eachBatch: async (payload: EachBatchPayload) => {
          const { batch } = payload;

          batch.messages.forEach((message) => {
            messages.push(JSON.stringify(message.value));
          });
        },
      });
    } catch (e) {
      messages.push(`${e}`);
    }

    return messages;
  }

  public async shutdown(): Promise<void> {
    await this.consumer.disconnect();
  }

  private createConsumer(): Consumer {
    const kafka = new Kafka({
      clientId: Topic.TsReact,
      brokers: this.brokers,
    });

    const consumer = kafka.consumer({ groupId: Topic.TsReact });
    return consumer;
  }
}
