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
    description: '',
    createdDate: '2023-06-12T20:09:00.000Z',
    position: 0
  },
  { id: makeGuid(),
    statusId: MockStatuses[0].id,
    name: 'Call ClickUp',
    description: '',
    createdDate: '2023-06-16T18:11:00.000Z',
    position: 1
  },

  { id: makeGuid(),
    statusId: MockStatuses[1].id,
    name: 'Pick up groceries',
    description: '',
    createdDate: '2023-06-10T19:22:00.000Z',
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[2].id,
    name: 'Go home',
    description: '',
    createdDate: '2023-06-01T20:21:00.000Z',
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[3].id,
    name: 'Fall asleep',
    description: '',
    createdDate: '2023-06-12T15:09:00.000Z',
    position: 0
  },

  { id: makeGuid(),
    statusId: MockStatuses[4].id,
    name: 'Get up',
    description: '',
    createdDate: '2023-06-12T:20:21:000Z',
    position: 0
  },
];
