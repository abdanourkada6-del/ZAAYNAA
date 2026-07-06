import type {Route} from './+types/contact';
import {useActionData, Form} from 'react-router';
import {BRAND} from '~/lib/brand';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contact — ZAAYNAA'}];
};

export async function action({request}: Route.ActionArgs) {
  const form = await request.formData();
  const name = String(form.get('name') || '').trim();
  const email = String(form.get('email') || '').trim();
  const message = String(form.get('message') || '').trim();

  if (!name || !email || !message) {
    return {ok: false, error: 'Merci de remplir tous les champs.'};
  }

  // TODO (connexion réelle) : envoyer vers un service email / une app Shopify.
  // Pour l'instant on confirme simplement la réception côté client.
  return {ok: true};
}

export default function Contact() {
  const data = useActionData<typeof action>();

  return (
    <div className="zy-page">
      <span className="zy-eyebrow" style={{display: 'block', textAlign: 'center'}}>
        Nous écrire
      </span>
      <h1>Contact</h1>
      <p className="zy-page-lede">
        Une question, une commande sur-mesure, une collaboration&nbsp;? Nous
        répondons à chaque message.
      </p>

      {data?.ok ? (
        <p style={{textAlign: 'center', color: 'var(--emerald)', fontSize: '1.15rem'}}>
          Merci — votre message est bien reçu. Nous revenons vers vous très vite.
        </p>
      ) : (
        <Form method="post" className="zy-contact-form">
          <div>
            <label htmlFor="name">Nom</label>
            <input id="name" name="name" type="text" required />
          </div>
          <div>
            <label htmlFor="email">E-mail</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div>
            <label htmlFor="message">Message</label>
            <textarea id="message" name="message" rows={5} required />
          </div>
          {data?.error && (
            <p style={{color: '#a3402b', fontSize: '0.9rem'}}>{data.error}</p>
          )}
          <button className="zy-btn" type="submit">
            Envoyer
          </button>
        </Form>
      )}

      <div className="zy-contact-meta">
        <p>
          Écrivez-nous directement&nbsp;:{' '}
          <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
          <br />
          Suivez la maison&nbsp;:{' '}
          <a href={BRAND.instagram} target="_blank" rel="noreferrer">
            @zaaynaa
          </a>
        </p>
      </div>
    </div>
  );
}
