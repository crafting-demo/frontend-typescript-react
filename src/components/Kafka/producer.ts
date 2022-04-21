import {
  Kafka,
  Message,
  Producer,
  ProducerBatch,
  TopicMessages,
} from "kafkajs";

import { Topic, Message as CustomMessage } from "common/types";

export class ProducerFactory {
  private producer: Producer;

  private brokers: string[];

  constructor(brokers?: string[]) {
    this.producer = this.createProducer();
    this.brokers = brokers || [
      `${process.env.REACT_APP_KAFKA_SERVICE_HOST}:${process.env.REACT_APP_KAFKA_SERVICE_PORT}`,
    ];
  }

  public async start(): Promise<string> {
    try {
      await this.producer.connect();
    } catch (err) {
      return `${err}`;
    }
    return "";
  }

  public async shutdown(): Promise<void> {
    await this.producer.disconnect();
  }

  public async sendBatch(
    topic: Topic,
    messages: Array<CustomMessage>
  ): Promise<void> {
    const kafkaMessages: Array<Message> = messages.map((message) => ({
      value: JSON.stringify(message),
    }));

    const topicMessages: TopicMessages = {
      topic: topic.toString(),
      messages: kafkaMessages,
    };

    const batch: ProducerBatch = {
      topicMessages: [topicMessages],
    };

    await this.producer.sendBatch(batch);
  }

  private createProducer(): Producer {
    const kafka = new Kafka({
      clientId: Topic.TsReact,
      brokers: this.brokers,
    });

    return kafka.producer();
  }
}
