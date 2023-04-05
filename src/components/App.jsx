import { useState, useCallback } from 'react';
import Feedback from './Feedback/Feedback';
import Statistics from './Statistics/Statistics';
import Section from './Section/Section';

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  // const [state, setState] = useState({ good: 0, neutral: 0, bad: 0 });
  // const { good, neutral, bad } = state;

  const onAddFeedback = useCallback((e) => {
    const { id } = e.target;

    // setState(prevState => ({ ...prevState, [id]: prevState[id] + 1 }));

    switch (id) {
      case 'good':
        setGood(prev => prev + 1);
        break;
      case 'neutral':
        setNeutral(prev => prev + 1);
        break;
      case 'bad':
        setBad(prev => prev + 1);
        break;
      default:
        return;
    }
  }, []);

  const countTotalFeedback = useCallback(() => {
    return good + neutral + bad;
  }, [good, neutral, bad]);

  const countPositiveFeedbackPercentage = useCallback(() => {
    const result = Math.round((good * 100) / countTotalFeedback());
    if (!result) return 0;
    return result;
  }, [countTotalFeedback, good]);

  return (
    <>
      <Section title={'Please leave feedback'}>
        <Feedback onAddFeedback={onAddFeedback} />
      </Section>
      <Section title={'Statistics'}>
        <Statistics
          stat={{ good, neutral, bad }}
          total={countTotalFeedback()}
          positiveFeedbackPercentage={countPositiveFeedbackPercentage()}
        />
      </Section>
    </>
  );
};

export default App;
