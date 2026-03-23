import { useState, useEffect, useRef } from 'react';
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query';
import { createPortal } from 'react-dom';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface Strings {
  open: string;
  title: string;
  lead: string;
  nameLbl: string;
  emailLbl: string;
  msgLbl: string;
  submit: string;
  sending: string;
  success: string;
  error: string;
  close: string;
  required: string;
  emailInvalid: string;
}

interface Props {
  lang: 'es-AR' | 'en';
  strings: Strings;
}

function ContactModalInner({ lang, strings }: Props) {
  const [open, setOpen]   = useState(false);
  const [name, setName]   = useState('');
  const [email, setEmail] = useState('');
  const [msg, setMsg]     = useState('');
  const [errors, setErrors] = useState<Partial<Record<'name' | 'email' | 'msg', string>>>({});
  const triggerRef   = useRef<HTMLButtonElement>(null);
  const firstInpRef  = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    firstInpRef.current?.focus();
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') closeModal(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  function openModal()  { mutation.reset(); setOpen(true); }
  function closeModal() {
    setOpen(false);
    setErrors({});
    setTimeout(() => triggerRef.current?.focus(), 50);
  }

  const mutation = useMutation<void, Error, ContactPayload>({
    mutationFn: async (payload) => {
      await new Promise((res) => setTimeout(res, 1200));
      void payload; // replace with real fetch
    },
  });

  function validate(): boolean {
    const errs: typeof errors = {};
    if (!name.trim())  errs.name  = strings.required;
    if (!email.trim()) errs.email = strings.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = strings.emailInvalid;
    if (!msg.trim())   errs.msg   = strings.required;
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({ name, email, message: msg });
  }

  const modal = open
    ? createPortal(
        <div
          className="cm-overlay"
          role="dialog"
          aria-modal="true"
          aria-labelledby="cm-title"
          onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
        >
          <div className="cm-panel">
            <button
              className="cm-close"
              type="button"
              onClick={closeModal}
              aria-label={strings.close}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
                <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor" style={{ transformOrigin: 'center', transform: 'rotate(45deg)' }} />
                <rect x="1" y="6" width="12" height="2" rx="1" fill="currentColor" style={{ transformOrigin: 'center', transform: 'rotate(-45deg)' }} />
              </svg>
            </button>

            <h2 id="cm-title" className="cm-title">{strings.title}</h2>
            <p className="cm-lead">{strings.lead}</p>

            {mutation.isSuccess ? (
              <div className="cm-success" role="status" aria-live="polite">
                <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true">
                  <circle cx="18" cy="18" r="16" fill="none" stroke="currentColor" strokeWidth="2" />
                  <rect x="10" y="17" width="7" height="2" rx="1" fill="currentColor" transform="rotate(45 13.5 18)" />
                  <rect x="15" y="11" width="11" height="2" rx="1" fill="currentColor" transform="rotate(-45 20.5 12)" />
                </svg>
                <p>{strings.success}</p>
              </div>
            ) : (
              <form className="cm-form" onSubmit={handleSubmit} noValidate lang={lang}>
                {/* Name */}
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-name">
                    {strings.nameLbl} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    ref={firstInpRef}
                    className="cm-input"
                    id="cm-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                    autoComplete="name"
                    required
                    aria-required="true"
                    aria-invalid={errors.name ? 'true' : 'false'}
                    aria-describedby={errors.name ? 'cm-name-err' : undefined}
                  />
                  {errors.name && (
                    <span id="cm-name-err" className="cm-error" role="alert">{errors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-email">
                    {strings.emailLbl} <span aria-hidden="true">*</span>
                  </label>
                  <input
                    className="cm-input"
                    id="cm-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.currentTarget.value)}
                    autoComplete="email"
                    required
                    aria-required="true"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'cm-email-err' : undefined}
                  />
                  {errors.email && (
                    <span id="cm-email-err" className="cm-error" role="alert">{errors.email}</span>
                  )}
                </div>

                {/* Message */}
                <div className="cm-field">
                  <label className="cm-label" htmlFor="cm-msg">
                    {strings.msgLbl} <span aria-hidden="true">*</span>
                  </label>
                  <textarea
                    className="cm-input cm-textarea"
                    id="cm-msg"
                    rows={4}
                    value={msg}
                    onChange={(e) => setMsg(e.currentTarget.value)}
                    required
                    aria-required="true"
                    aria-invalid={errors.msg ? 'true' : 'false'}
                    aria-describedby={errors.msg ? 'cm-msg-err' : undefined}
                  />
                  {errors.msg && (
                    <span id="cm-msg-err" className="cm-error" role="alert">{errors.msg}</span>
                  )}
                </div>

                {mutation.isError && (
                  <p className="cm-server-error" role="alert" aria-live="assertive">
                    {strings.error}
                  </p>
                )}

                <button
                  className="cm-submit"
                  type="submit"
                  disabled={mutation.isPending}
                  aria-busy={mutation.isPending ? 'true' : 'false'}
                >
                  {mutation.isPending ? strings.sending : strings.submit}
                </button>
              </form>
            )}
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <>
      <button
        ref={triggerRef}
        className="cm-trigger"
        type="button"
        onClick={openModal}
      >
        {strings.open}
      </button>
      {modal}
    </>
  );
}

const queryClient = new QueryClient();

export default function ContactModal({ lang, strings }: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <ContactModalInner lang={lang} strings={strings} />
    </QueryClientProvider>
  );
}
