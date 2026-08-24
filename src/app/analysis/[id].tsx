import { AnalysisResultScreen } from '@/features/analysis/screens/analysis-result-screen';
import { getMockAnalysisResult } from '@/mocks/analysis-results';
import { Redirect, useLocalSearchParams } from 'expo-router';

export default function AnalysisResultRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const result = getMockAnalysisResult(id);

  if (!result || result.status !== 'complete') {
    return <Redirect href="/home" />;
  }

  return <AnalysisResultScreen result={result} />;
}
