import { MfosQuery } from "@/app/_queries/gql/graphql";

const LoanCard = ({ mfo }: {
  mfo: Exclude<MfosQuery['mfos'][0], null>
}) => {
  return (
    <div className="p-4 bg-white shadow rounded border-2 bg-gradient-to-tl from-[#fbfbfb] to-white">
      <h4 className="text-xl font-semibold">{mfo.name}</h4>
      <p>Amount: {mfo.amount_from} – {mfo.amount_to} ₽</p>
      <p>Term: {mfo.term_from} – {mfo.term_to} days</p>
      {/*<p>Approval: {loan.approvalRate}%</p>*/}
      <p>Interest Rate: {mfo.interest_rate}%</p>
      <p>Free term: {mfo.interest_free_term}</p>
      <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Apply Now</button>
      <hr className="mt-2 mb-2"/>
      {mfo.obtaining_methods.map(obtainingMethod => (
        <>{obtainingMethod !== null && <div>- {obtainingMethod?.name}</div>}</>
      ))}
      <hr className="mt-2 mb-2"/>
      {mfo.additional_filters.map(additionalFilter => (
        <>{additionalFilter !== null && <div>- {additionalFilter?.name}</div>}</>
      ))}
    </div>
  );
};

export default LoanCard;
