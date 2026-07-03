import TeamSection from '@/components/TeamSection';
import { useLocation, Link } from 'react-router-dom';
import { members as allMembers } from '@/lib/members';

const parseQueryMembers = (search: string) => {
  try {
    const params = new URLSearchParams(search);
    const ids = params.get('members');
    if (!ids) return null;
    return ids.split(',').map(s => s.trim()).filter(Boolean);
  } catch (e) {
    return null;
  }
};

const Team = () => {
  const { search } = useLocation();
  const ids = parseQueryMembers(search);
  const list = ids ? allMembers.filter(m => ids.includes(m.id)) : null;

  if (list && list.length > 0) {
    return (
      <div className="w-full min-h-screen pt-24 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <p className="label-style mb-2">// PROJECT CONTRIBUTORS</p>
          <h1 className="font-syne text-3xl mb-4">Project Team</h1>
          <p className="font-mono text-secondary-text mb-6">Displaying contributors for the selected project.</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {list.map(m => (
              <div key={m.id} className="glass p-6 rounded-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-black font-bold text-lg">
                    {m.name.split(' ').map(s => s[0]).slice(0,2).join('')}
                  </div>
                  <div>
                    <h2 className="font-syne text-xl">{m.name}</h2>
                    <div className="font-mono text-sm text-secondary-text">{m.role} · {m.dept}</div>
                    <div className="mt-3 font-mono text-sm text-muted-text">Final year contributor — contact via ispin@nscet.ac.in</div>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="font-mono text-sm text-secondary-text">Technical summary</div>
                  <div className="mt-2 font-mono text-sm">Worked across core modules, deployments, and testing. Skilled in: {m.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <Link to="/history" className="font-mono text-sm text-secondary-text">← Back to timeline</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen pt-24 pb-12">
      <TeamSection />
    </div>
  );
};

export default Team;
