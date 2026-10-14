import { useI18n } from '../i18n/I18nProvider';
import SectionShell from './SectionShell';

/** Champions: the winners of Plato tournaments. Content comes later — for now the section shows the empty placeholder. */
export default function ChampionsSection() {
  const { t } = useI18n();
  return <SectionShell id="champions" title={t.chTitle} sub={t.chSub} />;
}
