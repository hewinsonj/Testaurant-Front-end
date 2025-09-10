import ResultsSegment from './ResultsSegment';

const EmployeeResultModal = ({ result, user, msgAlert, testName }) => {
  return (
    <div style={{ marginBottom: '1em' }}>
      <h4>{testName}</h4>
      <ResultsSegment result={result} user={user} msgAlert={msgAlert} />
    </div>
  );
};

export default EmployeeResultModal;