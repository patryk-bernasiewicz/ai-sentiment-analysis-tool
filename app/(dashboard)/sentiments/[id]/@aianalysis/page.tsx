import { getUserByClerkId } from '@/utils/auth';
import { SingleEntryPageParams } from '../page';
import { prisma } from '@/utils/db';
import AiAnalysisContent from '../_components/AiAnalysisContent';

const getEntryAnalysis = async (entryId: string) => {
  const user = await getUserByClerkId();

  if (!user) {
    throw new Error('User not found');
  }

  const analysis = await prisma.analysis.findUniqueOrThrow({
    where: {
      entryId,
    },
  });

  return analysis;
};

export default async function AiAnalysisPage({
  params,
}: {
  params: SingleEntryPageParams;
}) {
  const id = (await params).id;
  const analysis = await getEntryAnalysis(id);

  return <AiAnalysisContent analysis={analysis} />;
}
