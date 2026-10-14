import { useI18n } from '../i18n/I18nProvider';
import SectionShell from './SectionShell';

/** Community section (#community). Content comes later. */
export default function CommunitySection() {
  const { t } = useI18n();
  return <SectionShell id="community" title={t.navCommunity} sub={t.comSub} />;
}
