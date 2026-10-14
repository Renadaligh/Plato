import { useI18n } from '../i18n/I18nProvider';
import SectionShell from './SectionShell';

/** Support-us section (#support). Content comes later. */
export default function SupportSection() {
  const { t } = useI18n();
  return <SectionShell id="support" title={t.navSupport} sub={t.supSub} />;
}
