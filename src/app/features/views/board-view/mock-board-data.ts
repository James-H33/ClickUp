import { makeGuid } from "src/app/shared/utils/make-guid";

export const MockBoardData = [
  { id: makeGuid(),
    name: 'To Do',
    tasks: [
      { id: makeGuid(), name: 'Get to work', description: ''},
      { id: makeGuid(), name: 'Call ClickUp', description: ''},
    ],
    color: '#d3d3d3'
  },
  { id: makeGuid(),
    name: 'In Progress',
    tasks: [
      { id: makeGuid(), name: 'Pick up groceries', description: ''},
    ],
    color: '#ff7fab'
  },
  { id: makeGuid(),
    name: 'Almost Done',
    tasks: [
      { id: makeGuid(), name: 'Go home', description: ''},
    ],
    color: '#bf55ec'
  },
  { id: makeGuid(),
    name: 'Ready For Testing',
    tasks: [
      { id: makeGuid(), name: 'Fall asleep', description: ''},
    ],
    color: '#bf55ec'
  },
  { id: makeGuid(),
    name: 'Completed',
    tasks: [
      { id: makeGuid(), name: 'Get up', description: ''},
    ],
    color: '#6bc950'
   }
];
