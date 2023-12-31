import { makeGuid } from "src/app/shared/utils/make-guid";

export const MockStatuses: any[] = [
  {
    id: makeGuid(),
    name: 'To Do',
    color: '#d3d3d3'
  },
  {
    id: makeGuid(),
    name: 'In Progress',
    color: '#ff7fab'
  },
  {
    id: makeGuid(),
    name: 'Almost Done',
    color: '#bf55ec'
  },
  {
    id: makeGuid(),
    name: 'Ready For Testing',
    color: '#bf55ec'
  },
  {
    id: makeGuid(),
    name: 'Completed',
    color: '#6bc950'
  }
];

export const MockTasks: any[] = [
  { id: makeGuid(),
    statusId: MockStatuses[0].id,
    name: 'Get to work',
    description: '6AM Grind starts now',
    createdDate: '2023-06-12T20:09:00.000Z',
    startDate: '2023-06-12T20:09:00.000Z',
    duration: 16,
    position: 0
  },
  { id: makeGuid(),
    statusId: MockStatuses[0].id,
    name: 'Call ClickUp',
    description: 'Hope for offer letter',
    createdDate: '2023-06-16T18:11:00.000Z',
    startDate: '2023-06-16T18:11:00.000Z',
    duration: 2,
    position: 1
  },

  { id: makeGuid(),
    statusId: MockStatuses[1].id,
    name: 'Pick up groceries',
    description: 'Food is good.',
    createdDate: '2023-06-10T19:22:00.000Z',
    startDate: '2023-06-10T19:22:00.000Z',
    duration: 5,
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[2].id,
    name: 'Go home',
    description: '',
    createdDate: '2023-06-01T20:21:00.000Z',
    startDate: '2023-06-01T20:21:00.000Z',
    duration: 5,
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[3].id,
    name: 'Fall asleep',
    description: 'Good habits, good developer, happy life.',
    createdDate: '2023-06-12T15:09:00.000Z',
    startDate: '2023-06-12T15:09:00.000Z',
    duration: 8,
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[4].id,
    name: 'Get up',
    description: 'Coffee then code.',
    createdDate: '2023-06-12T15:09:00.000Z',
    startDate: '2023-06-12T15:09:00.000Z',
    duration: 4,
    position: 0
  },
];
