import css from './App.module.css';
import { useState } from 'react';
import CafeInfo from '../CafeInfo/CafeInfo';
import VoteStats from '../VoteStats/VoteStats';
import VoteOptions from '../VoteOptions/VoteOptions';
import Notification from '../Notification/Notification';
import type { Votes, VoteType } from '../../types/votes';

export default function App() {
  const [votes, setVotes] = useState<Votes>({ good: 0, neutral: 0, bad: 0 });
  const resetVotes = () => setVotes({ good: 0, neutral: 0, bad: 0 });
  const handleVote = (type: VoteType) =>
    setVotes(prevVotes => ({ ...prevVotes, [type]: prevVotes[type] + 1 }));

  const totalVotes = votes.good + votes.neutral + votes.bad;
  const positiveRate =
    totalVotes > 0 ? Math.round((votes.good / totalVotes) * 100) : 0;

  return (
    <div className={css.app}>
      <CafeInfo />
      <VoteOptions
        onVote={handleVote}
        onReset={resetVotes}
        canReset={totalVotes > 0}
      />
      {totalVotes > 0 ? (
        <VoteStats
          votes={votes}
          totalVotes={totalVotes}
          positiveRate={positiveRate}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}
