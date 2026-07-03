export interface Member {
  id: string;
  name: string;
  dept: string;
  batch?: string;
  role?: string;
}

export const members: Member[] = [
  { id: 'thanush', name: 'Thanush', dept: 'IT Dept', batch: 'Final year', role: 'Full Stack Engineer' },
  { id: 'rishikesh', name: 'Rishikesh', dept: 'IT Dept', batch: 'Final year', role: 'Systems Engineer' },
  { id: 'logesh', name: 'Logesh', dept: 'AI&DS Dept', batch: 'Final year', role: 'Frontend Engineer' },
  { id: 'ahamed', name: 'Ahamed Athil Khan', dept: 'CSE Dept', batch: 'Final year', role: 'Backend Engineer' },
  { id: 'pandeeswaran', name: 'Pandeeswaran', dept: 'CSE Dept', batch: 'Final year', role: 'DevOps / Backend' },
  { id: 'sakthi', name: 'Sakthi Sundhar', dept: 'CSE Dept', batch: 'Final year', role: 'Frontend / UI' },
];

export const findMembers = (ids: string[]) => members.filter(m => ids.includes(m.id));
