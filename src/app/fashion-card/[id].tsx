import { FashionCardEditorScreen } from '@/features/fashion-card/screens/fashion-card-editor-screen';
import { useLocalSearchParams } from 'expo-router';

export default function EditFashionCardRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return <FashionCardEditorScreen cardId={id} />;
}
