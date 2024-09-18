const LoanCard = ({ loan }: {
  loan: { company: string; amount: number; term: number; approvalRate: number; interestRate: number }
}) => {
  return (
    <div className="p-4 bg-white shadow rounded mb-4">
      <h4 className="text-xl font-semibold">{loan.company}</h4>
      <p>Amount: {loan.amount} ₽</p>
      <p>Term: {loan.term} days</p>
      <p>Approval: {loan.approvalRate}%</p>
      <p>Interest Rate: {loan.interestRate}%</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
    </div>
  );
};

export default LoanCard;
