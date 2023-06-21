import { makeGuid } from "src/app/shared/utils/make-guid";

export const MockBoardData = [
  { id: makeGuid(),
    name: 'To Do',
    tasks: [
      { id: makeGuid(), name: 'Get to work' },
      { id: makeGuid(), name: 'Call ClickUp' },
    ],
    color: '#d3d3d3'
  },
  { id: makeGuid(),
    name: 'In Progress',
    tasks: [
      { id: makeGuid(), name: 'Pick up groceries' },
    ],
    color: '#ff7fab'
  },
  { id: makeGuid(),
    name: 'Almost Done',
    tasks: [
      { id: makeGuid(), name: 'Go home' },
    ],
    color: '#bf55ec'
  },
  { id: makeGuid(),
    name: 'Ready For Testing',
    tasks: [
      { id: makeGuid(), name: 'Fall asleep' },
    ],
    color: '#bf55ec'
  },
  { id: makeGuid(),
    name: 'Done',
    tasks: [
      { id: makeGuid(), name: 'Get up' },
    ],
    color: '#6bc950'
   }
];
