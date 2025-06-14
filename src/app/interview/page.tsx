'use client';

import PageLayout from '../PageLayout';
import Content from '@/components/Content';
import { useEffect, Suspense, lazy } from 'react';
import { useInterview } from '@/hooks/useInterview';
import Loading from '../loading';
import { useInterviewQuestions } from './hooks/useInterviewQuestion';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants';
import { getStorageItem } from '@/utils/storage';

const QuestionBoxSection = lazy(() => import('./sections/QuestionBoxSection'));
const VideoSection = lazy(() => import('./sections/VideoSection'));
const SideSection = lazy(() => import('./sections/SideSection'));

const Interview = () => {
  const router = useRouter();
  const { data, isLoading } = useInterviewQuestions();
  const { resetInterview } = useInterview();

  useEffect(() => {
    const interviewId = getStorageItem('interviewId');
    if (!interviewId) {
      router.replace(PATH.HOME);
      return;
    }
    resetInterview();
  }, [router, resetInterview]);

  if (isLoading) return <Loading />;
  if (!data) return null;

  return (
    <PageLayout
      interviewNav
      className="flex h-fit w-screen justify-center overflow-hidden px-[10%]"
    >
      <Content className="my-[92px] h-fit w-full justify-center gap-[20px]">
        <div className="flex flex-col gap-[20px]">
          <Suspense fallback={<Loading />}>
            <QuestionBoxSection questionList={data} />
          </Suspense>

          <Suspense fallback={<Loading />}>
            <VideoSection questionCnt={data.length} />
          </Suspense>
        </div>

        <Suspense fallback={<Loading />}>
          <SideSection questionList={data} />
        </Suspense>
      </Content>
    </PageLayout>
  );
};

export default Interview;
