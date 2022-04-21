import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

import {
  Action,
  ActionType,
  Dependency,
  Message,
  Payload,
  Topic,
} from "common/types";

export function RandomMessage(): Message {
  return {
    meta: {
      caller: Topic.TsReact,
      callee: Topic.GoGin, // TODO: replace with RandomCallee()
      callTime: new Date().toISOString(),
    },
    actions: RandomActions(RandomPick()),
  };
}

export function RandomCallee(): Topic {
  return RandomPick(
    Object.values(Topic).filter((value) => value !== Topic.TsReact)
  );
}

export function RandomActions(size: number): Action[] {
  const actions = [];
  for (let i = 0; i < size; i += 1) {
    actions.push(RandomAction());
  }
  return actions;
}

export function RandomAction(): Action {
  const action = RandomPick(Object.values(ActionType));
  return {
    action,
    payload: RandomActionPayload(action),
  };
}

export function RandomActionPayload(action: ActionType): Payload {
  const payload: Payload = {};

  const lorem = new LoremIpsum({
    sentencesPerParagraph: {
      max: 8,
      min: 4,
    },
    wordsPerSentence: {
      max: 16,
      min: 4,
    },
  });

  if (action === ActionType.Echo) {
    payload.value = lorem.generateSentences(1);
  }

  if (action === ActionType.Read) {
    payload.serviceName = RandomPick(Object.values(Dependency));
    payload.key = uuidv4();
  }

  if (action === ActionType.Write) {
    payload.serviceName = RandomPick(Object.values(Dependency));
    payload.key = uuidv4();
    payload.value = lorem.generateSentences(1);
  }

  if (action === ActionType.Call) {
    payload.serviceName = Topic.GoGin; // TODO: replace with RandomCallee()
    payload.actions = RandomActions(RandomPick());
  }

  return payload;
}

export function RandomPick(sample?: any[]): any {
  const a = sample || [1, 2, 3, 4, 5];
  return a[Math.floor(Math.random() * a.length)];
}

export function RandomMessageString(noSpace?: boolean): string {
  const randomMsg = RandomMessage();
  return noSpace
    ? JSON.stringify(randomMsg)
    : JSON.stringify(randomMsg, null, 4);
}
