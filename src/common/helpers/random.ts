import { LoremIpsum } from "lorem-ipsum";
import { v4 as uuidv4 } from "uuid";

import {
  Action,
  ActionType,
  DependencyType,
  Message,
  Payload,
  ServiceType,
} from "common/types";

export function RandomMessage(): Message {
  return {
    meta: {
      caller: ServiceType.React,
      callee: RandomCallee(),
    },
    actions: RandomActions(RandomPick()),
  };
}

export function RandomMessageCompact(): Message {
  const callAction = RandomPick(
    Object.values(ActionType).filter((x) => x !== ActionType.Call)
  );
  return {
    meta: {
      caller: ServiceType.React,
      callee: RandomCallee(),
    },
    actions: [
      RandomAction(true),
      RandomAction(true),
      {
        action: ActionType.Call,
        payload: {
          serviceName: RandomCallee(),
          actions: [
            {
              action: callAction,
              payload: RandomActionPayload(callAction),
            },
          ],
        },
      },
    ],
  };
}

export function RandomCallee(): ServiceType {
  return RandomPick(
    Object.values(ServiceType).filter((value) => value !== ServiceType.React)
  );
}

export function RandomActions(size: number): Action[] {
  const actions = [];
  for (let i = 0; i < size; i += 1) {
    actions.push(RandomAction());
  }
  return actions;
}

export function RandomAction(withoutCall?: boolean): Action {
  const action = withoutCall
    ? RandomPick(Object.values(ActionType).filter((x) => x !== ActionType.Call))
    : RandomPick(Object.values(ActionType));
  return {
    action,
    payload: RandomActionPayload(action),
  };
}

export function RandomActionPayload(action: ActionType): Payload {
  const payload: Payload = {};

  const lorem = new LoremIpsum({
    wordsPerSentence: {
      max: 10,
      min: 5,
    },
  });

  if (action === ActionType.Echo) {
    payload.value = lorem.generateSentences(1);
  }

  if (action === ActionType.Read) {
    payload.serviceName = RandomPick(Object.values(DependencyType));
    payload.key = uuidv4();
  }

  if (action === ActionType.Write) {
    payload.serviceName = RandomPick(Object.values(DependencyType));
    payload.key = uuidv4();
    payload.value = lorem.generateSentences(1);
  }

  if (action === ActionType.Call) {
    payload.serviceName = RandomCallee();
    payload.actions = RandomActions(RandomPick());
  }

  return payload;
}

export function RandomPick(sample?: any[]): any {
  const a = sample || [1, 2, 3, 4, 5];
  return a[Math.floor(Math.random() * a.length)];
}
