interface RecommendationsResultPageProps {
  params: Promise<{ eventId: string }>;
}

const RecommendationsResultPage = async ({ params }: RecommendationsResultPageProps) => {
  const { eventId } = await params;

  return (
    <div>
      <h1>RecommendationsResultPage</h1>
      <p>{eventId}</p>
    </div>
  );
};

export default RecommendationsResultPage;
