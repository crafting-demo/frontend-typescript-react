import { camelizeKeys } from "humps";
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
    Meta: {
      Caller: Topic.TsReact,
      Callee: Topic.GoGin, // Replace: RandomCallee()
      CallTime: new Date().toISOString(),
    },
    Actions: RandomActions(RandomPick()),
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
    Action: action,
    Payload: RandomActionPayload(action),
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
    payload.Value = lorem.generateSentences(1);
  }

  if (action === ActionType.Read) {
    payload.ServiceName = RandomPick(Object.values(Dependency));
    payload.Key = uuidv4();
  }

  if (action === ActionType.Write) {
    payload.ServiceName = RandomPick(Object.values(Dependency));
    payload.Key = uuidv4();
    payload.Value = lorem.generateSentences(1);
  }

  if (action === ActionType.Call) {
    payload.ServiceName = Topic.GoGin; // Replace: RandomCallee()
    payload.Actions = RandomActions(RandomPick());
  }

  return payload;
}

export function RandomPick(sample?: any[]): any {
  if (!sample) {
    sample = [1, 2, 3, 4, 5];
  }
  return sample[Math.floor(Math.random() * sample.length)];
}

export function RandomMessageString(noSpace?: boolean): string {
  const randomMsg = camelizeKeys(RandomMessage());
  return noSpace
    ? JSON.stringify(randomMsg)
    : JSON.stringify(randomMsg, null, 2);
}
