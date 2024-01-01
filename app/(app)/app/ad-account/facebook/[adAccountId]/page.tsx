export default function AdAccountPage({
  params,
}: {
  params: { adAccountId: string };
}) {
  return <div>{params.adAccountId}</div>;
}
