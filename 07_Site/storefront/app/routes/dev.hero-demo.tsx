import type {Route} from './+types/dev.hero-demo';
import HeroSectionDemo from '@/components/examples/hero-section-2-demo';

// Route de démo pour prévisualiser le composant shadcn HeroSection isolément,
// sans toucher à la page d'accueil réelle. Supprimer une fois évalué.
export const meta: Route.MetaFunction = () => [{title: 'Dev — Hero Section Demo'}];

export default function DevHeroDemo() {
  return <HeroSectionDemo />;
}
